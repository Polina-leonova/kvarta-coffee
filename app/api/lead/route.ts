import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

async function sendTelegramNotification(lead: {
  name: string;
  phone: string;
  interest: string;
  comment?: string | null;
  utm?: any;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return; 
  }

  const message = [
    `☕ *Новая заявка — Обжарка «Кварта»*`,
    ``,
    `👤 *Имя:* ${lead.name}`,
    `📞 *Телефон:* \`${lead.phone}\``,
    `📦 *Заказ:* ${lead.interest}`,
    lead.comment ? `💬 *Комментарий:* ${lead.comment}` : null,
    lead.utm?.utm_source ? `🎯 *Реклама (UTM):* ${lead.utm.utm_source} / ${lead.utm.utm_campaign || "direct"}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Ошибка отправки в Telegram:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, interest, comment, utm } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Пожалуйста, укажите имя" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Пожалуйста, укажите номер телефона" },
        { status: 400 }
      );
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length !== 12 || !digitsOnly.startsWith("375")) {
      return NextResponse.json(
        { error: "Неверный формат белорусского номера" },
        { status: 400 }
      );
    }

    const operatorCode = digitsOnly.slice(3, 5);
    const validCodes = ["29", "33", "44", "25", "17"];
    if (!validCodes.includes(operatorCode)) {
      return NextResponse.json(
        { error: "Недопустимый код мобильного оператора Беларуси" },
        { status: 400 }
      );
    }

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

    const { data: recentLeads, error: checkError } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phone.trim())
      .gte("created_at", tenMinutesAgo);

    if (checkError) {
      console.error("Deduplication check error:", checkError);
    }

    if (recentLeads && recentLeads.length > 0) {
      return NextResponse.json({
        success: true,
        deduplicated: true,
        message: "Заявка уже была принята ранее",
      });
    }

    const { error: insertError } = await supabase.from("leads").insert({
      name: name.trim(),
      phone: phone.trim(),
      interest: interest || "Общий интерес",
      comment: comment?.trim() || null,
      utm_source: utm?.utm_source || null,
      utm_medium: utm?.utm_medium || null,
      utm_campaign: utm?.utm_campaign || null,
      utm_content: utm?.utm_content || null,
      utm_term: utm?.utm_term || null,
      referrer: utm?.referrer || null,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Ошибка сохранения в базу данных" },
        { status: 500 }
      );
    }

    await sendTelegramNotification({
      name: name.trim(),
      phone: phone.trim(),
      interest,
      comment,
      utm,
    });

    return NextResponse.json({
      success: true,
      deduplicated: false,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}