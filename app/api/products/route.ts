import { NextResponse, type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { supabase } from "@/lib/supabase";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    

    const products = await prisma.product.findMany({
        include: {
            category: true,
            characteristics: true,
            origin_country: true,
        }
});
    return Response.json(products);
}

export async function POST(request: NextRequest) {

    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const chemical_formula = formData.get('chemical_formula')?.toString() || '';
    const packaging = formData.get('packaging')?.toString() || '';
    const price = parseFloat(formData.get('price')?.toString() || '0');
    const description = formData.get('description')?.toString() || '';
    const properties = formData.get('properties')?.toString() || '';
    const characteristicsId = formData.get('characteristicsId')?.toString() || '';
    const origin_countryId = formData.get('origin_countryId')?.toString() || '';
    const categoryId = formData.get('categoryId')?.toString() || '';
    const file = formData.get('file') as File | null;

    // const { title, content, categoryId, file } = await request.json()

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
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
    const newProduct = await prisma.product.create({
        data: {
            name,
            chemical_formula,
            packaging,
            price,
            description,
            properties,
            characteristicsId: Number(characteristicsId),
            origin_countryId: Number(origin_countryId),
            categoryId: Number(categoryId),
            imageUrl
        }
    })
    return Response.json(newProduct);
}

