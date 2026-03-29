import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Correo invalido' }, { status: 400 });
    }

    // Add contact to Resend Audience if configured, otherwise just log
    if (process.env.RESEND_AUDIENCE_ID && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[newsletter]', err.message);
    return NextResponse.json({ error: 'Error al suscribirse' }, { status: 500 });
  }
}
