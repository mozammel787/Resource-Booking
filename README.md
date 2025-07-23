# Resource Booking System - Frontend

Book shared resources like meeting rooms with conflict detection and buffer time.

## 🚀 Live Demo
- **App**: https://resource-booking.vercel.app/
- **API**: https://resource-booking-server.vercel.app/

## Features
- Book resources with date/time picker
- View all bookings in dashboard
- Filter by resource and date
- Prevents overlapping bookings (10-min buffer)
- Status indicators (upcoming/ongoing/past)

## Tech Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- React Hooks

## Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/mozammel787/Resource-Booking.git
   cd Resource-Booking
   npm install
   ```

2. **Run**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## How It Works
- Select resource, time, and your name
- System checks for conflicts (includes 10-min buffer)
- View all bookings in dashboard
- Filter and sort bookings

## Scripts
```bash
npm run dev    # Development
npm run build  # Build for production
npm start      # Production server
```

## Deployment
Deploy in Vercel.

---
Built with Next.js + TypeScript
