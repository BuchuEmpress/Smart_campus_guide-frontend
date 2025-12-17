# Smart Campus Guide - Frontend

## Overview
Smart Campus Guide is a comprehensive React-based web application designed to assist university students and staff in navigating campus life. It serves as a central hub for campus navigation, academic project assistance, and general inquiries via an intelligent chatbot interface named "Simi".

The application features a modern, dark-themed UI built with Tailwind CSS, emphasizing aesthetics and user experience with smooth animations and intuitive navigation.

## Features

### 🤖 Intelligent Chatbot (Simi)
-   Serves as the central navigation hub.
-   Answers general queries and directs users to specific tools.
-   Provides a conversational interface for quick assistance.

### 🎓 Project Assistant
-   Specialized guidance for specific departments:
    -   **Software Engineering**
    -   **Computer Networking and System Maintenance**
    -   **Data Science**
-   **Chat Assistant**: Specific AI assistance for the selected field.
-   **Allocations**: View and search for student project allocations.
-   **Defense Archive**: Browse past thesis defense topics and archives.

### 🗺️ Campus Navigation
-   Interactive list of key campus locations (Lecture Halls, Libraries, Labs, Offices).
-   Visual map representation (placeholder for future implementation).
-   Search functionality to quickly find specific rooms or buildings.

### 📊 Admin Dashboard
-   Overview of system statistics (Active Students, Chat Queries, etc.).
-   Recent activity logs.
-   Quick actions for administrative tasks.

### 🔐 Authentication
-   Secure Login and Sign Up pages.
-   User role management (Student/Admin).

## Tech Stack
-   **Core Framework**: [React](https://reactjs.org/) (JavaScript)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom UI components, Dark Mode)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Build Tool**: [Vite](https://vitejs.dev/) (implied based on standard modern React setups)

## Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/smart-campus-guide-frontend.git
    cd smart-campus-guide-frontend
    ```

2.  **Install dependencies**
    Make sure you have Node.js installed.
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
     The app typically runs at `http://localhost:5173`.

4.  **Build for production**
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── assets/          # Static assets (images, svgs)
├── components/      # Reusable UI components
│   ├── Sidebar.jsx  # Main navigation sidebar
│   ├── Navbar.jsx   # (Legacy/Optional) Top navigation bar
│   └── ...
├── pages/           # Application views/pages
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── WelcomeSimi.jsx
│   ├── Chatbot.jsx
│   ├── ProjectAssistant.jsx
│   ├── Navigation.jsx
│   └── AdminDashboard.jsx
├── utils/           # Helper functions
├── App.jsx          # Main application component & Routing
├── index.css        # Global styles & Tailwind directives
└── main.jsx         # Entry point
```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any feature updates or bug fixes.

## License
[MIT](LICENSE)
