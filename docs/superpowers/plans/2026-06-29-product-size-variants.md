# Product Size Variants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a product be sold in multiple sizes with per-size prices, while single-price products stay unchanged; also apply four MXN price updates.

**Architecture:** Add an optional `variants` array to the `Product` model. A product with variants exposes its cheapest variant as the base `price` (the "Desde" value). The cart tracks an optional `variant` per line and identifies lines by `variant.id ?? product.id`, so two sizes of one product are separate lines. The detail page lets the customer pick a size; the card forces variant products into the detail page. The checkout API resolves the variant price server-side (never trusts the client).

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind, Stripe.

## Global Constraints

- Prices are in Mexican pesos (MXN); Stripe currency is already `mxn`.
- No test framework is installed. The per-task gate is `npm run build` (TypeScript type-check + compile) followed by `npm run lint`. Final manual verification runs the dev server.
- Price is always computed server-side in `app/api/checkout/route.ts`; never trust a client-sent price.
- Follow existing code style (no semicolare changes, keep current Tailwind class patterns).
- Spanish UI copy.

---

### Task 1: Data model + price updates

**Files:**
- Modify: `data/products.ts`

**Interfaces:**
- Produces:
  - `interface ProductVariant { id: string; label: string; price: number }`
  - `Product` gains `variants?: ProductVariant[]`
  - Product id `13` has `price: 419` and `variants: [{id:'13-150',label:'150 ML',price:419},{id:'13-250',label:'250 ML',price:649}]`

- [ ] **Step 1: Add the `ProductVariant` interface and the `variants` field**

In `data/products.ts`, add the interface immediately above `export interface Product`:

```ts
export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}
```

Inside `export interface Product`, add this line after `price: number;`:

```ts
  variants?: ProductVariant[];
```

- [ ] **Step 2: Update the Tratamiento Multivitamínico (id '13') price and add variants**

In the product object with `id: '13'`, change `price: 84.99,` to `price: 419,` and add (e.g. right after the `price` line):

```ts
    variants: [
      { id: '13-150', label: '150 ML', price: 419 },
      { id: '13-250', label: '250 ML', price: 649 },
    ],
```

- [ ] **Step 3: Apply the three flat price updates**

- In product `id: '14'` (Mascarilla Hidratación Profunda): change `price: 64.99,` to `price: 289,`
- In product `id: '15'` (Mascarilla Reestructurante con Pigmento): change `price: 69.99,` to `price: 349,`
- In product `id: '16'` (Sérum de Argán Protector Térmico): change `price: 49.99,` to `price: 349,`

