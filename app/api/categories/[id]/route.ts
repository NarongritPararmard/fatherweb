import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, context: any) {
  try {
    const categoryId = Number(context.params.id)
    const categoryWithPosts = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { posts: true },
    })
    return new Response(JSON.stringify(categoryWithPosts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const { name } = await request.json()
    const categoryId = Number(context.params.id)
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    })
    return new Response(JSON.stringify(category), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const categoryId = Number(context.params.id)
    const deleted = await prisma.category.delete({ where: { id: categoryId } })
    return new Response(JSON.stringify(deleted), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}