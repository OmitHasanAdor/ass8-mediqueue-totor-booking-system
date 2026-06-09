# MediQueue – Tutor Booking & Management System

### MediQueue is a modern, highly user-friendly, and fully responsive web application designed for booking medical tutors and managing study sessions. The platform provides a smooth shopping-style experience for students looking for the right guidance, combined with an advanced dark/light mode UI and secure authentication.

---

## Technologies Used

* **Frontend Framework:** React.js & Next.js (App Router)
* **Authentication:** Better Auth (with JWT & JWKS Security)
* **Styling & UI Components:** Tailwind CSS (v4), HeroUI (formerly NextUI), and DaisyUI
* **State & Data Fetching:** React Hooks (`useState`, `useEffect`), Native Fetch API
* **Notifications:** React Hot Toast (NPM Package)
* **Icons:** React Icons
* **Database Integration:** MongoDB (via Express.js REST API backend)
* **Deployment:** Vercel

---

## Features 

1. **Secure Authentication:** Robust user login and signup system powered by Better Auth.
2. **JWT & JWKS Token Verification:** Advanced security architecture utilizing JSON Web Key Sets (JWKS) to verify tokens on the backend without exposing secrets.
3. **Dynamic Theme Toggle:** Complete Dark and Light mode support across all components using `next-themes`, synced seamlessly between HeroUI and DaisyUI.
4. **Smart Filters & Date Pickers:** Interactive tutor search filtering by name and specific start/end dates.
5. **Dynamic Routing & Details:** Dynamic server-side routing for individual tutor profiles with built-in `error.jsx` and `not-found.jsx` boundary handling for invalid IDs.
6. **Tutor Management Dashboard:** Dedicated sections for users to view "My Booked Sessions" (with authorization control to cancel sessions) and "My Tutors Table" to track registrations.
7. **Fully Responsive UI:** A beautifully optimized layout using Tailwind CSS that adapts perfectly to mobile, tablet, and desktop screens.



