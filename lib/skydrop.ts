import Stripe from 'stripe';

const SKYDROP_BASE = 'https://pro.skydropx.com/api/v1';

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${SKYDROP_BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.SKYDROP_CLIENT_ID!,
      client_secret: process.env.SKYDROP_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Skydrop auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function createSkydropOrder(paymentIntent: Stripe.PaymentIntent): Promise<string> {
  const { metadata, id } = paymentIntent;

  const token = await getAccessToken();

  const orderRef = `IXXI-${id.slice(-8).toUpperCase()}`;

  const body = {
    reference: orderRef,
    payment_status: 'paid',
    total_price: ((paymentIntent.amount ?? 0) / 100).toFixed(2),
    // TODO: update shipper_address with IXXI Cosmetics business address before going live
    shipper_address: {
      person_name: 'IXXI Cosmetics',
      company: 'IXXI Cosmetics',
      phone: process.env.IXXI_PHONE ?? '0000000000',
      email: 'pedidos@mail.ixxicosmetics.com',
      address: process.env.IXXI_ADDRESS ?? 'Direccion IXXI',
      city: process.env.IXXI_CITY ?? 'Ciudad',
      state: process.env.IXXI_STATE ?? 'Estado',
      postal_code: process.env.IXXI_POSTAL_CODE ?? '00000',
      country: 'MX',
      further_information: 'Origen IXXI Cosmetics',
    },
    recipient_address: {
      person_name: `${metadata?.firstName ?? ''} ${metadata?.lastName ?? ''}`.trim() || 'Cliente',
      phone: metadata?.phone ?? '',
      email: paymentIntent.receipt_email ?? '',
      address: metadata?.address ?? '',
      city: metadata?.city ?? '',
      postal_code: metadata?.postalCode ?? '',
      country: 'MX',
    },
    parcels: [
      {
        weight: '0.5',
        weight_unit: 'kg',
        length: '20',
        width: '15',
        height: '10',
        distance_unit: 'cm',
      },
    ],
    products: metadata?.items
      ? metadata.items.split(', ').map(item => ({ name: item, quantity: 1 }))
      : [],
  };

  console.log('[skydrop] Sending order:', JSON.stringify(body));

  const res = await fetch(`${SKYDROP_BASE}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log('[skydrop] Response status:', res.status, '| body:', text);

  if (!res.ok) {
    throw new Error(`Skydrop order failed: ${res.status} ${text}`);
  }

  const data = text ? JSON.parse(text) : {};

  const skydropOrderId: string = data?.data?.id ?? data?.id ?? 'unknown';
  console.log('[skydrop] Order created:', skydropOrderId, 'for', orderRef);
  return skydropOrderId;
}
