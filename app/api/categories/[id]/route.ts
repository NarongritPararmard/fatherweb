import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = Number(id)
    const categoryWithPosts = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        posts: true, // Include related posts in the response
      },
    })
    return Response.json(categoryWithPosts)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { name } = await request.json()
    const { id } = await params
    const categoryId = Number(id)
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    })
    return Response.json(category)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = Number(id)
    return Response.json(
      await prisma.category.delete({
        where: { id: categoryId },
      })
    )
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}