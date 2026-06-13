import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Admin access required" }, { status: 403 });
        }

        const body = await req.json();
        const { salesManagerId, categoryId, deadline } = body;

        if (!salesManagerId || !categoryId) {
            return NextResponse.json(
                { error: "salesManagerId and categoryId are required" },
                { status: 400 }
            );
        }

        // Verify the user is a sales manager
        const manager = await prisma.user.findUnique({
            where: { id: salesManagerId },
            select: { role: true }
        });

        if (!manager || manager.role !== "SALES_MANAGER") {
            return NextResponse.json({ error: "User is not a Sales Manager" }, { status: 400 });
        }

        // Verify category exists
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            select: { id: true, name: true }
        });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        // Check if already assigned
        const existing = await prisma.salesCategoryAssignment.findFirst({
            where: {
                salesManagerId,
                categoryId
            }
        });

        if (existing) {
            return NextResponse.json({ error: "Category already assigned to this manager" }, { status: 409 });
        }

        const assignment = await prisma.salesCategoryAssignment.create({
            data: {
                salesManagerId,
                categoryId,
                deadline: deadline ? new Date(deadline) : null,
            },
            include: {
                category: { select: { name: true } }
            }
        });

        return NextResponse.json({ success: true, assignment });

    } catch (error) {
        console.error("Error assigning category:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
