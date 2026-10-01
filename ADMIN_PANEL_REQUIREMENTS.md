# BroHood Admin & Operations Dashboard: Master Specification & Implementation Prompt

> **Instructions for the AI Assistant / Developer:**
> You are tasked with creating a standalone, production-ready **Next.js (App Router) Admin Dashboard** for **BroHood**—a multi-category e-commerce platform specializing in 1:1 first-copy luxury watches, hype sneakers, designer goggles, and streetwear apparel.
> 
> This Admin panel interacts directly with the existing **Supabase PostgreSQL database** using the `SUPABASE_SERVICE_ROLE_KEY` (to bypass RLS for administrative operations) and integrates **Cloudinary** for image uploads so that only public CDN URLs are stored in the database.

---

## 1. Tech Stack & Environment Architecture

* **Framework:** Next.js 15+ (App Router), React 19, TypeScript
* **Styling:** Tailwind CSS (Dark/Modern sleek command-center aesthetic, high contrast)
* **Icons:** `lucide-react`
* **Charts/Analytics:** `recharts` or Chart.js
* **Database Client:** `@supabase/supabase-js` using `SUPABASE_SERVICE_ROLE_KEY`
* **Media Storage:** Cloudinary Upload Widget / Direct REST Upload API

### Environment Variables Required (`.env.local`)
```env
# Supabase Database (Same DB as storefront)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi... # Service role key to manage all tables without RLS friction

# Custom Admin Access PIN / Secret
ADMIN_PASSWORD=brohood_admin_secret_2026

# Cloudinary Integration (Direct image upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=brohood_products
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 2. Authentication & Security (Custom Lightweight Pin/Password Gate)

* **No Supabase Auth complexity needed for admin.**
* A dedicated `/login` screen with a sleek PIN / Secret Password input.
* On successful match with `ADMIN_PASSWORD`:
  * Sets an `HttpOnly` secure cookie or JWT session (`brohood_admin_session=true`).
  * Middleware (`middleware.ts`) protects all routes (`/`, `/products`, `/orders`, `/inventory`, `/users`, `/analytics`).
  * Instant Sign-Out clears the cookie and redirects to `/login`.

---

## 3. Core Modules & Required Features

### 3.1 Analytics & Executive KPI Dashboard (`/`)
* **KPI Metrics Cards:**
  * **Total Gross Revenue (INR ₹)** (Prepaid + Delivered COD)
  * **Total Orders Placed** (with status breakdown pills)
  * **Active Inventory Value & Low Stock Alert Count**
  * **Total Registered Customers**
* **Visual Charts:**
  * **Revenue Trend (Last 30 Days):** Line or Bar chart showing daily sales volume.
  * **Payment Method Distribution:** Donut chart comparing **Cash on Delivery (COD)** vs **Razorpay Online (UPI/Cards)**.
  * **Category Breakdown:** Pie chart of sales between Watches, Sneakers, Goggles, and T-Shirts.
* **Recent Orders Table:** Top 5 latest orders with 1-click status update and quick view.

---

### 3.2 Product Management (`/products`)
* **Product Catalog List:**
  * Search by product title, brand, or SKU.
  * Filter by Category (Watches, Sneakers, Goggles, T-Shirts) and Status (Active / Draft).
  * Columns: Thumbnail, Title, Brand, Category, MRP, Selling Price, Total Stock, Badges (`HOT`, `Bestseller`), Actions.
* **Create / Edit Product Form (`/products/new` & `/products/[id]`):**
  * **Basic Info:** Title, auto-generating Slug, Brand selector, Category selector, Description.
  * **Pricing:** Original MRP (strikethrough) and Selling Price (auto-calculates discount percentage).
  * **Merchandising Flags:** Toggles for `is_hot` (Hot Drop), `is_bestseller`, `is_new_arrival`, and `is_active`.
  * **Dynamic Specifications (JSONB Editor):**
    * *Preset templates for Watches:* Movement (Automatic/Quartz), Case Diameter, Glass, Water Resistance.
    * *Preset templates for Sneakers:* Upper Material, Sole Type, Inclusions (Extra laces, Box type).
    * *Preset templates for T-Shirts:* GSM (240/260), Fabric (French Terry), Fit Type.
  * **Cloudinary Image Uploader:**
    * Drag-and-drop or file selector to upload multiple high-res product photos to Cloudinary.
    * Preview uploaded images with reordering and "Set as Primary Thumbnail" toggle.
    * Stores Cloudinary CDN URL directly in `primary_image` and `product_images` table.
* **Delete Product:** Modal confirmation with cascade warning.

---

### 3.3 Inventory & Variant Manager (`/inventory`)
* **Variant Management by Category:**
  * **Footwear / Sneakers:** Sizes UK 6, UK 7, UK 8, UK 9, UK 10, UK 11.
  * **Apparel / T-Shirts:** Sizes S, M, L, XL, XXL.
  * **Watches & Eyewear:** Dial colors (e.g. Black Dial, Hulk Green, Deep Blue) or Frame Tints.
* **Live Stock Adjuster:**
  * Quick inline +/- stock editor without having to open the full product form.
  * SKU generator / editor (e.g., `RLX-SUB-BLK-41`).
  * Price delta support (e.g., +₹500 for Swiss movement upgrade or premium box).
* **Low Stock Warning Center:**
  * Dedicated tab highlighting all variants with `<= 3` units remaining.
  * Bulk stock restock action.

---

### 3.4 Dropshipping Order Operations & Courier Tracking (`/orders`)
* **Order Tracking Board:**
  * Filter by status: `Placed`, `Confirmed`, `Shipped`, `Delivered`, `Cancelled`.
  * Filter by payment method: `COD` vs `Razorpay Online`.
  * Filter by date range or search by Order Number (`BH-2026-XXXXXX`) or Customer Phone.
* **Order Detail Drawer / Modal (`/orders/[id]`):**
  * **Customer Info & Address:**
    * Full Customer Name, Mobile Number (WhatsApp-enabled), Complete Shipping Address, City, State, and Pincode.
    * **1-Click "Copy Address for Supplier" Button:** Formats the customer's shipping details and ordered items into standard text ready to paste directly into the wholesale provider's portal or WhatsApp order desk:
      ```text
      📦 NEW BROHOOD DROPSHIP ORDER: [Order Number]
      Item: [Product Title] | Size: [Size] | Color/Dial: [Variant] | Qty: [Quantity]
      Customer Name: [Name]
      Phone: [Mobile Number]
      Address: [Street Address, Line 2]
      City & State: [City], [State]
      Pincode: [Pincode]
      Payment Mode: [COD / Prepaid]
      ```
  * **Supplier Tracking & Margin Calculator:**
    * Input fields for:
      * **Supplier / Wholesaler Name** (e.g. "Delhi Watch Hub", "Surat Sneaker Supply")
      * **Supplier Order ID / Invoice No.**
      * **Wholesale Cost (INR ₹)** (Cost you paid to the supplier)
      * **Net Profit Margin (Auto-Calculated):** `Customer Paid - Supplier Cost` (Displays your exact profit in green ₹).
  * **Courier Dispatch & Live Customer Tracking Sync:**
    * Courier Partner Selector: `Delhivery`, `Blue Dart`, `DTDC`, `Xpressbees`, `India Post Speed Post`.
    * **Courier AWB / Tracking ID Input:** Entering the tracking number immediately updates the customer's `/orders` tracking page in real-time.
    * **1-Click "Send Tracking on WhatsApp":** Opens WhatsApp to the customer's phone with a pre-filled tracking notification message:
      > *"Hi [Customer Name], your BroHood order [Order Number] has been dispatched via [Courier]! Tracking ID: [AWB]. Track live here: https://brohood.in/orders"*
  * **Status Lifecycle Progression:**
    `Order Placed` → `Placed with Supplier` → `Shipped (AWB Assigned)` → `Out for Delivery` → `Delivered` / `Cancelled`.
  * **Print Packing Slip / Thermal Invoice:** Clean printable template with customer address, barcode, and item checklist.

---

### 3.5 User & Customer Directory (`/users`)
* Table of all registered customers (`public.profiles`):
  * Name, Email, Phone number, Role (`customer`, `manager`, `admin`).
  * Total Orders Placed and Lifetime Spend (INR).
  * View customer's order history and saved delivery addresses (`public.addresses`).

---

### 3.6 Coupon Code Manager (`/coupons`)
* List, create, and toggle promo discount codes (`public.coupons`):
  * Code string (e.g. `FIRST10`, `BROHOOD500`).
  * Discount Type: Percentage (`%`) or Flat Amount (`₹`).
  * Discount Value, Minimum Order Value, and Maximum Discount cap.
  * Toggle Active / Expired.

---

## 4. Database Schema Reference

The dashboard directly operates on the following Supabase PostgreSQL tables:
* `public.profiles` (`id`, `email`, `full_name`, `phone`, `role`)
* `public.categories` (`id`, `name`, `slug`, `image_url`, `sort_order`)
* `public.brands` (`id`, `name`, `slug`, `category_id`, `logo_url`)
* `public.products` (`id`, `title`, `slug`, `brand_id`, `category_id`, `description`, `specs`, `mrp`, `price`, `primary_image`, `is_hot`, `is_bestseller`, `is_active`)
* `public.product_variants` (`id`, `product_id`, `variant_type`, `name`, `sku`, `stock_quantity`, `price_delta`)
* `public.product_images` (`id`, `product_id`, `image_url`, `is_primary`, `sort_order`)
* `public.orders` (`id`, `order_number`, `user_id`, `shipping_address`, `payment_method`, `payment_status`, `order_status`, `subtotal`, `discount_amount`, `shipping_fee`, `final_total`, `tracking_number`, `courier_partner`)
* `public.order_items` (`id`, `order_id`, `product_id`, `variant_id`, `variant_name`, `unit_price`, `quantity`, `total_price`)
* `public.coupons` (`id`, `code`, `discount_type`, `discount_value`, `min_order_value`, `max_discount`, `is_active`)
* `public.addresses` (`id`, `user_id`, `full_name`, `phone`, `address_line1`, `city`, `state`, `pincode`)

---

## 5. UI/UX Aesthetic Guidelines

* **Style:** High-end Dark Luxury Command Center.
* **Palette:**
  * Background: Slate Obsidian `#0a0b0e` / Surface `#121318` / Borders `#1f2128`
  * Accents: Metallic Gold / Amber (`#f59e0b` or `#e5c158`) for actions & highlights
  * Status Indicators: Emerald Green for `Delivered` / `Paid`, Amber for `Shipped` / `Pending`, Red for `Cancelled` / `Low Stock`
* **Components:**
  * Sticky Sidebar Navigation with collapsed/expanded states.
  * Fast search with keyboard shortcuts (`Cmd/Ctrl + K`).
  * Toast notifications for all mutation actions (Product created, Order status updated, Stock adjusted).
