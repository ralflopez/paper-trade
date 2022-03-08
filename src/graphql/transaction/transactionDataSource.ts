import {
  AssetType,
  PrismaClient,
  Transaction,
  TransactionType,
} from "@prisma/client"
import { DataSource, DataSourceConfig } from "apollo-datasource"
import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-errors"
import { Context } from "../../config/context"
import { DatasourceConstructor } from "../../config/datasource"

export class TransactionDataSource extends DataSource {
  context?: Context
  prisma: PrismaClient
  userId?: string

  constructor({ prisma }: DatasourceConstructor) {
    super()
    if (!prisma) throw new ApolloError("Persistent layer cannot be null")
    this.prisma = prisma
  }

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context
  }

  private getUserId(): string {
    const userId = this.context?.user?.id
    if (!userId) throw new ForbiddenError("You are not logged in")
    return userId
  }

  private toNegative(input: number): number {
    return input > 0 ? input * -1 : input
  }

  async buy(
    userId: string,
    amount: number,
    symbol: string,
    assetId: string
  ): Promise<Transaction> {
    if (amount < 0) throw new UserInputError("Amount cannot be negative")

    const transaction = await this.prisma.transaction.create({
      data: {
        amount: this.toNegative(amount),
        symbol,
        type: TransactionType.BUY,
        userId,
        assetId,
        assetType: AssetType.CRYPTO,
      },
    })

    return transaction
  }

  async sell(
    userId: string,
    amount: number,
    symbol: string,
    assetId: string
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount,
        symbol,
        type: TransactionType.SELL,
        userId,
        assetId,
        assetType: AssetType.CRYPTO,
      },
    })

    return transaction
  }

  async deposit(userId: string, amount: number): Promise<Transaction> {
    if (amount < 0) throw new UserInputError("Amount cannot be negative")
    const transaction = this.prisma.transaction.create({
      data: {
        amount,
        symbol: "PHP",
        type: TransactionType.DEPOSIT,
        userId,
        assetId: "philippine-peso",
        assetType: AssetType.FIAT,
      },
    })

    return transaction
  }

  async withdraw(userId: string, amount: number): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount: this.toNegative(amount),
        symbol: "PHP",
        type: TransactionType.WITHDRAW,
        userId,
        assetId: "philippine-peso",
        assetType: AssetType.FIAT,
      },
    })

    return transaction
  }

  async getMyTransactions(
    userId: string,
    transactionId?: string
  ): Promise<Transaction[]> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        id: transactionId,
        userId,
      },
    })

    return transaction
  }

  async getMyPortfolio(userId: string): Promise<TransactionPortfolio> {
    const buyingPower = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
      },
    })
    if (!buyingPower?._sum?.amount) {
      throw new ApolloError("Cannot get total buying power")
    }

    const assetAllocation = await this.prisma.transaction.groupBy({
      by: ["symbol", "assetId"],
      _sum: {
        amount: true,
      },
      having: {
        amount: {
          _sum: {
            gt: 0,
          },
        },
      },
      where: {
        userId,
        symbol: {
          not: "PHP",
        },
      },
    })
    if (!assetAllocation) {
      throw new ApolloError("Cannot get asset allocations")
    }

    return {
      buyingPower: buyingPower._sum.amount,
      assetAllocation: assetAllocation.map((a) => {
        const asset: AssetAllocation = {
          symbol: a.symbol,
          assetId: a.assetId,
          total: a._sum.amount as number,
        }

        return asset
      }),
    }
  }
}
