# Whistle Aligners [ Landing Page ]

A full-stack landing page for **Whistle Aligners**, a teeth alignment product by Clove Dental. Built with **Laravel** as the backend framework and **React (TypeScript)** as the frontend, powered by **Vite**.

**Live URL:** https://whistle-7qsn.onrender.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 (PHP 8.4) |
| Frontend | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Raw CSS via inline styles |
| Routing | React Router DOM |
| Deployment | Render (Docker) |
| Package Manager | npm + Composer |

---

## Project Structure

```
whistle/
├── app/                        # Laravel application logic
├── bootstrap/                  # Laravel bootstrap files
├── config/                     # Laravel configuration
├── database/                   # Migrations and seeders
├── docker/
│   ├── nginx.conf              # Nginx server configuration
│   └── start.sh                # Container startup script
├── public/                     # Publicly accessible files
│   └── images/                 # All static assets (PNG, SVG)
├── resources/
│   ├── js/
│   │   ├── app.tsx             # React entry point
│   │   ├── components/
│   │   │   └── App.tsx         # Root React component
│   │   ├── hooks/              # Custom React hooks (e.g. useWindowWidth)
│   │   ├── layouts/
│   │   │   ├── header.tsx      # Site header with logo & promo banner
│   │   │   └── footer.tsx      # Site footer with links & socials
│   │   ├── lib/                # Utility/helper functions
│   │   ├── pages/
│   │   │   └── Home.tsx        # Main landing page
│   │   ├── routes/
│   │   │   └── index.tsx       # React Router route definitions
│   │   └── types/
│   │       └── global.d.ts     # Global TypeScript type declarations
│   └── views/
│       └── app.blade.php       # Laravel Blade shell (boots React)
├── routes/
│   └── web.php                 # Laravel catch-all route
├── Dockerfile
├── vite.config.js              # Vite + React plugin config
├── tsconfig.json               # TypeScript config
├── package.json
└── composer.json
```

---

## Setup & Installation

### Prerequisites

Make sure you have the following installed:

- PHP >= 8.4
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

### 5. Add Static Assets

Place all image assets inside the `public/images/` folder:

```bash
mkdir -p public/images
# Copy your exported Figma assets here
cp /path/to/your/assets/* public/images/
```

### 6. Run the Development Servers

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
Static assets exported from Figma → public/images/
     ↓
Dockerize with Nginx + PHP-FPM
     ↓
Deploy to Render
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

## Deployment — Render via Docker

This project is deployed on [Render](https://render.com) using Docker with **Nginx + PHP-FPM**.

**Live URL:** https://whistle-7qsn.onrender.com

> ⚠️ Render's free tier spins down after 15 minutes of inactivity. The first load may take 30–50 seconds to wake up.

### Docker Setup

The project includes three Docker-related files:

```
├── Dockerfile
└── docker/
    ├── nginx.conf      # Nginx server config
    └── start.sh        # Container startup script
```

**`Dockerfile`** uses a multi-stage build:
- **Stage 1** — Composer installs PHP dependencies
- **Stage 2** — PHP 8.4-FPM runtime, runs `npm install && npm run build`, serves via Nginx

**`docker/nginx.conf`** — configures Nginx to:
- Listen on port `8080`
- Serve from `/var/www/html/public`
- Route all requests through `index.php` (Laravel)

**`docker/start.sh`** — runs on container startup:
- Writes Render's injected environment variables into `.env`
- Clears and rebuilds Laravel config/route/view cache
- Starts PHP-FPM and Nginx

### Deploying to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repository
4. Set **Environment** to `Docker`
5. Set **Dockerfile Path** to `./Dockerfile`
6. Add the following **Environment Variables**:

```
APP_NAME=Whistle
APP_ENV=production
APP_KEY=base64:xxxx        ← php artisan key:generate --show
APP_DEBUG=false
APP_URL=https://your-app.onrender.com

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

7. Click **Deploy**

### Common Deployment Issues & Fixes

| Issue | Cause | Fix |
|---|---|---|
| Blank white screen | `APP_KEY` not set | Add `APP_KEY` in Render env vars |
| PHP version error | Wrong PHP in Dockerfile | Use `FROM php:8.4-fpm` |
| JS/CSS blocked (Mixed Block) | Assets served over HTTP on HTTPS page | Add `URL::forceScheme('https')` in `AppServiceProvider` |
| 500 error on startup | Missing `.env` file | `start.sh` writes `.env` from Render env vars at startup |
| Slow first load | Free tier spin-down | Expected — first request takes ~30–50s to wake up |

---

## Dependencies

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

- All images must be manually placed in `public/images/` — they are not committed to the repository.
- The project uses **TypeScript** (`.tsx`) throughout the frontend.
- Styling is done entirely with **inline CSS** (`style={{}}`) — no Tailwind or external CSS frameworks.
- The `useWindowWidth` hook is the primary mechanism for responsive breakpoints.
- `APP_KEY` is the most critical environment variable — Laravel will return a 500 error without it.

---

## Author

**Suborno** — [@suborno251](https://github.com/suborno251)