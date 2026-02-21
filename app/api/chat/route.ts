// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { findResponse } from "@/lib/chatbot/knowledge";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json(
        { error: "Geçersiz mesaj" },
        { status: 400 }
      );
    }

    // Simulate a small delay for natural feel
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));

    const response = findResponse(message);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { response: "Bir hata oluştu. Lütfen tekrar dene! 🔧" },
      { status: 500 }
    );
  }
}