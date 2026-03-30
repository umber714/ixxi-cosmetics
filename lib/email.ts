import { Resend } from 'resend';
import Stripe from 'stripe';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendOrderConfirmation(paymentIntent: Stripe.PaymentIntent) {
  const { metadata, amount, receipt_email } = paymentIntent;

  const toEmail = receipt_email ?? metadata?.email;
  if (!toEmail) return;

  const total = ((amount ?? 0) / 100).toFixed(2);
  const orderRef = paymentIntent.id.slice(-8).toUpperCase();
  const name = metadata?.firstName ? `${metadata.firstName} ${metadata.lastName}` : 'Cliente';
  const shippingAddress = [
    metadata?.address,
    metadata?.city,
    metadata?.postalCode ? `CP ${metadata.postalCode}` : '',
  ].filter(Boolean).join(', ');

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #f5f0eb; padding: 40px; text-align: center;">
        <h1 style="font-size: 28px; margin: 0; letter-spacing: 4px;">IXXI</h1>
        <p style="color: #666; margin: 4px 0 0;">COSMETICS</p>
      </div>

      <div style="padding: 40px;">
        <h2 style="font-size: 22px; margin-bottom: 8px;">Pedido Confirmado</h2>
        <p style="color: #555; margin-bottom: 32px;">Hola ${name}, gracias por tu compra. Tu pedido esta siendo preparado.</p>

        <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Numero de Pedido</p>
          <p style="margin: 0; font-family: monospace; font-size: 18px; font-weight: bold;">IXXI-${orderRef}</p>
        </div>

        ${metadata?.items ? `
        <div style="margin-bottom: 24px;">
          <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Productos</p>
          ${metadata.items.split(', ').map(item => `
            <div style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px;">${item}</div>
          `).join('')}
        </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between; padding: 16px 0; border-top: 2px solid #1a1a1a; margin-bottom: 24px;">
          <span style="font-weight: bold;">Total Cobrado</span>
          <span style="font-weight: bold;">$${total} MXN</span>
        </div>

        ${shippingAddress ? `
        <div style="margin-bottom: 32px;">
          <p style="font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Direccion de Envio</p>
          <p style="margin: 0; color: #555;">${shippingAddress}</p>
        </div>
        ` : ''}

        <div style="background: #f5f0eb; border-radius: 8px; padding: 20px; text-align: center;">
          <p style="margin: 0 0 4px; font-weight: bold;">Envio en 3-5 dias habiles</p>
          <p style="margin: 0; color: #666; font-size: 14px;">Recibiras un email con el numero de seguimiento cuando tu pedido sea enviado.</p>
        </div>
      </div>

      <div style="background: #f5f0eb; padding: 24px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #888;">IXXI Cosmetics &bull; Belleza natural, resultados excepcionales</p>
        <p style="margin: 8px 0 0; font-size: 12px; color: #aaa;">Si tienes alguna pregunta, contactanos en contacto@ixxi.com</p>
      </div>
    </div>
  `;

  const resend = getResend();
  // Use verified domain in production, fallback to Resend sandbox until ixxi.com is verified
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'IXXI Cosmetics <onboarding@resend.dev>';

  await resend.emails.send({
    from: fromAddress,
    to: toEmail,
    subject: `Pedido confirmado IXXI-${orderRef}`,
    html,
  });
}
