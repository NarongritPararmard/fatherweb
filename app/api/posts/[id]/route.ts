import { NextResponse, type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { supabase } from "@/lib/supabase";

const prisma = new PrismaClient()

export type Params = Promise<{ id: string }>;

export async function GET(
    request: Request,
    { params }: { params: Params }
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

// export async function PUT(
//     request: Request,
//     { params }: { params: Params }
// )   {
//     try {
        
//         const { title, content, categoryId } = await request.json()
//         const { id } = await params
//         const postId = Number(id)

//         const updatedPost = await prisma.post.update({
//             where: { id: postId },
//             data: {
//                 title,
//                 content,
//                 categoryId: Number(categoryId),
//             }
//         })
//         return Response.json(updatedPost);
//     } catch (error) {
//         return Response.json({ error: 'Failed to update post' }, { status: 500 });
//     }

// }

export async function PUT(request: NextRequest ,
    { params }: { params: Params }
)   {
    try {
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';
    const file = formData.get('file') as File | null;

    const { id } = await params
    const postId = Number(id)

    console.log("Received file:", file);
    console.log("File type:", file?.type);
    console.log("File name:", file?.name);
    console.log(file?.size > 0 ? "File is present" : "No file uploaded");

    if (file?.size > 0 === false) {
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                categoryId: Number(categoryId),
            }
        })
        return Response.json(updatedPost);
    }

    // ตั้งชื่อไฟล์ไม่ให้ซ้ำ

    // ลบไฟล์เก่าออกจาก Supabase Storage
        const existingPost = await prisma.post.findUnique({
            where: { id: postId },
        });
        const oldImageUrl = existingPost?.imageUrl || "";
        const urlParts = oldImageUrl.split("/");
        const oldPath = urlParts.slice(-2).join("/");
        console.log("Old imageUrl to delete:", oldImageUrl);
        
        if (oldPath) {
            console.log("Old file path to delete:", oldPath);
            await supabase.storage.from("images").remove([`${oldPath}`]);
        }

        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;
        const filePath = `uploads/${fileName}`;
    
        console.log("filePath:", filePath);
        console.log("file object:", file);
        console.log("file type:", file.type);
    
        // อัพโหลดไฟล์ไป Supabase
        const { error } = await supabase.storage
          .from("images") // bucket ชื่อ images
          .upload(filePath, file);
    
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    
        console.log("File uploaded successfully:", filePath);
    
        // ✅ ขอ public URL กลับมา
        const { data } = supabase.storage.from("images").getPublicUrl(filePath);
        const imageUrl = data.publicUrl;
    
        // const { title, content, categoryId, imageUrl } = await request.json()
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                categoryId: Number(categoryId),
                imageUrl
            }
        })
        return Response.json(updatedPost);

    } catch (error) {
        return Response.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Params }
)   {
    try {
        const { id } = await params
        const postId = Number(id)

        const existingPost = await prisma.post.findUnique({
            where: { id: postId },
        });
        const oldImageUrl = existingPost?.imageUrl || "";
        const urlParts = oldImageUrl.split("/");
        const oldPath = urlParts.slice(-2).join("/");
        console.log("Old imageUrl to delete:", oldImageUrl);
        
        if (oldPath) {
            console.log("Old file path to delete:", oldPath);
            await supabase.storage.from("images").remove([`${oldPath}`]);
        }

        const deletedPost = await prisma.post.delete({
            where: { id: postId },
        })
        return Response.json(deletedPost);

    } catch (error) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
    }
}