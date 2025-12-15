# Atrium Blog Dashboard

A modern, full-featured blog management dashboard built with React and Vite. This application enables authors to create, edit, and manage blog posts with secure authentication and role-based access control.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)

## 📋 Table of Contents

- [Atrium Blog Dashboard](#atrium-blog-dashboard)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
    - [Frontend](#frontend)
    - [Backend \& Services](#backend--services)
    - [Authentication Architecture](#authentication-architecture)
  - [📦 Prerequisites](#-prerequisites)
  - [🚀 Installation](#-installation)
  - [🔐 Environment Variables](#-environment-variables)

## ✨ Features

- 🔐 **Secure Authentication** - Powered by Clerk with JWT integration
- ✍️ **Blog Management** - Create, edit, and manage blog posts with rich text support
- 👤 **Author Protection** - Users can only delete their own blogs with confirmation modal
- 📊 **Status Management** - Draft, Published, and Archived workflow
- 👀 **Multi-Author Platform** - View blogs from all authors
- 🎨 **Modern UI** - Built with Styled Components for responsive design
- ⚡ **Real-time Updates** - React Query for efficient data fetching and caching
- 🔔 **Toast Notifications** - User-friendly feedback with React Hot Toast
- 🖼️ **Image Upload** - Support for blog cover images
- 🏷️ **Categories** - Organize blogs with categories
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Modern UI library with hooks
- **Vite** - Next-generation frontend build tool
- **React Router DOM** - Client-side routing and navigation
- **Styled Components** - CSS-in-JS for component styling
- **React Query (TanStack Query)** - Server state management and caching
- **React Hot Toast** - Beautiful toast notifications
- **React Icons** - Icon library
- **React Hook Form** - Form validation and management
- **React Quill** - Rich text editor for blog content
- **date-fns** - Date formatting and manipulation

### Backend & Services

- **Supabase** - PostgreSQL database with real-time capabilities
- **Clerk** - Authentication and user management platform

### Authentication Architecture

- Clerk handles user authentication and session management
- Custom integration connects Clerk JWT tokens to Supabase
- Row Level Security (RLS) policies enforce database-level access control
- Application-level ownership verification for sensitive operations (delete/edit)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

You'll also need accounts for:

- **Supabase** - [Sign up here](https://supabase.com)
- **Clerk** - [Sign up here](https://clerk.com)

## 🚀 Installation

1. **Clone the repository**

   ````bash
   git clone https://github.com/damianroiz/atrium-blog-dashboard.git
   cd atrium-blog-dashboard```

   ````

2. **Install Depnedancies**
   `npm install`

3. **Install Depnedancies**
   Create a `.env` file in the root directory (see Environment Variables section)

4. Configure Supabase

- Create a new Supabase project
- Run the database schema (see Database Setup section)
- Configure RLS policies

5. Configure Clerk

- Create a new Clerk application
- Set up Supabase integration
- Configure JWT template (see Authentication Configuration)

6. Start the development server
   ` npm run dev`
   The Application will be available at http://localhost:3000

## 🔐 Environment Variables

Crate a `.env` file in the root directoty with the following variables

````# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key

# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
````
