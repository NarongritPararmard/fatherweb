import { NextResponse, type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { supabase } from "@/lib/supabase";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'desc';

    console.log({ search, category, sort });

    let whereCondition = category ? {
        title: {
            contains: search,
            mode: 'insensitive',
        },
        category: {
            name: category,
        },
    } : {
        title: {
            contains: search,
            mode: 'insensitive',
        },
    };

    const posts = await prisma.post.findMany({
        where: whereCondition as any,
        orderBy: {
            createdAt: sort,
        } as any,
        include: {
            category: true,
        }
    }
    );
    return Response.json(posts);
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';
    const file = formData.get('file') as File | null;

    // const { title, content, categoryId, file } = await request.json()

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!title || !content || !categoryId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // console.log({ title, content, categoryId, file });

    // ตั้งชื่อไฟล์ไม่ให้ซ้ำ
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
    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            categoryId: Number(categoryId),
            imageUrl
        }
    })
    return Response.json(newPost);
}



