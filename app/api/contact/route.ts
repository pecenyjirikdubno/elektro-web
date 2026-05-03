import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  pageUrl?: string;
  referrer?: string;
};

function clean(value: FormDataEntryValue | string | null | undefined) {
  if (typeof value !== "string") return "";
  return value.trim();
}

async function readPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const files = formData
      .getAll("attachments")
      .filter((item): item is File => item instanceof File && item.size > 0);

    const payload: ContactPayload = {
      name: clean(formData.get("name")),
      phone: clean(formData.get("phone")),
      email: clean(formData.get("email")),
      service: clean(formData.get("service")),
      message: clean(formData.get("message")),
      pageUrl: clean(formData.get("pageUrl")),
      referrer: clean(formData.get("referrer")),
    };

    return { payload, files };
  }

  const body = await request.json();
  const payload: ContactPayload = {
    name: body.name?.trim() || "",
    phone: body.phone?.trim() || "",
    email: body.email?.trim() || "",
    service: body.service?.trim() || "",
    message: body.message?.trim() || "",
    pageUrl: body.pageUrl?.trim() || "",
    referrer: body.referrer?.trim() || "",
  };

  return { payload, files: [] as File[] };
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Chybí RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { payload, files } = await readPayload(request);
    const { name, phone, email, service, message, pageUrl, referrer } = payload;

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Vyplňte prosím všechna povinná pole." },
        { status: 400 }
      );
    }

    const maxFileSize = 8 * 1024 * 1024;
    const maxFiles = 4;

    if (files.length > maxFiles) {
      return NextResponse.json(
        { error: `Nahrajte prosím maximálně ${maxFiles} přílohy.` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (file.size > maxFileSize) {
        return NextResponse.json(
          { error: `Soubor ${file.name} je větší než 8 MB.` },
          { status: 400 }
        );
      }
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const result = await resend.emails.send({
      from: "JZ ELEKTRO <onboarding@resend.dev>",
      to: ["peceny.jirik@gmail.com"],
      replyTo: email,
      subject: `Nová poptávka z webu JZ ELEKTRO${service ? ` – ${service}` : ""}`,
      text: `
Jméno: ${name}
Telefon: ${phone}
E-mail: ${email}
Typ služby: ${service || "neuvedeno"}

Zpráva:
${message}

Stránka: ${pageUrl || "neuvedeno"}
Referrer: ${referrer || "neuvedeno"}
Počet příloh: ${attachments.length}
      `.trim(),
      attachments,
    });

    if (result.error) {
      console.error("RESEND ERROR:", result.error);
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
