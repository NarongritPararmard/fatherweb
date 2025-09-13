import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const characteristics = await prisma.characteristic.findMany()
    return Response.json(characteristics)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}