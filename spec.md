# Velvet Blooms

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page florist website for VELVET BLOOMS
- Backend: Products collection (id, name, price, description, imageUrl, isBestseller) with full CRUD
- Backend: Password-protected admin authentication (passkey: "Twentyseven@27withThree@03")
- Frontend: Premium hero section with AI-generated chenille bouquet image, dark gradient overlay, bold heading and subheading, fully mobile-optimized with high-contrast text
- Frontend: Product grid with 10 products, each card showing large image, name, price in ₹, detailed description, "Order on WhatsApp" button with dynamic product name in URL
- Frontend: Fade-in scroll animation for product cards
- Frontend: "Our Story" section
- Frontend: "How to Order" 3-step guide (Browse, Message, Customize)
- Frontend: Customer testimonials section (3-4 sample reviews with star ratings)
- Frontend: Instagram strip linking to @Velvet.blooms__
- Frontend: Visible "Admin Panel" button at bottom of page
- Frontend: Admin panel (password-protected modal/overlay) with ability to add, edit, delete products
- Frontend: Floating WhatsApp icon fixed at bottom corner
- Frontend: Footer with "Made with love and care, based in Mumbai"

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
1. Product type: { id: Nat; name: Text; price: Nat; description: Text; imageUrl: Text; isBestseller: Bool }
2. Stable var products array with seed data for 10 products
3. Public query: getProducts() -> [Product]
4. Update: addProduct(name, price, description, imageUrl, isBestseller) -> Product (admin only)
5. Update: updateProduct(id, name, price, description, imageUrl, isBestseller) -> ?Product (admin only)
6. Update: deleteProduct(id) -> Bool (admin only)
7. Admin auth: verifyPasskey(passkey: Text) -> Bool (checks against hardcoded passkey)

### Frontend
1. App.tsx: Single page scroll layout
2. HeroSection: Full-width AI image with dark gradient overlay, Playfair Display heading, Inter subheading, mobile-optimized
3. ProductGrid: Responsive grid (3 cols desktop, 2 cols tablet, 1 col mobile), ProductCard with fade-in animation
4. ProductCard: Image, name, price in ₹, description, WhatsApp order button linking to wa.me/919653203320
5. OurStory: Short brand story section
6. HowToOrder: 3-step visual guide
7. Testimonials: 3-4 sample reviews with star ratings
8. InstagramStrip: Static gallery linking to @Velvet.blooms__
9. AdminButton: Visible button at bottom of page
10. AdminPanel: Password modal -> product management dashboard (add/edit/delete)
11. FloatingWhatsApp: Fixed bottom-right WhatsApp icon
12. Footer: "Made with love and care, based in Mumbai"

### Seed Data (10 Products)
1. Single Flower Bouquet - ₹99
2. Double Flower Bouquet - ₹199
3. Triple Flower Bouquet - ₹299
4. Five Flower Bouquet - ₹499
5. Seven Flower Bouquet - ₹699
6. Evil Eye Pot - ₹649
7. Single Sunflower - ₹249
8. Single Rose (various colors) - ₹199
9. Small Beautiful Pots - ₹149
10. Small Sunflower - ₹99
