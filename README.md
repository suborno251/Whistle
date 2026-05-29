# Whistle Aligners [ Landing Page ]

A full-stack landing page for **Whistle Aligners**, a teeth alignment product by Clove Dental. Built with **Laravel** as the backend framework and **React (TypeScript)** as the frontend, powered by **Vite**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 (PHP 8.5) |
| Frontend | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Raw CSS via inline styles |
| Routing | React Router DOM |
| Package Manager | npm + Composer |

---

## Project Structure

```
whistle/
├── app/                        # Laravel application logic
├── bootstrap/                  # Laravel bootstrap files
├── config/                     # Laravel configuration
├── database/                   # Migrations and seeders
├── public/                     # Publicly accessible files
│   └── images/                 # All static assets (PNG, SVG)
├── resources/
│   ├── js/
│   │   ├── app.tsx                 # React entry point
│   │   ├── components/
│   │   │   └── App.tsx             # Root React component
│   │   ├── hooks/                  # Custom React hooks (e.g. useWindowWidth)
│   │   ├── layouts/
│   │   │   ├── header.tsx          # Site header with logo & promo banner
│   │   │   └── footer.tsx          # Site footer with links & socials
│   │   ├── lib/                    # Utility/helper functions
│   │   ├── pages/
│   │   │   └── Home.tsx            # Main landing page
│   │   ├── routes/
│   │   │   └── index.tsx           # React Router route definitions
│   │   └── types/
│   │       └── global.d.ts         # Global TypeScript type declarations
│   └── views/
│       └── app.blade.php           # Laravel Blade shell (boots React)
├── routes/
│   └── web.php                 # Laravel catch-all route
├── vite.config.js              # Vite + React plugin config
├── tsconfig.json               # TypeScript config
├── package.json
└── composer.json
```

---

## Setup & Installation

### Prerequisites

Make sure you have the following installed:

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/suborno251/Whistle.git
cd Whistle
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Environment Setup

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Run the Development Servers

You need **two terminals** running simultaneously:

```bash
# Terminal 1 — Laravel
php artisan serve

# Terminal 2 — Vite (React)
npm run dev
```

Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## How It Works

### Laravel as Backend Shell

Laravel serves a single Blade view (`app.blade.php`) that acts as the HTML shell for the React app:

```php
// routes/web.php
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
```

```html
<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html>
<head>
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### React Takes Over

React mounts into `<div id="app">` and React Router handles all frontend navigation:

```tsx
// resources/js/app.tsx
ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
```

### Responsive Layout

Since the project uses raw inline CSS (no Tailwind), responsiveness is handled via a custom `useWindowWidth` hook:

```tsx
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return width
}
```

This allows conditional layout changes based on screen width:

```tsx
const isDesktop = width >= 768

<div style={{
    flexDirection: isDesktop ? 'row' : 'column'
}}>
```

---

## Development Workflow

```
Figma Design
     ↓
Rocket.io (Figma → HTML conversion)
     ↓
Manual HTML/CSS cleanup & fixes
     ↓
Convert HTML sections → React components (TSX)
     ↓
Add responsiveness via useWindowWidth hook
     ↓
Wire up React Router + Laravel catch-all route
     ↓
Static assets exported from Rocket.io → public/images/
```

---

## Key Pages & Components

| File | Description |
|---|---|
| `resources/js/app.tsx` | React DOM entry point |
| `resources/js/components/App.tsx` | Root component, renders RouterProvider |
| `resources/js/layouts/header.tsx` | Site header with logo and promo banner |
| `resources/js/layouts/footer.tsx` | Footer with links, contact and socials |
| `resources/js/pages/Home.tsx` | Full landing page with all sections |
| `resources/js/routes/index.tsx` | React Router route definitions |
| `resources/js/types/global.d.ts` | Global TypeScript declarations |
| `resources/views/app.blade.php` | Blade shell that boots React |
| `routes/web.php` | Laravel catch-all route |
| `vite.config.js` | Vite config with Laravel + React plugins |

---

## Production Build

```bash
npm run build
php artisan optimize
```

This compiles React into `public/build/` — no Vite server needed in production.

---

## 📦 Dependencies

### PHP (Composer)
- `laravel/framework` — Core Laravel framework

### JavaScript (npm)
- `react` + `react-dom` — UI library
- `react-router-dom` — Client-side routing
- `typescript` — Type safety
- `@vitejs/plugin-react` — Vite React plugin
- `laravel-vite-plugin` — Laravel + Vite integration

---

## Notes

- The project uses **TypeScript** (`.tsx`) throughout the frontend.
- Styling is done entirely with **inline CSS** (`style={{}}`) — no Tailwind or external CSS frameworks.
- The `useWindowWidth` hook is the primary mechanism for responsive breakpoints.

---

## Author

**Suborno** — [@suborno251](https://github.com/suborno251)