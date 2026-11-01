# Eco Bloom: Plantation Management System

A microservices web app for running tree-plantation drives, donations and
environmental reports, with separate dashboards for users, members and admins.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

## About

Eco Bloom connects three kinds of people around plantation drives. **Users** enroll in
drives, donate, file environmental reports and chat with an AI assistant. **Members**
work through the tasks they are assigned. **Admins** create drives, assign tasks, review
donations and act on reports. The backend is split into Express microservices behind an
API gateway, and a React + Vite client serves all three role-based dashboards.

## Features

**Users**
- Browse upcoming plantation drives and enroll in them
- Donate through a multi-step flow with Stripe payments (PaymentIntents and a webhook)
- Submit environmental reports with supporting images (uploaded through Multer)
- Product catalogue with a cart kept in `localStorage`, and a checkout page
- Feedback form, delivered by email through the mail service
- AI chatbot powered by Google Gemini (`gemini-2.0-flash`) that guides users around the app

**Members**
- Dashboard of assigned tasks with charts
- Update task status
- Donation history

**Admins**
- Create, update and delete plantation drives
- Assign tasks to members and track task counts per member
- Review donations and update their status
- Review reports, change their status, take action on them or delete them
- Dashboard with report visualisations (Recharts)

**Platform**
- JWT authentication signed with a separate secret per role (admin, member, user), 3-hour expiry
- Role-protected client routes (`/user`, `/member`, `/admin`)
- Forgot-password flow with a bcrypt-hashed 6-digit OTP sent by email
- API gateway proxying to each service with `http-proxy-middleware`

## Architecture

```
                     ┌──────────────────────────────┐
  React client ────▶ │ API Gateway  :5000           │
                     └──────────────┬───────────────┘
        /api/auth ──▶ authService    :5002   login, signup, profile, password reset
        /user     ──▶ userService    :5003   donations, Stripe, reports, drive enrolment
        /admin    ──▶ adminService   :5004   drives, donations, reports, report data
        /member   ──▶ memberService  :5005   tasks
        /mail     ──▶ mailservice    :5007   send mail, feedback (Nodemailer)
```

The services share Mongoose models, the database URL, the CORS config and the JWT
secrets, plus the Nodemailer transport used for password resets, through the `models-pms` npm package (some also use `models-aryan`), so those
values are not configured in this repository.

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, Vite, React Router, Redux Toolkit, MUI, Tailwind CSS, styled-components, Framer Motion, Recharts, React Slick, React Toastify, Axios |
| Backend | Node.js, Express, Mongoose, JSON Web Tokens, bcrypt, Multer, Morgan, http-proxy-middleware |
| Payments | Stripe (client `@stripe/react-stripe-js`, server `stripe`) |
| Email | Nodemailer |
| AI | Google Generative AI SDK (Gemini) |
| Database | MongoDB |

## Project Structure

```
NEW-REP/
├── backend/
│   ├── apiGateway/            # Express proxy on :5000
│   └── services/
│       ├── authService/       # login, signup, profile, forgot/reset password
│       ├── userService/       # donations, Stripe, reports, drive enrolment
│       ├── adminService/      # plantation drives, donations, reports, data for charts
│       ├── memberService/     # tasks
│       └── mailservice/       # Nodemailer: send-mail and feedback
└── client/
    └── src/
        ├── app/               # landing page, login, register, forgot password
        ├── pages/
        │   ├── user/          # dashboard, events, donations, reports, products, feedback, chatbot
        │   ├── member/        # dashboard, tasks, donation history
        │   └── admin/         # dashboard, tasks, donations, reports, drives
        ├── redux/             # store, user slice and thunks
        ├── shared/            # header, drawer, account, loader
        └── config/config.js   # API and mail base URLs
```

## API Endpoints

All paths are as seen through the gateway (`http://localhost:5000`).

