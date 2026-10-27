# MenuVista — QR Digital Menu for Hotels and Restaurants

**MenuVista** is a luxury, mobile-first QR Digital Menu web application crafted for **Hawassa Lake Hotel** (located in Hawassa, Sidama Region, Ethiopia). Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**, **Lucide React**, and **qrcode**, it works out of the box with zero database dependencies, zero paid APIs, and zero required environment variables.

---

## ✨ Features Included

1. **Customer Digital Menu (`/`)**
   - Luxury hospitality aesthetic with a **Warm Cream (`#FDFBF7`)** background, **Deep Forest Green (`#0D241B`)**, and **Muted Gold (`#C5A059`)** accents.
   - **All 11 Required Categories**:
     1. Breakfast
     2. Ethiopian Traditional Food
     3. Starters and Appetizers
     4. Main Courses
     5. Burgers and Sandwiches
     6. Pizza and Pasta
     7. Vegetarian and Vegan
     8. Salads
     9. Desserts
     10. Coffee and Tea
     11. Fresh Juice and Soft Drinks
   - **33 Authentic Menu Items** with high-resolution food photography, descriptions, tasting notes, preparation times, allergen info, and realistic prices in **Ethiopian Birr (ETB)**.
   - Real-time search bar, category pill filtering with item counts, Vegetarian/Vegan/Available-Only toggles, interactive item detail modal, and helpful empty states.

2. **QR Code & Printable Hotel Poster Generator (`/qr`)**
   - Enter any website URL to generate a real, scannable high-resolution QR code.
   - Live preview of a luxury **Hawassa Lake Hotel** table poster displaying the hotel name and the instruction **"Scan to View Our Menu"**.
   - **Download PNG** button to save the QR code image directly.
   - **Print QR Poster** button with dedicated `@media print` styling that cleanly prints only the framed hotel poster for table stands, room desks, or reception signage.

3. **Hotel Information Page (`/hotel`)**
   - Displays **Hawassa Lake Hotel** branding, lakeside address in Hawassa, Ethiopia, phone/WhatsApp/email contact info, opening hours (including daily Traditional Sidama Coffee Ceremony times), and resort amenities.

4. **Manager Settings (`/settings`)** (password-protected)
   - Manage hotel branding, contact info, opening hours, amenities, menu items (add/edit/delete/availability/price), and QR code defaults.
   - Changes are saved in this browser (localStorage) and persist across refreshes and sessions on this device. Use Backup tab to export/import JSON.

---

## 🚀 Running Locally After Extraction

1. **Extract `MenuVista-Vercel-Ready.zip`** and open a terminal inside the `menuvista` folder:
   ```bash
   cd menuvista
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run TypeScript & production build checks (optional verification)**:
   ```bash
   npm run typecheck
   npm run build
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. Open **`http://localhost:3000`** in your browser.

---

## 🌐 Deploying to GitHub & Vercel (Standard Next.js Workflow)

### Step 1: Upload to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `menuvista`.
2. Inside the extracted `menuvista/` folder, initialize Git and push the project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MenuVista QR Digital Menu for Hawassa Lake Hotel"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/menuvista.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Log in to [Vercel](https://vercel.com/) and click **"Add New..." → "Project"**.
2. Import your `menuvista` GitHub repository.
3. Vercel will automatically detect **Next.js**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)
   - **Environment Variables**: None required!
4. Click **"Deploy"**. Within ~60 seconds, Vercel will publish your live production URL (for example, `https://menuvista.vercel.app`).

### Step 3: Generate Your Final Production QR Code
> **IMPORTANT:** Once your site is live on Vercel, open `https://your-live-domain.vercel.app/qr`. Confirm that your live Vercel URL is in the URL field, click **Generate / Refresh QR Code**, and then click **Download PNG** or **Print QR Poster**. This ensures your printed hotel QR codes point directly to your live production menu rather than `localhost`.
