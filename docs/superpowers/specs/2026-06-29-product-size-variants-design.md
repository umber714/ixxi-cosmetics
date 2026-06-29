# Product Size Variants — Design

**Date:** 2026-06-29
**Status:** Approved

## Goal

Support products sold in multiple sizes, each with its own price, while keeping
single-price products unchanged. Triggered by the Tratamiento Multivitamínico now
selling in 150 ML and 250 ML. Also applies several flat price updates.

## Price updates (MXN)

| ID | Product | Old | New |
|----|---------|-----|-----|
| 13 | Tratamiento Multivitamínico con Proteína de Seda IXXI | 84.99 | **see variants** (base = 419) |
| 16 | Sérum de Argán Protector Térmico IXXI | 49.99 | **349** |
| 14 | Mascarilla Hidratación Profunda IXXI | 64.99 | **289** |
| 15 | Mascarilla Reestructurante con Pigmento IXXI | 69.99 | **349** |

Tratamiento Multivitamínico variants:

| Variant id | Label | Price |
|-----------|-------|-------|
| `13-150` | 150 ML | 419 |
| `13-250` | 250 ML | 649 |

Other products (Shampoo id 11, Kit id 17, and the demo facial/makeup products
1–4, 9, 10) are unchanged.

## Data model — `data/products.ts`

```ts
export interface ProductVariant {
  id: string;     // globally unique, e.g. '13-250'
  label: string;  // '250 ML'
  price: number;
}

export interface Product {
  // ...existing fields...
  price: number;            // for variant products, equals the cheapest variant (the "Desde" value)
  variants?: ProductVariant[];
}
```

Tratamiento (id 13): set `price: 419` and add the two variants above (ordered
cheapest first).

## Cart — `lib/cartContext.tsx`

- `CartItem` gains `variant?: ProductVariant`.
- Line identity = `variant?.id ?? product.id`, so 150 ML and 250 ML are distinct lines.
- `addItem(product: Product, variant?: ProductVariant)`.
- Line price = `variant?.price ?? product.price`. `subtotal` uses this.

## Product card — `components/ProductCard.tsx`

- If `product.variants` exists: price renders as `Desde $${product.price.toFixed(2)}`.
- For variant products the quick-add (cart icon) button navigates to
  `/shop/${product.id}` instead of calling `addItem`, forcing a size choice.
  Non-variant products keep the current quick-add behaviour.

## Detail page — `app/shop/[id]/page.tsx`

- If `product.variants` exists: render size-selector buttons. Default selected =
  first variant (cheapest, 150 ML).
- Displayed price = selected variant price; falls back to `product.price` when no variants.
- `handleAddToCart` passes the selected variant to `addItem`.

## Checkout — `app/checkout/page.tsx` + `app/api/checkout/route.ts`

- Checkout page posts `items: items.map(i => ({ id: i.product.id, variantId: i.variant?.id, quantity: i.quantity }))`.
- API resolves price server-side: find product by id, then if `variantId` is
  present find the matching variant and use its price; otherwise use `product.price`.
  Item description includes the size label (e.g. `Tratamiento... (250 ML) x2`).
  Price is never trusted from the client.
- Order summary lines show the size label and per-line variant price.

## Out of scope (flagged follow-up)

The order summary still uses placeholder commerce rules from the old fake prices:
free shipping at subtotal ≥ 150, $9.99 flat shipping, and 21% tax. With real MXN
prices free shipping always triggers, and Mexico's IVA is 16% (not 21%). Tracked
separately; not part of this change.

## Testing

- Cart: adding both sizes of the Tratamiento creates two distinct lines with
  correct prices; subtotal sums variant prices.
- Detail page: switching size updates the displayed price; add-to-cart uses the
  selected size.
- Card: variant product shows "Desde $419"; quick-add navigates to detail.
- Checkout API: server computes the correct total for a cart mixing a variant
  line and a plain product; rejects/handles unknown variant id gracefully.
