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
  - [🗄 Database Setup](#-database-setup)
  - [🔑 Authentication Configuration](#-authentication-configuration)
  - [📖 Usage](#-usage)
  - [📁 Project Structure](#-project-structure)
  - [🔄 Data Flow \& State Management](#-data-flow--state-management)
    - [React Query Architecture](#react-query-architecture)
    - [Example: Creating a Blog](#example-creating-a-blog)
  - [🔐 Security Features](#-security-features)
  - [🚀 Build \& Deployment](#-build--deployment)
    - [Development Build](#development-build)
    - [Production Build](#production-build)
    - [Preview Production Build](#preview-production-build)
  - [🤝 Contributing](#-contributing)
  - [📝 Code Style \& Conventions](#-code-style--conventions)
  - [🐛 Common Issues \& Solutions](#-common-issues--solutions)
    - [Issue: Clerk Authentication Not Working](#issue-clerk-authentication-not-working)
    - [Issue: Database Queries Return Empty](#issue-database-queries-return-empty)
    - [Issue: Image Upload Fails](#issue-image-upload-fails)
  - [📚 Resources](#-resources)
  - [� Acknowledgments](#-acknowledgments)
  - [�📄 License](#-license)
  - [👤 Author](#-author)

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

   ```bash
   git clone https://github.com/damianroiz/atrium-blog-dashboard.git
   cd atrium-blog-dashboard
   ```

2. **Install Dependancies**
   `npm install`

3. **Install Dependancies**
   Create a `.env` file in the root directory (see Environment Variables section)

4. **Configure Supabase**

- Create a new Supabase project
- Run the database schema (see Database Setup section)
- Configure RLS policies

5. **Configure Clerk**

- Create a new Clerk application
- Set up Supabase integration
- Configure JWT template (see Authentication Configuration)

6. **Start the development server**
   ` npm run dev`
   The Application will be available at http://localhost:3000

## 🔐 Environment Variables

Crate a `.env` file in the root directoty with the following variables

```# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key

# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Where to Find These Values:

| Variable                     | Location                                                                 |
| ---------------------------- | ------------------------------------------------------------------------ |
| `VITE_SUPABASE_URL`          | Supabase Dashboard → Settings → API → Project URL                        |
| `VITE_SUPABASE_KEY`          | Supabase Dashboard → Settings → API → Project API keys → `anon` `public` |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys → Publishable key                             |

## 🗄 Database Setup

1. Create Tables in Supabase
   Run the following SQL in your Supabase SQL Editor:

```
-- Create author table
CREATE TABLE author (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create blogs table
CREATE TABLE blogs (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  title TEXT NOT NULL,
  author BIGINT REFERENCES author(id) ON DELETE CASCADE,
  content TEXT,
  image TEXT,
  categories TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived'))
);

-- Create indexes for better performance
CREATE INDEX idx_blogs_author ON blogs(author);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_author_user_id ON author(user_id);
```

2. Enable Row Level Security (RLS)

```
-- Enable RLS on both tables
ALTER TABLE author ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Author table policies
CREATE POLICY "author_select_authenticated" ON author
FOR SELECT TO authenticated USING (true);

CREATE POLICY "author_insert_authenticated" ON author
FOR INSERT TO authenticated WITH CHECK (true);

-- Blogs table policies
CREATE POLICY "blogs_select_authenticated" ON blogs
FOR SELECT TO authenticated USING (true);

CREATE POLICY "blogs_insert_authenticated" ON blogs
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "blogs_update_authenticated" ON blogs
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "blogs_delete_authenticated" ON blogs
FOR DELETE TO authenticated USING (true);
```

**Note:** Due to Supabase free tier limitations, complex ownership validation using JWT claims is not available. Ownership validation is enforced at the application level.

## 🔑 Authentication Configuration

Setting up Clerk + Supabase Integration

1. In Clerk Dashboard:
   - Go to JWT Templates
   - Create a new template named supabase
   - Add the following claims:

```
{
  "iss": "https://your-clerk-domain.clerk.accounts.dev",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "role": "authenticated"
}
```

- Save the template

2. Application Integration:
   The application uses a custom Supabase client that includes the Clerk token:

```
// src/services/supabase.js
export function createClerkSupabaseClient(getToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: async () => {
        const token = await getToken({ template: 'supabase' });
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    },
  });
}
```

## 📖 Usage

For authors

**Creating a New Blog Post**

1. Log in with your Clerk credentials
2. Navigate to the **Blogs** page
3. Click **"Add New Blog"** button
4. Fill in the form:
   - Title (required)
   - Content (rich text editor)
   - Category (tags)
   - Cover image (upload or URL)
5. Choose to save as **Draft** or **Publish** immediately

**Editing a Blog Post**

1. Click on a blog from your list
2. Click the **"Quick Edit"** option in the menu
3. Make your changes
4. Save

**Managing Blog Status**

- **Draft** → Work in progress, only visible to you
- **Published** → Live and visible to all users
- **Archived** → Hidden from public view, can be restored

**Deleting a Blog**

Only **your own blogs** can be deleted
Click the **Delete** button
Confirm the action in the modal
Non-owners will see an error toast if they attempt to delete

For Readers

- Browse all published blogs
- View blog details
- Filter by category or status
- See author information

## 📁 Project Structure

```
atrium-dashboard/
├── public/                      # Static assets
├── src/
│   ├── features/                # Feature-based modules
│   │   ├── authentication/      # Auth components and hooks
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   ├── UpdatePasswordForm.jsx
│   │   │   ├── UpdateUserDataForm.jsx
│   │   │   ├── UserAvatar.jsx
│   │   │   ├── useLogin.js
│   │   │   ├── useLogOut.js
│   │   │   ├── useRegister.js
│   │   │   ├── useUpdateUser.js
│   │   │   └── useUser.js
│   │   └── blogs/               # Blog components and hooks
│   │       ├── Account.jsx
│   │       ├── AddBlog.jsx
│   │       ├── BlogContent.jsx
│   │       ├── BlogRow.jsx
│   │       ├── BlogTable.jsx
│   │       ├── BlogTableOps.jsx
│   │       ├── BlogView.jsx
│   │       ├── CreateBlogForm.jsx
│   │       ├── useBlog.js
│   │       ├── useBlogs.js
│   │       ├── useConfirmAuthorId.js
│   │       ├── useCreateBlog.js
│   │       ├── useDeleteBlog.js
│   │       ├── useEditBlog.js
│   │       └── useUpdateBlogStatus.js
│   ├── hooks/                   # Custom React hooks
│   │   ├── useMoveBack.js
│   │   ├── useOutsideClick.js
│   │   └── useSupabase.js
│   ├── pages/                   # Page components
│   │   ├── Account.jsx
│   │   ├── Blog.jsx
│   │   ├── Blogs.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── PageNotFound.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   └── Users.jsx
│   ├── services/                # API services
│   │   ├── apiAuth.js           # Clerk & user management
│   │   ├── apiBlogs.js          # Blog CRUD operations
│   │   └── supabase.js          # Supabase client setup
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── ButtonText.jsx
│   │   ├── ConfirmDelete.jsx
│   │   ├── Empty.jsx
│   │   ├── FileInput.jsx
│   │   ├── Filter.jsx
│   │   ├── Form.jsx
│   │   ├── FormRow.jsx
│   │   ├── Header.jsx
│   │   ├── HeaderMenu.jsx
│   │   ├── Heading.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Logo.jsx
│   │   ├── Menus.jsx
│   │   ├── Modal.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Row.jsx
│   │   ├── Select.jsx
│   │   ├── SideBar.jsx
│   │   ├── SideNav.jsx
│   │   ├── SortBy.jsx
│   │   ├── Spinner.jsx
│   │   ├── SpinnerMini.jsx
│   │   ├── StatusTag.jsx
│   │   ├── Table.jsx
│   │   ├── TableOps.jsx
│   │   └── TextArea.jsx
│   ├── utils/                   # Utility functions
│   │   └── constants.js
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # Entry point
│   └── styles.css               # Global styles
├── .github/
│   └── copilot-instructions.md  # AI assistant guidelines
├── .env                         # Environment variables (local)
├── .env.example                 # Environment template
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🔄 Data Flow & State Management

### React Query Architecture

This project uses **React Query (TanStack Query)** for server state management:

```
User Action → Custom Hook (e.g., useBlogs)
  → React Query Mutation/Query
    → API Service (apiBlogs.js)
      → Supabase Client
        → Database Response
```

### Example: Creating a Blog

```javascript
// 1. Component calls mutation
const { createBlog } = useCreateBlog();
createBlog(
  { title, content, image },
  {
    onSuccess: () => navigate('/blogs'),
  },
);

// 2. Hook uses useMutation
const { mutate: createBlog } = useMutation({
  mutationFn: (data) => createBlogAPI(data),
  onSuccess: () => queryClient.invalidateQueries(['blogs']),
});

// 3. API layer calls Supabase
export async function createBlogAPI(data) {
  const { data: blog, error } = await supabase
    .from('blogs')
    .insert([data])
    .select();

  if (error) throw error;
  return blog;
}
```

## 🔐 Security Features

- **Authentication**: Clerk handles all authentication with JWT tokens
- **Authorization**: Row Level Security (RLS) in Supabase database
- **Ownership Verification**: Application-level checks ensure users can only modify their own blogs
- **Protected Routes**: ProtectedRoute component guards authenticated pages
- **HTTPS**: All API communication is encrypted
- **CORS**: Configured to accept requests from trusted domains only

## 🚀 Build & Deployment

### Development Build

```bash
npm run dev
```

Starts Vite dev server at http://localhost:3000

### Production Build

```bash
npm run build
```

Creates optimized production bundle in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 Code Style & Conventions

- **Component Naming**: PascalCase (e.g., `BlogTable.jsx`)
- **Hook Naming**: camelCase with `use` prefix (e.g., `useBlogs.js`)
- **Styling**: Styled Components for component-scoped styles
- **Imports**: Feature-based organization in `src/features/`
- **Comments**: Use TODO, FIXME, BUG, IMPROVE, LEARN, DONE tags for code notes

## 🐛 Common Issues & Solutions

### Issue: Clerk Authentication Not Working

**Symptoms**: "Clerk not loaded" error or failed login

**Solutions**:

- Verify `VITE_CLERK_PUBLISHABLE_KEY` is correct in `.env`
- Check Clerk Dashboard for proper configuration
- Ensure JWT template is created for Supabase integration

### Issue: Database Queries Return Empty

**Symptoms**: No data appears in tables

**Solutions**:

- Check RLS policies are enabled on database tables
- Verify Clerk JWT token includes required claims
- Confirm user has proper permissions in Clerk dashboard

### Issue: Image Upload Fails

**Symptoms**: Error when uploading blog images

**Solutions**:

- Check Supabase storage bucket permissions
- Verify file size is under limits
- Ensure CORS is configured in Supabase

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Styled Components](https://styled-components.com)

## � Acknowledgments

This project was developed while following **[The Ultimate React Course 2025: React, Next.js, Redux & More](https://www.udemy.com/course/the-ultimate-react-course/)** by **Jonas Schmedtmann**.

Special thanks to Jonas for creating such a comprehensive and high-quality course that covers advanced React concepts, best practices, and modern development patterns. His teaching approach and practical examples have been instrumental in understanding complex React patterns like:

- Custom hooks and React patterns
- State management with React Query
- Authentication flows and JWT integration
- Building scalable component architectures
- Performance optimization techniques

His course provided the foundation and knowledge that made this project possible.

## �📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Damián Ruiz** - [GitHub](https://github.com/damianroiz)

---

**Last Updated**: January 2026

For questions or support, please reach out to the development team or open an issue on GitHub.
