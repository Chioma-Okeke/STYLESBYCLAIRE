import { getServices } from "@/lib/services";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
    try {
        const services = await getServices();
        return NextResponse.json({ services });
    } catch (err: unknown) {
        console.error("[services]", err);
        return NextResponse.json(
            { error: "Failed to load services" },
            { status: 500 },
        );
    }
}
