import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
)   {
    try {
        // const postId = Number(params.id)
        const { id } = await params
        const postId = Number(id)

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: { category: true },
        });

        return Response.json(post);
    } catch (error) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
)   {
    try {
        const { title, content, categoryId } = await request.json()
        const { id } = await params
        const postId = Number(id)

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                categoryId: Number(categoryId),
            }
        })
        return Response.json(updatedPost);
    } catch (error) {
        return Response.json({ error: 'Failed to update post' }, { status: 500 });
    }

}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
)   {
    try {
        const { id } = await params
        const postId = Number(id)

        const deletedPost = await prisma.post.delete({
            where: { id: postId },
        })
        return Response.json(deletedPost);

    } catch (error) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
    }
}