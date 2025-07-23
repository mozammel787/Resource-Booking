# Resource Booking Frontend

A mini full-stack web application that allows users to book shared resources (like rooms or devices) with conflict and buffer-time detection.

##  Live Demo

 [https://resource-booking.vercel.app](https://resource-booking.vercel.app)

##  Features

-  Book resources with start and end datetime
-  Prevents overlapping bookings using buffer logic
-  Buffer Time Logic: Adds 10-minute buffer before and after each booking
-  Filter bookings by resource or date
-  Shows status tags — **Upcoming**, **Ongoing**, or **Past**
-  Sorts bookings by upcoming time
-  Option to cancel/delete a booking
-  Weekly calendar view (Bonus)
-  Real-time feedback and error messages

## UI Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [Shadcn](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone https://github.com/mozammel787/Resource-Booking.git
cd Resource-Booking
npm install
npm run dev

This will start the development server at http://localhost:3000

```

## API

[https://resource-booking-server.vercel.app](https://resource-booking-server.vercel.app)

## Booking Form Fields

- Resource – Dropdown with sample values

- Start Time – DateTime-local input

- End Time – DateTime-local input

- Requested By – Text input

## Validation

- End Time > Start Time

- Duration ≥ 15 minutes

- No conflict (includes 10-min buffer before/after)
