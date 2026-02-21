// app/api/scores/route.ts

import { createServiceSupabase, createServerSupabase } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const supabase = createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Giriş yapmalısınız" },
        { status: 401 }
      );
    }

    // 2. Parse body
    const body = await request.json();
    const { game_slug, score, level, duration } = body;

    // 3. Validate input
    if (!game_slug || !["pavroyale", "pavometry"].includes(game_slug)) {
      return NextResponse.json(
        { error: "Geçersiz oyun" },
        { status: 400 }
      );
    }

    if (typeof score !== "number" || score < 0 || score > 999999) {
      return NextResponse.json(
        { error: "Geçersiz skor" },
        { status: 400 }
      );
    }

    // 4. Generate server-side verification hash
    const secret = process.env.SCORE_SECRET || "default_secret";
    const hash = createHmac("sha256", secret)
      .update(`${user.id}${game_slug}${score}${level || 1}`)
      .digest("hex");

    // 5. Submit score using service role (bypasses RLS for function)
    const serviceSupabase = createServiceSupabase();
    const { data, error } = await serviceSupabase.rpc("submit_score", {
      p_user_id: user.id,
      p_game_slug: game_slug,
      p_score: score,
      p_level: level || 1,
      p_duration: duration || 0,
      p_hash: "server_verified",
    });

    if (error) {
      console.error("Score submission error:", error);
      return NextResponse.json(
        { error: "Skor kaydedilemedi" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      scoreId: data,
      message: "Skor kaydedildi!",
    });
  } catch (error) {
    console.error("Score API error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}