- [ ] **Step 4: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, no type errors, no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add data/products.ts
git commit -m "Add product variants model and update IXXI prices (MXN)"
```

---

### Task 2: Variant-aware cart (context + drawer)

**Files:**
- Modify: `lib/cartContext.tsx`
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: `Product`, `ProductVariant` from `@/data/products` (Task 1).
- Produces:
  - `interface CartItem { product: Product; variant?: ProductVariant; quantity: number }`
  - `cartLineId(item: CartItem): string` exported helper
  - `addItem(product: Product, variant?: ProductVariant): void`
  - `removeItem(lineId: string): void`
  - `updateQuantity(lineId: string, quantity: number): void`
  - `subtotal` sums `(variant?.price ?? product.price) * quantity`

- [ ] **Step 1: Rewrite `lib/cartContext.tsx` to be variant-aware**

Replace the whole file with:

```tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, ProductVariant } from '@/data/products';

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export function cartLineId(item: CartItem): string {
  return item.variant?.id ?? item.product.id;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, variant?: ProductVariant) => {
    const lineId = variant?.id ?? product.id;
    setItems(prev => {
      const existing = prev.find(item => cartLineId(item) === lineId);
      if (existing) {
        return prev.map(item =>
          cartLineId(item) === lineId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (lineId: string) => {
    setItems(prev => prev.filter(item => cartLineId(item) !== lineId));
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(lineId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        cartLineId(item) === lineId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.variant?.price ?? item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
```

- [ ] **Step 2: Update the cart drawer in `components/Header.tsx`**

Add `cartLineId` to the import:

```tsx
import { useCart, cartLineId } from '@/lib/cartContext';
```

Replace the cart-items `.map(...)` block (the `items.map(item => ( ... ))` inside "Cart Content") with:

```tsx
                  {items.map(item => {
                    const lineId = cartLineId(item);
                    const unitPrice = item.variant?.price ?? item.product.price;
                    return (
                      <div key={lineId} className="flex gap-4 items-center">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                          {item.variant && <p className="text-xs text-muted-foreground">{item.variant.label}</p>}
                          <p className="text-primary font-semibold">${unitPrice.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => updateQuantity(lineId, item.quantity - 1)} className="w-7 h-7 border border-border rounded flex items-center justify-center hover:bg-secondary">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(lineId, item.quantity + 1)} className="w-7 h-7 border border-border rounded flex items-center justify-center hover:bg-secondary">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(lineId)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
```

- [ ] **Step 3: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds. (Type errors here would mean a consumer still calls `addItem`/`removeItem`/`updateQuantity` with the old signature — fix in the relevant task.)

- [ ] **Step 4: Commit**

```bash
git add lib/cartContext.tsx components/Header.tsx
git commit -m "Make cart variant-aware (line identity by variant id)"
```

---

### Task 3: Product card — "Desde" price + force size choice

**Files:**
- Modify: `components/ProductCard.tsx`

**Interfaces:**
- Consumes: `Product.variants` (Task 1), `addItem` (Task 2).

- [ ] **Step 1: Compute `hasVariants` and update the price line**

In `components/ProductCard.tsx`, inside the component body after `const { addItem } = useCart();`, add:

```tsx
  const hasVariants = !!product.variants && product.variants.length > 0;
```

Replace the price line:

```tsx
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
```

with:

```tsx
        <p className="text-lg font-semibold">
          {hasVariants ? `Desde $${product.price.toFixed(2)}` : `$${product.price.toFixed(2)}`}
        </p>
```

- [ ] **Step 2: Make the quick-add button navigate to detail for variant products**

Replace the existing quick-add `<button>` (the one with `onClick={() => addItem(product)}` and the `ShoppingCart` icon) with:

```tsx
        {hasVariants ? (
          <Link
            href={`/shop/${product.id}`}
            className="absolute bottom-3 right-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4" />
          </Link>
        ) : (
          <button
            onClick={() => addItem(product)}
            className="absolute bottom-3 right-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        )}
```

(`Link` is already imported in this file.)

- [ ] **Step 3: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/ProductCard.tsx
git commit -m "Product card: show 'Desde' price and route variant products to detail"
```

---

### Task 4: Detail page — size selector

**Files:**
- Modify: `app/shop/[id]/page.tsx`

**Interfaces:**
- Consumes: `Product.variants`, `ProductVariant` (Task 1), `addItem(product, variant?)` (Task 2).

- [ ] **Step 1: Import `ProductVariant` and add selected-variant state**

Update the products import to include `ProductVariant`:

```tsx
import { products, getRelatedProducts, ProductVariant } from '@/data/products';
```

After `const product = products.find(p => p.id === params.id);` and alongside the other `useState` calls (before the `if (!product) notFound();` line, to respect the Rules of Hooks), add:

```tsx
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product?.variants?.[0]);
```

- [ ] **Step 2: Use the selected variant for price and add-to-cart**

Replace the price line:

```tsx
            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
```

with:

```tsx
            <p className="text-3xl font-bold mb-6">${(selectedVariant?.price ?? product.price).toFixed(2)}</p>
```

Replace `handleAddToCart`:

```tsx
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };
```

with:

```tsx
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
  };
```

- [ ] **Step 3: Render the size selector**

Immediately after the price `<p>` line (from Step 2) and before the `<p className="text-muted-foreground mb-8">{product.description}</p>` line, insert:

```tsx
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Tamaño</p>
                <div className="flex gap-3">
                  {product.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                        selectedVariant?.id === v.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
```

- [ ] **Step 4: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/shop/[id]/page.tsx
git commit -m "Detail page: size selector drives price and add-to-cart"
```

---

### Task 5: Checkout — send and resolve the variant

**Files:**
- Modify: `app/checkout/page.tsx`
- Modify: `app/api/checkout/route.ts`

**Interfaces:**
- Consumes: cart `items` with optional `variant` (Task 2); `Product.variants` (Task 1).
- Produces: POST body items shape `{ id: string; variantId?: string; quantity: number }`.

- [ ] **Step 1: Send `variantId` from the checkout page**

In `app/checkout/page.tsx`, in the `fetch('/api/checkout', ...)` POST body, replace:

```tsx
        items: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
```

with:

```tsx
        items: items.map(i => ({ id: i.product.id, variantId: i.variant?.id, quantity: i.quantity })),
```

- [ ] **Step 2: Show variant label + per-line variant price in the order summary**

Replace the order-summary `items.map(...)` block:

```tsx
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
```

with:

```tsx
              {items.map(item => {
                const unitPrice = item.variant?.price ?? item.product.price;
                return (
                  <div key={item.variant?.id ?? item.product.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      {item.variant && <p className="text-xs text-muted-foreground">{item.variant.label}</p>}
                      <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(unitPrice * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
```

- [ ] **Step 3: Resolve the variant price server-side in `app/api/checkout/route.ts`**

Replace the price-loop block:

```ts
    for (const item of items as { id: string; quantity: number }[]) {
      const product = products.find(p => p.id === item.id);
      if (!product) throw new Error(`Product not found: ${item.id}`);
      subtotal += product.price * item.quantity;
      itemDescriptions.push(`${product.name} x${item.quantity}`);
    }
```

with:

```ts
    for (const item of items as { id: string; variantId?: string; quantity: number }[]) {
      const product = products.find(p => p.id === item.id);
      if (!product) throw new Error(`Product not found: ${item.id}`);
      let unitPrice = product.price;
      let label = product.name;
      if (item.variantId) {
        const variant = product.variants?.find(v => v.id === item.variantId);
        if (!variant) throw new Error(`Variant not found: ${item.variantId}`);
        unitPrice = variant.price;
        label = `${product.name} (${variant.label})`;
      }
      subtotal += unitPrice * item.quantity;
      itemDescriptions.push(`${label} x${item.quantity}`);
    }
```

- [ ] **Step 4: Type-check and lint**

Run: `npm run build && npm run lint`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add app/checkout/page.tsx app/api/checkout/route.ts
git commit -m "Checkout: send and resolve variant price server-side"
```

---

### Task 6: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify the card and detail page**

- Visit `/shop`. The Tratamiento Multivitamínico card shows **"Desde $419.00"**; hovering the cart icon links to its detail page (does not add directly).
- Visit the Tratamiento detail page. Two size buttons (150 ML / 250 ML) appear, 150 ML selected by default, price shows **$419.00**. Click 250 ML → price updates to **$649.00**.
- Confirm Protector Térmico shows **$349.00**, Mascarilla Hidratación **$289.00**, Mascarilla Reestructurante **$349.00** on their cards.

- [ ] **Step 3: Verify the cart**

- Add 150 ML, then go back and add 250 ML. The cart drawer shows **two separate lines** with their size labels and correct prices; subtotal = sum of both.
- Adjust quantity / remove on one line — the other line is unaffected.

- [ ] **Step 4: Verify checkout total**

- Go to `/checkout` with the Tratamiento 250 ML in the cart. The order summary line shows the **250 ML** label and **$649.00**. (The Stripe PaymentIntent amount is computed server-side from the resolved variant price.)

- [ ] **Step 5: Final commit if any fixups were needed**

```bash
git add -A
git commit -m "Fixups from manual verification of size variants"
```

---

## Self-Review notes

- **Spec coverage:** data model (Task 1), price updates (Task 1), cart identity (Task 2), card "Desde" + force-detail (Task 3), detail selector (Task 4), checkout send/resolve + summary (Task 5), testing (Task 6). All spec sections covered.
- **Type consistency:** `cartLineId`, `addItem(product, variant?)`, `removeItem(lineId)`, `updateQuantity(lineId, qty)` used consistently across Tasks 2–5. POST body `{ id, variantId, quantity }` matches between checkout page (Task 5 Step 1) and API (Task 5 Step 3).
- **Out of scope (unchanged, flagged in spec):** free-shipping threshold (150), $9.99 flat shipping, 21% tax. Not touched here.
