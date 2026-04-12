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

    const result = await resend.emails.send({
      from: "JZ ELEKTRO <onboarding@resend.dev>",
      to: ["peceny.jirik@gmail.com"],
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

    console.log("RESEND RESULT:", JSON.stringify(result, null, 2));

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message || "Nepodařilo se odeslat e-mail." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Došlo k chybě serveru." },
      { status: 500 }
    );
  }
}