import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[next-auth]/route";

export async function GET() {
  const products = await prisma.product.findMany({});
  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "You are not logged in." },
      { status: 401 },
    );
  try {
    const { name, price } = await request.json();
    const product = await prisma.product.create({
      data: {
        name,
        price,
      },
    });

    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    return NextResponse.error;
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "You are not logged in." },
      { status: 401 },
    );
  try {
    const { id, name, price } = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
      },
    });

    return NextResponse.json({ product });
  } catch (err) {
    return NextResponse.error;
  }
}
