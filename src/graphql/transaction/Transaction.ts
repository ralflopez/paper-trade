import { objectType } from "nexus"
import { Context } from "../../config/context"

export const Transaction = objectType({
  name: "Transaction",
  description:
    "Keep tracks of buy, sell, deposit and withdraw actions of a user",
  definition(t) {
    t.nonNull.id("id")
    t.nonNull.datetime("timestamp")
    t.nonNull.field("type", {
      type: "TransactionType",
    })
    t.nonNull.float("amount")
    t.nonNull.string("userId")
    t.nonNull.field("user", {
      type: "User",
      resolve: async (parent, _args, context: Context) => {
        return context.dataloader.loader.load("user", parent.userId)
      },
    })
  },
})