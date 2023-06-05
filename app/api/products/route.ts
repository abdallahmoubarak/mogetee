import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const { name, price } = await request.json();
  const product = await prisma.product.create({
    data: {
      name,
      price,
    },
  });

  return NextResponse.json({ product });
}

export async function PUT(request: Request) {
  const { id, name, price } = await request.json();
  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
    },
  });

  return NextResponse.json({ product });
}
