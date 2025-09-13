import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const countries = await prisma.country.findMany()
    return Response.json(countries)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}