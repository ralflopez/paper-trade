import { TransactionType, User } from "@prisma/client"
import { prisma } from "../../../config/prisma/client"
import { TransactionDataSource } from "../../../graphql"

let transactionDataSource: TransactionDataSource
let user: User

beforeAll(async () => {
  transactionDataSource = new TransactionDataSource({ prisma })

  // seed
  user = await prisma.user.create({
    data: {
      email: "test@email.com",
      name: "name",
      password: "password",
    },
  })

  await prisma.transaction.createMany({
    data: [
      {
        amount: 20000,
        symbol: "CASH",
        type: TransactionType.DEPOSIT,
        userId: user.id,
      },
      {
        amount: -10000,
        symbol: "BTC",
        type: TransactionType.BUY,
        userId: user.id,
      },
      {
        amount: 12000,
        symbol: "BTC",
        type: TransactionType.SELL,
        userId: user.id,
      },
      {
        amount: -5000,
        symbol: "PHP",
        type: TransactionType.WITHDRAW,
        userId: user.id,
      },
      {
        amount: -5000,
        symbol: "ETH",
        type: TransactionType.BUY,
        userId: user.id,
      },
      {
        amount: 2000,
        symbol: "ETH",
        type: TransactionType.SELL,
        userId: user.id,
      },
    ],
  })
})

beforeEach(() => {
  jest
    .spyOn(TransactionDataSource.prototype as any, "getUserId")
    .mockImplementation(() => user.id)
})

afterAll(async () => {
  await prisma.transaction.deleteMany()
  await prisma.user.deleteMany()
})

describe("buy", () => {
  it("should return a record where amount is negative", async () => {
    const result = await transactionDataSource.buy(100, "ETH")
    expect(result).toEqual(
      expect.objectContaining({ amount: -100, symbol: "ETH" })
    )
  })
})

describe("sell", () => {
  it("should return a record where amount is positive", async () => {
    const result = await transactionDataSource.sell(100, "ETH")
    expect(result).toEqual(
      expect.objectContaining({ amount: 100, symbol: "ETH" })
    )
  })
})

describe("deposit", () => {
  it("should return a record where amount is positive", async () => {
    const result = await transactionDataSource.deposit(100)
    expect(result).toEqual(expect.objectContaining({ amount: 100 }))
  })
})

describe("withdraw", () => {
  it("should return a record where amount is negative", async () => {
    const result = await transactionDataSource.withdraw(100)
    expect(result).toEqual(expect.objectContaining({ amount: -100 }))
  })
})