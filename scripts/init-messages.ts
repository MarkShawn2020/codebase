import { db } from "@/lib/db"

const initMessages = async () => {
  const res = await db.message.deleteMany()
  console.log({ res })
}

void initMessages()
