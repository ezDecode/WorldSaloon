# Sardar Appointment - Barber Booking App

This is a modern, responsive web application for a barber shop, built with Next.js and Firebase. It allows clients to view services, read testimonials, and book appointments online.

## ✨ Features

- **Modern Landing Page**: A beautiful, single-page design showcasing services and testimonials.
- **Online Booking System**: A multi-step booking flow for a seamless user experience.
- **Dynamic Services Display**: Services are displayed in a clean, interactive card layout.
- **Client Testimonials**: A dedicated section to display customer reviews, fetched dynamically from the database.
- **Feedback Form**: Allows clients to submit their own testimonials directly on the site.
- **Email Notifications**: Automatically prepares formatted email confirmations for both the client and the barber upon successful booking.
- **Secure by Design**: Utilizes Firebase Security Rules to protect user data and Genkit flows with input validation.
- **Fully Responsive**: Looks and works great on all devices, from mobile phones to desktops.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend Services**: [Firebase](https://firebase.google.com/) (Firestore for database)
- **AI & Server-Side Logic**: [Genkit (Firebase GenAI)](https://firebase.google.com/docs/genai)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sardar-appointment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Firebase project configuration and the barber's email address.

    ```env
    # Found in your Firebase project settings
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="..."
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
    NEXT_PUBLIC_FIREBASE_API_KEY="..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
    
    # Email for the barber to receive booking notifications
    BARBER_EMAIL="your-barber-email@example.com"
    ```

4.  **Set up Firebase Security Rules:**
    Deploy the rules located in `firestore.rules` to your Firestore database to secure your data. You can do this via the Firebase Console under `Firestore Database > Rules`.

### Running the Application

-   **Development Mode**:
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, usually on `http://localhost:3000`.

-   **Genkit Development Server**:
    For developing and testing Genkit flows, run the Genkit dev server in a separate terminal:
    ```bash
    npm run genkit:dev
    ```

-   **Production Build**:
    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

```
.
├── src
│   ├── app                 # Next.js App Router pages
│   │   ├── book            # Dedicated booking page
│   │   ├── globals.css     # Global styles and Tailwind directives
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main landing page
│   ├── components          # Reusable React components
│   │   ├── booking         # Components for the booking flow
│   │   ├── landing         # Components for the landing page sections
│   │   └── ui              # ShadCN UI components
│   ├── ai                  # Genkit flows and AI logic
│   │   └── flows           # Server-side flows (e.g., create booking)
│   ├── lib                 # Utility functions and static data
│   │   ├── data.ts         # Services data and time slot logic
│   │   ├── firebase.ts     # Firebase initialization
│   │   └── utils.ts        # General utility functions (e.g., cn)
│   └── types               # TypeScript type definitions
├── public                  # Static assets (images, fonts)
├── .env                    # Environment variables (needs to be created)
├── firestore.rules         # Firestore security rules
├── next.config.ts          # Next.js configuration
└── package.json            # Project dependencies
```

## 🧠 Key Logic Explained

### Genkit Flows

The application's backend logic is handled by Genkit flows located in `src/ai/flows`.

-   **`create-booking-flow.ts`**:
    -   Receives booking details from the client (service ID, date, time, user info).
    -   Validates the input using a `zod` schema.
    -   Saves the new booking to the `bookings` collection in Firestore.
    -   Simulates sending formatted confirmation emails to both the client and the barber by logging the content to the console.

-   **`create-testimonial-flow.ts`**:
    -   Receives feedback from a client (name, quote).
    -   Validates the input using `zod`.
    -   Generates a dynamic avatar URL with the user's initial.
    -   Saves the new testimonial to the `testimonials` collection in Firestore.
```