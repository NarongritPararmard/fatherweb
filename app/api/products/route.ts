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
  try {
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const chemical_formula = formData.get('chemical_formula')?.toString() || '';
    const packaging = formData.get('packaging')?.toString() || '';
    const price = parseFloat(formData.get('price')?.toString() || '0');
    const description = formData.get('description')?.toString() || '';
    const properties = formData.get('properties')?.toString() || '';
    const characteristicsId = Number(formData.get('characteristicsId')) || undefined;
    const origin_countryId = Number(formData.get('origin_countryId')) || undefined;
    const categoryId = Number(formData.get('categoryId')) || undefined;
    const file = formData.get('file') as File | null;
    const badge = formData.get('badge')?.toString() || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // upload to Supabase
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `uploads/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    // Validate foreign keys
    if (!categoryId || !(await prisma.category.findUnique({ where: { id: categoryId } }))) {
      return NextResponse.json({ error: 'Invalid categoryId' }, { status: 400 });
    }
    if (!characteristicsId || !(await prisma.characteristic.findUnique({ where: { id: characteristicsId } }))) {
      return NextResponse.json({ error: 'Invalid characteristicsId' }, { status: 400 });
    }
    if (!origin_countryId || !(await prisma.country.findUnique({ where: { id: origin_countryId } }))) {
      return NextResponse.json({ error: 'Invalid origin_countryId' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        chemical_formula,
        packaging,
        price,
        description,
        properties,
        characteristicsId,
        origin_countryId,
        categoryId,
        imageUrl,
        badge
      },
    });

    return NextResponse.json(newProduct);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

