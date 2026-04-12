import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim() || "";
    const phone = body.phone?.trim() || "";
    const email = body.email?.trim() || "";
    const service = body.service?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Vyplňte prosím všechna povinná pole." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "JZ ELEKTRO <onboarding@resend.dev>",
      to: ["pecenyjirik@gmail.com"],
      replyTo: email,
      subject: "Nová poptávka z webu JZ ELEKTRO",
      text: `
Jméno: ${name}
Telefon: ${phone}
E-mail: ${email}
Typ služby: ${service}

Zpráva:
${message}
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nepodařilo se odeslat e-mail." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Došlo k chybě serveru." },
      { status: 500 }
    );
  }
}