| Service | Method | Route | Description |
|---|---|---|---|
| Auth | POST | `/api/auth/login` | Log in, returns a role-signed JWT |
| Auth | POST | `/api/auth/signup` | Register a user |
| Auth | GET | `/api/auth/profile` | Current user's profile (authenticated) |
| Auth | POST | `/api/auth/f/forgot-password` | Email a password-reset OTP |
| Auth | POST | `/api/auth/f/reset-password` | Reset the password with the OTP |
| User | POST, GET | `/user/donations` | Create or list donations |
| User | GET | `/user/donations/:id` | Get a donation |
| User | PUT | `/user/donations/:id/status` | Update donation status |
| User | POST | `/user/donations/create-payment-intent` | Create a Stripe PaymentIntent |
| User | POST | `/user/donations/webhook` | Stripe webhook |
| User | POST, GET | `/user/reports` | Create a report (with `supportingImages`) or list reports |
| User | GET, DELETE | `/user/reports/:id` | Get or delete a report |
| User | PATCH | `/user/reports/:id/status` | Update report status |
| User | POST | `/user/drive/enroll/:driveId` | Enroll in a plantation drive |
| Admin | POST, GET | `/admin/drive` | Create or list plantation drives |
| Admin | GET, PUT, DELETE | `/admin/drive/:id` | Read, update or delete a drive |
| Admin | GET | `/admin/donations`, `/admin/donations/:id` | List or get donations |
| Admin | PUT | `/admin/donations/:id` | Update donation status |
| Admin | GET | `/admin/reports`, `/admin/reports/:id` | List or get reports |
| Admin | PUT | `/admin/reports/:id/status` | Update report status |
| Admin | PUT | `/admin/reports/:id/action` | Take admin action on a report |
| Admin | DELETE | `/admin/reports/:id` | Delete a report |
| Admin | GET | `/admin/data/reports` | Report data for dashboard charts |
| Member | GET, POST | `/member/tasks` | List or create tasks |
| Member | GET | `/member/tasks/count` | Members with their task counts |
| Member | GET, PUT, DELETE | `/member/tasks/:id` | Read, update or delete a task |
| Member | GET | `/member/user/:userId` | Tasks assigned to a member |
| Member | POST | `/member/:taskId/status` | Update a task's status |
| Mail | POST | `/mail/send-mail` | Send an email |
| Mail | POST | `/mail/feedback` | Send user feedback |

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB, reachable at the URL the `models-pms` package provides
- A Stripe account and a Google Gemini API key for payments and the chatbot

### Install and run

Each service is its own npm project. Install and start each one in a separate terminal:

```bash
cd backend/apiGateway && npm install && npm run dev
cd backend/services/authService && npm install && npm run dev
cd backend/services/userService && npm install && npm run dev
cd backend/services/adminService && npm install && npm run dev
cd backend/services/memberService && npm install && npm run dev
cd backend/services/mailservice && npm install && npm run dev
```

Then the client:

```bash
cd client
npm install
npm run dev       # Vite dev server on http://localhost:5173
```

Other client scripts: `npm run build`, `npm run lint`, `npm run preview`.
Point the client at the gateway by editing `BASE_URL` and `MAIL_URL` in
`client/src/config/config.js`.

### Environment variables

| Name | Used by |
|---|---|
| `API_GATEWAY_PORT` | API gateway port (default `5000`) |
| `PORT` | userService, adminService and memberService ports (defaults `5003`, `5004`, `5005`) |
| `EMAIL_USER` | Mail service: Nodemailer account and sender address |
| `EMAIL_PASS` | Mail service: password or app password for that account |
| `MAIL_SENDER` | Auth service: sender address for password-reset emails |

The Stripe secret key, Stripe publishable key and Gemini API key are currently set in
source (`userService/controllers/donationController.js`,
`client/src/pages/user/components/Payment.jsx` and
`client/src/pages/user/utils/GeminiRes.jsx`). Replace them with your own, ideally
loaded from environment variables.

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
