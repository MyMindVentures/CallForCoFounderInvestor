# Requirements Specification Document

**Project:** Call for Co-Founder & Investor  
**Version:** 1.0.0  
**Date:** January 2026  
**Status:** Production  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Technical Requirements](#5-technical-requirements)
6. [Data Requirements](#6-data-requirements)
7. [User Interface Requirements](#7-user-interface-requirements)
8. [Integration Requirements](#8-integration-requirements)
9. [Security Requirements](#9-security-requirements)
10. [Testing Requirements](#10-testing-requirements)
11. [Deployment Requirements](#11-deployment-requirements)
12. [Performance Requirements](#12-performance-requirements)
13. [Maintenance & Operations](#13-maintenance--operations)

---

## 1. Executive Summary

### 1.1 Purpose
This document specifies the functional and non-functional requirements for the "Call for Co-Founder & Investor" web application—a personal portfolio and engagement platform designed to connect the project creator with potential co-founders, investors, and supporters.

### 1.2 Scope
The application serves as a multi-purpose platform combining:
- **Public-facing website** showcasing the creator's story, vision, and needs
- **Content management system** for dynamic content updates
- **Message/engagement system** for visitor interactions
- **Donation tracking system** for financial contributions
- **Media management system** for videos, images, and project showcases
- **Admin dashboard** for content curation and management

### 1.3 Target Users
- **Public Visitors**: General audience, potential partners, supporters
- **Administrators**: Content managers, site administrators

### 1.4 Key Success Criteria
- Responsive, accessible web application with modern UX
- Secure admin authentication and authorization
- Persistent data storage with backup capabilities
- High performance and SEO optimization
- Production-ready deployment on Railway platform

---

## 2. Project Overview

### 2.1 Business Context
The application is a personal branding and engagement platform designed to:
- Tell the creator's story and vision
- Solicit partnerships (co-founders, investors)
- Accept and track financial support
- Showcase projects and media content
- Manage and curate visitor messages

### 2.2 Application Architecture
- **Architecture Pattern**: Monorepo with separate frontend and backend workspaces
- **Frontend**: React SPA (Single Page Application) with client-side routing
- **Backend**: RESTful API with Express.js
- **Database**: SQLite with persistent volume support
- **Deployment**: Single-service deployment (backend serves static frontend in production)
- **Media Storage**: Cloudinary for video/image hosting

### 2.3 Technology Stack
- **Frontend**: React 18, Vite, React Router, Framer Motion, Tailwind CSS, Radix UI
- **Backend**: Node.js 20.19.0+, Express.js, SQLite (sql.js)
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **Email**: Nodemailer with SMTP
- **File Upload**: Multer with Cloudinary integration
- **Testing**: Playwright (E2E), Lighthouse CI (performance)
- **Deployment**: Railway platform

---

## 3. Functional Requirements

### 3.1 Public User Features

#### FR-1: Landing Page
- **FR-1.1**: Display main landing page with creator's story and call-to-action
- **FR-1.2**: Support multi-language content (language selector)
- **FR-1.3**: Display navigation menu with links to all public pages
- **FR-1.4**: Responsive design for mobile, tablet, and desktop viewports
- **FR-1.5**: Smooth page transitions using Framer Motion animations

#### FR-2: Content Pages
- **FR-2.1**: Display dynamic content pages:
  - Storytelling page (`/storytelling`)
  - What I Look For page (`/what-i-look-for`)
  - Developer Help page (`/developer-help`)
  - Financial Help page (`/financial-help`)
  - Support page (`/support`)
  - ADHD Aries page (`/adhd-aries`)
- **FR-2.2**: Content must be editable via admin dashboard without code deployment
- **FR-2.3**: Support rich text content with HTML formatting
- **FR-2.4**: Content must persist across page reloads

#### FR-3: Message Submission
- **FR-3.1**: Allow visitors to submit support messages via form
- **FR-3.2**: Capture required fields: name, email, message text
- **FR-3.3**: Support optional "positive message" flag
- **FR-3.4**: Display success/error feedback after submission
- **FR-3.5**: Send email notification to admin on new message (if configured)
- **FR-3.6**: Store messages in database for admin review

#### FR-4: Donation Tracking
- **FR-4.1**: Allow visitors to record donations via external payment link (Wise)
- **FR-4.2**: Capture donation details: amount, currency, donor name, donor email
- **FR-4.3**: Link donations to messages (optional)
- **FR-4.4**: Store donation records in database
- **FR-4.5**: Display donation button/link with configured Wise payment URL

#### FR-5: Media Display
- **FR-5.1**: Display uploaded videos (profile video, project videos)
- **FR-5.2**: Display uploaded images (profile picture, mindmap)
- **FR-5.3**: Support video playback with custom video player component
- **FR-5.4**: Display app projects list with name, URL, and description
- **FR-5.5**: Media must be served from Cloudinary CDN
- **FR-5.6**: Support multiple media types: `video`, `profile-picture`, `mindmap`, `projects`

#### FR-6: Public Message Display
- **FR-6.1**: Display curated public messages (admin-approved)
- **FR-6.2**: Filter messages by positive/negative sentiment
- **FR-6.3**: Display message metadata (name, date, donation amount if linked)

### 3.2 Admin Features

#### FR-7: Authentication
- **FR-7.1**: Provide admin login page (`/admin/login`)
- **FR-7.2**: Authenticate using username and password
- **FR-7.3**: Generate JWT token on successful authentication
- **FR-7.4**: Store JWT token in browser (localStorage/sessionStorage)
- **FR-7.5**: Protect admin routes with JWT authentication middleware
- **FR-7.6**: Support admin initialization endpoint (first-time setup)
- **FR-7.7**: Hash passwords using bcryptjs (minimum 10 rounds)

#### FR-8: Admin Dashboard
- **FR-8.1**: Display admin dashboard (`/admin/dashboard`) after authentication
- **FR-8.2**: Show message management interface:
  - List all submitted messages
  - Filter by published/unpublished status
  - Filter by positive/negative sentiment
  - Curate messages (publish/unpublish)
- **FR-8.3**: Show donation statistics:
  - Total donations count
  - Total donation amount
  - List of all donations with donor details
- **FR-8.4**: Show content management interface:
  - Edit content for any page
  - Preview content changes
  - Save content updates
- **FR-8.5**: Show media management interface:
  - Upload new media (videos, images)
  - Delete existing media
  - Manage app projects (add, update, delete)
  - View all media types

#### FR-9: Content Management
- **FR-9.1**: Allow admins to update page content via API
- **FR-9.2**: Support page IDs: `landing`, `storytelling`, `what-i-look-for`, `developer-help`, `financial-help`, `support`, `adhd-aries`
- **FR-9.3**: Store content updates in database
- **FR-9.4**: Track content update history (lastUpdated, updatedBy)

#### FR-10: Media Management
- **FR-10.1**: Allow admins to upload media files (max 200MB per file)
- **FR-10.2**: Support file types: video (MP4, WebM), images (JPG, PNG, WebP)
- **FR-10.3**: Upload files to Cloudinary and store metadata in database
- **FR-10.4**: Support media types: `video`, `profile-picture`, `mindmap`
- **FR-10.5**: Allow admins to delete media (removes from Cloudinary and database)
- **FR-10.6**: Manage app projects: create, update, delete project entries

### 3.3 System Features

#### FR-11: API Endpoints
- **FR-11.1**: Provide RESTful API at `/api/*` base path
- **FR-11.2**: Implement endpoints:
  - `POST /api/auth/login` - Admin login
  - `POST /api/auth/init` - Initialize admin user
  - `GET /api/messages` - Get all messages (admin)
  - `POST /api/messages` - Submit message (public)
  - `GET /api/messages/public` - Get public messages
  - `PUT /api/messages/:id/curate` - Curate message (admin)
  - `GET /api/donations` - Get all donations (admin)
  - `POST /api/donations` - Record donation (public)
  - `GET /api/content/:pageId` - Get page content
  - `PUT /api/content/:pageId` - Update page content (admin)
  - `GET /api/media/:type` - Get media by type
  - `GET /api/media/all` - Get all media
  - `POST /api/media/upload/:type` - Upload media (admin)
  - `DELETE /api/media/:type` - Delete media (admin)
  - `GET /api/media/projects` - Get app projects
  - `POST /api/media/projects` - Add app project (admin)
  - `PUT /api/media/projects` - Update app projects (admin)
  - `DELETE /api/media/projects/:id` - Delete app project (admin)
- **FR-11.3**: Return JSON responses with appropriate HTTP status codes
- **FR-11.4**: Implement error handling with descriptive error messages

#### FR-12: Health Monitoring
- **FR-12.1**: Provide health check endpoint: `GET /api/health`
- **FR-12.2**: Return service status, database connection status, memory usage
- **FR-12.3**: Return appropriate HTTP status codes (200 OK, 503 Service Unavailable)

#### FR-13: Static File Serving
- **FR-13.1**: Serve built frontend static files in production mode
- **FR-13.2**: Serve React Router routes via `index.html` fallback
- **FR-13.3**: Serve API routes separately from static files

---

## 4. Non-Functional Requirements

### 4.1 Performance

#### NFR-1: Response Time
- **NFR-1.1**: API endpoints must respond within 500ms for 95th percentile
- **NFR-1.2**: Page load time (First Contentful Paint) must be < 1.5 seconds
- **NFR-1.3**: Time to Interactive must be < 3.5 seconds
- **NFR-1.4**: Lighthouse Performance score must be ≥ 70 (warning threshold)

#### NFR-2: Scalability
- **NFR-2.1**: Support concurrent users (minimum 100 simultaneous users)
- **NFR-2.2**: Database must handle 10,000+ message records
- **NFR-2.3**: Media storage must scale via Cloudinary CDN

#### NFR-3: Resource Usage
- **NFR-3.1**: Frontend bundle size must be optimized (code splitting, tree shaking)
- **NFR-3.2**: Images must be optimized and served via CDN
- **NFR-3.3**: Database file size must be monitored (SQLite limitations)

### 4.2 Reliability

#### NFR-4: Availability
- **NFR-4.1**: Application must have 99% uptime (excluding planned maintenance)
- **NFR-4.2**: Graceful error handling (no unhandled exceptions)
- **NFR-4.3**: Database connection must be resilient (retry logic)

#### NFR-5: Data Persistence
- **NFR-5.1**: Database must persist across service restarts (persistent volume)
- **NFR-5.2**: Database must be backed up regularly (manual or automated)
- **NFR-5.3**: Media files must persist in Cloudinary (external storage)

### 4.3 Usability

#### NFR-6: User Experience
- **NFR-6.1**: Application must be responsive (mobile-first design)
- **NFR-6.2**: Support keyboard navigation and screen readers (WCAG 2.1 AA)
- **NFR-6.3**: Lighthouse Accessibility score must be ≥ 90 (error threshold)
- **NFR-6.4**: Smooth animations and transitions (60 FPS)
- **NFR-6.5**: Clear error messages and user feedback

#### NFR-7: Internationalization
- **NFR-7.1**: Support multiple languages (language selector component)
- **NFR-7.2**: Content must be language-aware

### 4.4 Maintainability

#### NFR-8: Code Quality
- **NFR-8.1**: Follow consistent code style and formatting
- **NFR-8.2**: Implement separation of concerns (controllers, services, repositories)
- **NFR-8.3**: Document complex business logic
- **NFR-8.4**: Use environment variables for configuration

#### NFR-9: Testing
- **NFR-9.1**: E2E tests must cover critical user flows
- **NFR-9.2**: No console errors in production builds
- **NFR-9.3**: Automated performance testing via Lighthouse CI

---

## 5. Technical Requirements

### 5.1 Development Environment

#### TR-1: Node.js
- **TR-1.1**: Node.js version 20.19.0 or higher (specified in `.nvmrc`)
- **TR-1.2**: npm package manager
- **TR-1.3**: Support ES modules (ESM) in backend

#### TR-2: Build Tools
- **TR-2.1**: Vite for frontend build and development server
- **TR-2.2**: Concurrently for running multiple processes
- **TR-2.3**: Production build must output to `apps/frontend/dist`

#### TR-3: Development Tools
- **TR-3.1**: Nodemon for backend hot-reload (development)
- **TR-3.2**: Source maps for debugging
- **TR-3.3**: Environment variable management (dotenv)

### 5.2 Frontend Architecture

#### TR-4: React Application
- **TR-4.1**: React 18 with functional components and hooks
- **TR-4.2**: React Router v6 for client-side routing
- **TR-4.3**: Framer Motion for animations
- **TR-4.4**: Axios for HTTP requests
- **TR-4.5**: Radix UI for accessible component primitives

#### TR-5: Styling
- **TR-5.1**: Tailwind CSS for utility-first styling
- **TR-5.2**: Design tokens in JSON format (W3C Design Tokens)
- **TR-5.3**: CSS custom properties for theming
- **TR-5.4**: Dark mode support (via design system)
- **TR-5.5**: Responsive breakpoints (mobile, tablet, desktop)

#### TR-6: State Management
- **TR-6.1**: React Context API for global state (if needed)
- **TR-6.2**: Local component state for UI state
- **TR-6.3**: Server state via API calls (no global state library required)

### 5.3 Backend Architecture

#### TR-7: Express.js Server
- **TR-7.1**: Express.js 4.x for HTTP server
- **TR-7.2**: CORS middleware for cross-origin requests
- **TR-7.3**: JSON body parser middleware
- **TR-7.4**: URL-encoded body parser middleware

#### TR-8: Architecture Pattern
- **TR-8.1**: Layered architecture:
  - Routes layer (request routing)
  - Controllers layer (request handling)
  - Services layer (business logic)
  - Repositories layer (data access)
- **TR-8.2**: Middleware for authentication, database checks, error handling

#### TR-9: Database
- **TR-9.1**: SQLite database using sql.js library
- **TR-9.2**: Database file location: `data/database.db` (configurable via `DB_PATH`)
- **TR-9.3**: Automatic database initialization on first run
- **TR-9.4**: Migration system for schema updates
- **TR-9.5**: Database indexes for performance optimization

### 5.4 Authentication & Security

#### TR-10: JWT Authentication
- **TR-10.1**: JWT tokens for admin authentication
- **TR-10.2**: Token expiration (configurable, default 24 hours)
- **TR-10.3**: Secure token storage (httpOnly cookies recommended for production)
- **TR-10.4**: Token validation middleware

#### TR-11: Password Security
- **TR-11.1**: bcryptjs for password hashing (minimum 10 rounds)
- **TR-11.2**: No plaintext password storage
- **TR-11.3**: Strong password requirements (enforced by admin)

### 5.5 File Upload

#### TR-12: Media Upload
- **TR-12.1**: Multer for file upload handling (memory storage)
- **TR-12.2**: File size limit: 200MB per file
- **TR-12.3**: Cloudinary SDK for media upload and management
- **TR-12.4**: Support video and image formats

### 5.6 Email

#### TR-13: Email Service
- **TR-13.1**: Nodemailer for SMTP email sending
- **TR-13.2**: Configurable SMTP settings (host, port, user, password)
- **TR-13.3**: Email notifications for new messages (optional)

---

## 6. Data Requirements

### 6.1 Database Schema

#### DR-1: Messages Table
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  isPositive INTEGER DEFAULT 0,
  isPublished INTEGER DEFAULT 0,
  donationAmount REAL,
  donationId INTEGER,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- **Index**: `idx_messages_published` on `(isPublished, isPositive)`

#### DR-2: Donations Table
```sql
CREATE TABLE donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  donorEmail TEXT NOT NULL,
  donorName TEXT NOT NULL,
  wiseTransactionId TEXT,
  messageId INTEGER,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- **Index**: `idx_donations_created` on `createdAt`

#### DR-3: Content Table
```sql
CREATE TABLE content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pageId TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedBy TEXT DEFAULT 'admin'
);
```
- **Index**: `idx_content_pageId` on `pageId`

#### DR-4: Admins Table
```sql
CREATE TABLE admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### DR-5: Media Table
```sql
CREATE TABLE media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT UNIQUE NOT NULL,
  cloudinaryId TEXT,
  url TEXT NOT NULL,
  publicId TEXT,
  format TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- **Index**: `idx_media_type` on `type`

#### DR-6: App Projects Table
```sql
CREATE TABLE app_projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Data Validation

#### DR-7: Input Validation
- **DR-7.1**: Validate email format for message and donation submissions
- **DR-7.2**: Validate required fields (name, email, message)
- **DR-7.3**: Sanitize user input to prevent XSS attacks
- **DR-7.4**: Validate file types and sizes for uploads
- **DR-7.5**: Validate page IDs for content updates

### 6.3 Data Persistence

#### DR-8: Database Persistence
- **DR-8.1**: Database must be stored on persistent volume in production
- **DR-8.2**: Database path configurable via `DB_PATH` environment variable
- **DR-8.3**: Automatic database backup strategy (manual or automated)

---

## 7. User Interface Requirements

### 7.1 Design System

#### UI-1: Design Tokens
- **UI-1.1**: Implement W3C Design Tokens format in JSON
- **UI-1.2**: Support color palette (primary, secondary, accent colors)
- **UI-1.3**: Support typography scale (font sizes, line heights, font families)
- **UI-1.4**: Support spacing scale (margins, paddings)
- **UI-1.5**: Support border radius, shadows, gradients
- **UI-1.6**: CSS custom properties for runtime theming

#### UI-2: Component Library
- **UI-2.1**: Use Radix UI primitives for accessible components
- **UI-2.2**: Implement consistent button styles
- **UI-2.3**: Implement form components (input, textarea, select)
- **UI-2.4**: Implement dialog/modal components
- **UI-2.5**: Implement toast notification system
- **UI-2.6**: Implement navigation menu component

#### UI-3: Responsive Design
- **UI-3.1**: Mobile-first responsive design
- **UI-3.2**: Breakpoints: mobile (< 768px), tablet (768px - 1024px), desktop (> 1024px)
- **UI-3.3**: Touch-friendly interactive elements (minimum 44x44px)
- **UI-3.4**: Readable font sizes (minimum 16px base)

### 7.2 User Experience

#### UI-4: Navigation
- **UI-4.1**: Persistent navigation menu across all pages
- **UI-4.2**: Language selector component
- **UI-4.3**: Dark mode toggle (if implemented)
- **UI-4.4**: Status bar component (if implemented)

#### UI-5: Animations
- **UI-5.1**: Page transition animations using Framer Motion
- **UI-5.2**: Smooth scroll behavior
- **UI-5.3**: Loading states for async operations
- **UI-5.4**: Hover and focus states for interactive elements

#### UI-6: Accessibility
- **UI-6.1**: WCAG 2.1 Level AA compliance
- **UI-6.2**: Semantic HTML elements
- **UI-6.3**: ARIA labels for screen readers
- **UI-6.4**: Keyboard navigation support
- **UI-6.5**: Focus indicators for keyboard users
- **UI-6.6**: Color contrast ratios (minimum 4.5:1 for text)

---

## 8. Integration Requirements

### 8.1 External Services

#### INT-1: Cloudinary Integration
- **INT-1.1**: Upload videos and images to Cloudinary
- **INT-1.2**: Store Cloudinary metadata (publicId, cloudinaryId, url, format)
- **INT-1.3**: Delete media from Cloudinary on admin deletion
- **INT-1.4**: Serve media via Cloudinary CDN URLs

#### INT-2: Email Service (SMTP)
- **INT-2.1**: Send email notifications via SMTP
- **INT-2.2**: Support Gmail SMTP (smtp.gmail.com:587)
- **INT-2.3**: Support custom SMTP servers
- **INT-2.4**: Email notifications for new messages (optional feature)

#### INT-3: Payment Integration (Wise)
- **INT-3.1**: Link to external Wise payment page
- **INT-3.2**: Track donations via manual entry (no API integration)
- **INT-3.3**: Store Wise transaction IDs (manual entry)

### 8.2 API Integration

#### INT-4: REST API
- **INT-4.1**: RESTful API design principles
- **INT-4.2**: JSON request/response format
- **INT-4.3**: Standard HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- **INT-4.4**: CORS enabled for cross-origin requests

---

## 9. Security Requirements

### 9.1 Authentication & Authorization

#### SEC-1: Admin Authentication
- **SEC-1.1**: Secure password storage (bcryptjs hashing)
- **SEC-1.2**: JWT token-based authentication
- **SEC-1.3**: Token expiration and refresh mechanism
- **SEC-1.4**: Protected admin routes (authentication middleware)
- **SEC-1.5**: Secure token storage (consider httpOnly cookies for production)

#### SEC-2: Input Validation
- **SEC-2.1**: Validate and sanitize all user inputs
- **SEC-2.2**: Prevent SQL injection (parameterized queries via sql.js)
- **SEC-2.3**: Prevent XSS attacks (input sanitization, output encoding)
- **SEC-2.4**: Validate file uploads (type, size)

### 9.2 Data Security

#### SEC-3: Sensitive Data
- **SEC-3.1**: Store sensitive configuration in environment variables
- **SEC-3.2**: Never commit secrets to version control
- **SEC-3.3**: Use strong JWT secrets (minimum 32 characters)
- **SEC-3.4**: Hash passwords with sufficient rounds (minimum 10)

#### SEC-4: API Security
- **SEC-4.1**: Rate limiting (consider implementation for production)
- **SEC-4.2**: CORS configuration (restrict origins in production)
- **SEC-4.3**: Error messages must not expose sensitive information

### 9.3 Infrastructure Security

#### SEC-5: Deployment Security
- **SEC-5.1**: HTTPS only in production
- **SEC-5.2**: Secure environment variable management
- **SEC-5.3**: Database file permissions (read/write for service only)
- **SEC-5.4**: Regular security updates for dependencies

---

## 10. Testing Requirements

### 10.1 End-to-End Testing

#### TEST-1: E2E Test Coverage
- **TEST-1.1**: Test landing page load and navigation
- **TEST-1.2**: Test message submission flow
- **TEST-1.3**: Test admin login and dashboard access
- **TEST-1.4**: Test content management functionality
- **TEST-1.5**: Test language selector functionality
- **TEST-1.6**: Test all public pages (storytelling, support, etc.)
- **TEST-1.7**: Verify no console errors on page load

#### TEST-2: Test Framework
- **TEST-2.1**: Use Playwright for E2E testing
- **TEST-2.2**: Run tests in Chromium browser
- **TEST-2.3**: Support CI/CD integration
- **TEST-2.4**: Generate HTML test reports

### 10.2 Performance Testing

#### TEST-3: Lighthouse CI
- **TEST-3.1**: Automated Lighthouse performance audits
- **TEST-3.2**: Performance score threshold: ≥ 70 (warning)
- **TEST-3.3**: Accessibility score threshold: ≥ 90 (error)
- **TEST-3.4**: Best practices score threshold: ≥ 80 (warning)
- **TEST-3.5**: SEO score threshold: ≥ 80 (warning)
- **TEST-3.6**: Run 3 Lighthouse audits per CI run

### 10.3 Manual Testing

#### TEST-4: Manual Test Scenarios
- **TEST-4.1**: Test all user flows manually before release
- **TEST-4.2**: Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- **TEST-4.3**: Test on mobile devices (iOS, Android)
- **TEST-4.4**: Test error scenarios (network failures, invalid inputs)

---

## 11. Deployment Requirements

### 11.1 Platform Requirements

#### DEPLOY-1: Railway Platform
- **DEPLOY-1.1**: Deploy to Railway cloud platform
- **DEPLOY-1.2**: Single service deployment (backend serves frontend)
- **DEPLOY-1.3**: Automatic deployments from GitHub repository
- **DEPLOY-1.4**: Environment-based configuration (production environment)

#### DEPLOY-2: Build Process
- **DEPLOY-2.1**: Build command: `npm run build`
- **DEPLOY-2.2**: Start command: `npm start --workspace=backend`
- **DEPLOY-2.3**: Node.js version: 20.19.0+ (from `.nvmrc`)
- **DEPLOY-2.4**: Frontend build output: `apps/frontend/dist`

#### DEPLOY-3: Environment Variables
- **DEPLOY-3.1**: Required variables:
  - `NODE_ENV=production`
  - `JWT_SECRET` (32+ characters)
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`
  - `WISE_PAYMENT_URL`
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - `DB_PATH` (for persistent volume: `/data/database.db`)
- **DEPLOY-3.2**: Optional variables:
  - `PORT` (Railway sets automatically)

#### DEPLOY-4: Database Persistence
- **DEPLOY-4.1**: Configure Railway persistent volume for database
- **DEPLOY-4.2**: Mount volume to `/data` directory
- **DEPLOY-4.3**: Set `DB_PATH=/data/database.db` environment variable
- **DEPLOY-4.4**: Verify database persists across restarts

### 11.2 Deployment Process

#### DEPLOY-5: CI/CD
- **DEPLOY-5.1**: Automatic deployment on git push to main branch
- **DEPLOY-5.2**: Build validation before deployment
- **DEPLOY-5.3**: Health check endpoint for deployment verification
- **DEPLOY-5.4**: Rollback capability (via Railway dashboard)

#### DEPLOY-6: Monitoring
- **DEPLOY-6.1**: Railway logs for application monitoring
- **DEPLOY-6.2**: Health check endpoint monitoring
- **DEPLOY-6.3**: Error tracking and alerting (consider implementation)

---

## 12. Performance Requirements

### 12.1 Frontend Performance

#### PERF-1: Bundle Size
- **PERF-1.1**: Optimize JavaScript bundle size (code splitting)
- **PERF-1.2**: Lazy load routes and components where possible
- **PERF-1.3**: Optimize images (compression, modern formats)
- **PERF-1.4**: Minimize CSS bundle size (purge unused styles)

#### PERF-2: Loading Performance
- **PERF-2.1**: First Contentful Paint (FCP) < 1.5s
- **PERF-2.2**: Largest Contentful Paint (LCP) < 2.5s
- **PERF-2.3**: Time to Interactive (TTI) < 3.5s
- **PERF-2.4**: Cumulative Layout Shift (CLS) < 0.1

### 12.2 Backend Performance

#### PERF-3: API Response Time
- **PERF-3.1**: API endpoints respond within 500ms (95th percentile)
- **PERF-3.2**: Database queries optimized with indexes
- **PERF-3.3**: Efficient file upload handling (streaming to Cloudinary)

#### PERF-4: Resource Usage
- **PERF-4.1**: Monitor memory usage (heap size)
- **PERF-4.2**: Monitor database file size
- **PERF-4.3**: Optimize database queries (avoid N+1 queries)

---

## 13. Maintenance & Operations

### 13.1 Monitoring

#### OPS-1: Health Monitoring
- **OPS-1.1**: Health check endpoint: `GET /api/health`
- **OPS-1.2**: Monitor database connection status
- **OPS-1.3**: Monitor memory usage
- **OPS-1.4**: Log application errors

#### OPS-2: Logging
- **OPS-2.1**: Structured logging for errors
- **OPS-2.2**: Log API requests (consider implementation)
- **OPS-2.3**: Railway logs for centralized logging

### 13.2 Backup & Recovery

#### OPS-3: Database Backup
- **OPS-3.1**: Regular database backups (manual or automated)
- **OPS-3.2**: Backup strategy for SQLite file
- **OPS-3.3**: Recovery procedure documentation

#### OPS-4: Media Backup
- **OPS-4.1**: Media stored in Cloudinary (external backup)
- **OPS-4.2**: Database metadata backup (media records)

### 13.3 Updates & Maintenance

#### OPS-5: Dependency Updates
- **OPS-5.1**: Regular security updates for dependencies
- **OPS-5.2**: Node.js version updates (follow LTS)
- **OPS-5.3**: Test updates before deployment

#### OPS-6: Content Updates
- **OPS-6.1**: Content updates via admin dashboard (no code deployment)
- **OPS-6.2**: Media updates via admin dashboard
- **OPS-6.3**: Version control for content changes (consider implementation)

---

## Appendix A: Glossary

- **SPA**: Single Page Application
- **JWT**: JSON Web Token
- **CDN**: Content Delivery Network
- **CORS**: Cross-Origin Resource Sharing
- **XSS**: Cross-Site Scripting
- **SQL Injection**: Code injection attack targeting SQL databases
- **WCAG**: Web Content Accessibility Guidelines
- **FCP**: First Contentful Paint
- **LCP**: Largest Contentful Paint
- **TTI**: Time to Interactive
- **CLS**: Cumulative Layout Shift

## Appendix B: References

- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Railway Documentation](https://docs.railway.app)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Documentation](https://playwright.dev)

## Appendix C: Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | January 2026 | Initial requirements specification | System Analysis |

---

**Document Status**: ✅ Approved for Implementation  
**Last Updated**: January 2026  
**Next Review**: As needed for feature additions or changes
