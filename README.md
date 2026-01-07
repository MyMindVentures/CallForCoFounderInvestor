# Call for Investor/CoFounder Mobile Web App

A mobile-first web application for connecting with investors and co-founders, featuring content management, donation integration, and support messaging.

## Features

- **Landing Page** with navigation to all sections
- **Storytelling Page** - Dynamic content management
- **What I Look For** - Information for investors and co-founders
- **Developer Help** - Instant help requests for IDEs, n8n, and Vibe Coding
- **Financial Help** - Wise donation integration
- **Support Page** - Public display of curated positive messages with donation amounts
- **ADHD + Aries Page** - Explains the importance of ADHD combined with Aries strengths
- **Admin Dashboard** - Content management, message curation, and donation overview

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: SQLite (file-based, no server needed)
- **Authentication**: JWT-based admin authentication
- **Email**: Nodemailer for thank you emails
- **Payment**: Wise payment redirect integration

## Prerequisites

- Node.js (v16 or higher)
- **SQLite** (included automatically - no installation needed!) ⭐
- npm or yarn

**Note**: This project uses SQLite, a file-based database. No database server installation or account creation required!

## Quick Start

**Fastest way to get started (no database installation needed!):**

1. **Setup project**:
   ```bash
   # Install dependencies
   npm run install:all
   
   # Create backend .env file
   cd apps/backend
   cp env.example .env
   ```

2. **Configure `.env` file** (optional - defaults work fine):
   ```env
   PORT=3000
   JWT_SECRET=your-secret-key-here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

That's it! Your app will be running at `http://localhost:5173`

**Note**: SQLite database file will be automatically created in the `data/` directory. No database server needed!

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd CallForCoFounderInvestor
```

### 2. Install All Dependencies

Install all dependencies (workspaces will be installed automatically):

```bash
npm install
```

This will install dependencies for:
- Root workspace (concurrently for running both servers)
- Backend workspace (`apps/backend`)
- Frontend workspace (`apps/frontend`)

### 4. Environment Setup

Create a `.env` file in the `apps/backend` directory:

```bash
cd apps/backend
cp env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/callforcofounder
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Email configuration (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# Wise payment link
WISE_PAYMENT_URL=https://wise.com/pay/your-link
```

**Note**: For Gmail, you'll need to generate an App Password:
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password for "Mail"

### 5. Create Frontend Environment File (Optional)

Create a `.env` file in the `frontend` directory if you want to customize the Wise payment URL:

```env
REACT_APP_WISE_PAYMENT_URL=https://wise.com/pay/your-link
```

## Running the Application

### MongoDB Setup (Choose One Option)

You need MongoDB to store data. Choose the option that works best for you:

#### Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

**Best for**: Quick setup, no local installation needed, free tier available

1. **Sign up** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. **Create a free cluster** (M0 Sandbox)
3. **Create a database user**:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
4. **Whitelist your IP**:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
5. **Get your connection string**:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `callforcofounder` (or your preferred name)
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/callforcofounder?retryWrites=true&w=majority`
6. **Update your `.env` file**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/callforcofounder?retryWrites=true&w=majority
   ```

#### Option 2: Docker MongoDB

**Best for**: Local development with isolated environment

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Your .env file should have:
# MONGODB_URI=mongodb://localhost:27017/callforcofounder
```

#### Option 3: Local MongoDB Installation

**Best for**: Full local control

**Windows:**
1. Download MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Start MongoDB:
   ```bash
   mongod
   ```

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Note**: The server will start even if MongoDB is not connected, but database operations will fail. You'll see a warning message in the console with instructions.

### Start Both Frontend and Backend Together

From the root directory, run:

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

This will start both servers simultaneously:
- **Backend** will run on `http://localhost:3000`
- **Frontend** will run on `http://localhost:5173`

**If you see database errors:**
- Check that the `data/` directory exists and is writable
- Verify file permissions for the database file
- Check disk space availability
- The database file is created automatically on first run

**If you see "Port already in use" errors:**

The port 3000 (backend) or 5173 (frontend) might be occupied by another process. To fix this:

**Quick fix - Kill the port:**
```bash
# Kill port 3000 (backend)
npm run kill-port:3000

# Kill port 5173 (frontend)
npm run kill-port:5173

# Or kill any port
npm run kill-port <port-number>
```

**Manual fix:**

**Windows:**
```bash
# Find the process using the port
netstat -ano | findstr :3000

# Kill the process (replace <PID> with the actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

Then restart the servers with `npm run dev`

### Start Servers Individually (Optional)

If you prefer to run them separately:

**Backend only:**
```bash
npm run dev --workspace=backend
# or
npm start --workspace=backend
```
npm run dev
**Frontend only:**
```bash
npm run dev --workspace=frontend
```

## Architecture

This project follows a **layered architecture** pattern:

### Backend Architecture

- **Controllers** (`apps/backend/controllers/`) - Thin HTTP request handlers
- **Services** (`apps/backend/services/`) - Business logic layer
- **Repositories** (`apps/backend/repositories/`) - Data access layer (SQLite)
- **Routes** (`apps/backend/routes/`) - API route definitions
- **Middleware** (`apps/backend/middleware/`) - Authentication, validation
- **Config** (`apps/backend/config/`) - Database and app configuration

### Frontend Architecture

- **Pages** (`apps/frontend/src/pages/`) - Route-level components
- **Components** (`apps/frontend/src/components/`) - Reusable UI components
- **Utils** (`apps/frontend/src/utils/`) - Helper functions and API client

This separation ensures:
- ✅ Clear separation of concerns
- ✅ Easy testing and maintenance
- ✅ Scalable codebase
- ✅ Business logic separated from data access

## Usage

### Public Pages

1. Navigate to `http://localhost:5173` in your browser
2. Browse through the different pages using the navigation menu
3. Submit support messages on the Support page
4. Make donations via the Financial Help page

### Admin Access

1. Navigate to `http://localhost:5173/admin/login`
2. Login with your admin credentials (default: admin/admin123)
3. Access the dashboard to:
   - Edit content for all pages
   - Curate messages (mark as positive/negative and publish)
   - View donation statistics

### Admin Features

#### Content Management
- Select any page from the dropdown
- Edit HTML content in the textarea
- Preview changes before saving
- Changes are immediately visible on public pages

#### Message Curation
- View all submitted messages
- Mark messages as "Positive" or "Negative"
- Publish selected messages to appear on the public Support page
- Messages with donations are automatically linked

#### Donation Overview
- View total donations, count, and average
- See detailed list of all donations
- Track donor information

## Project Structure

```
CallForCoFounderInvestor/
├── apps/                       # Deployable applications
│   ├── frontend/               # React + Vite frontend
│   │   ├── src/
│   │   │   ├── pages/         # Page components
│   │   │   ├── components/    # Reusable components
│   │   │   ├── utils/         # Utility functions
│   │   │   ├── App.jsx        # Main app component
│   │   │   └── main.jsx       # Entry point
│   │   ├── package.json
│   │   └── vite.config.js
│   └── backend/                # Express.js backend
│       ├── controllers/        # Request handlers (thin layer)
│       ├── services/           # Business logic layer
│       ├── repositories/       # Data access layer
│       ├── routes/             # API route definitions
│       ├── middleware/         # Express middleware
│       ├── config/            # Configuration (database, etc.)
│       ├── utils/             # Utility functions (email, etc.)
│       ├── models/            # Legacy models (can be removed)
│       ├── server.js          # Server entry point
│       └── package.json
├── packages/                   # Shared packages (future)
├── data/                      # SQLite database files
├── scripts/                   # Utility scripts
├── package.json               # Root workspace config
└── README.md
```

## API Endpoints

### Public Endpoints
- `GET /api/content/:pageId` - Get page content
- `POST /api/messages` - Submit support message
- `GET /api/messages/public` - Get published positive messages
- `POST /api/donations` - Record donation

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `PUT /api/content/:pageId` - Update page content
- `GET /api/messages` - Get all messages
- `PUT /api/messages/:id/curate` - Curate message
- `GET /api/donations` - Get donation stats

## Email Configuration

The app sends thank you emails automatically when messages are submitted. Configure your SMTP settings in the `.env` file.

## Wise Payment Integration

The donation system redirects users to Wise payment. Update the `WISE_PAYMENT_URL` in your environment variables with your actual Wise payment link.

## Development

### Backend Development
- Uses ES modules (type: "module")
- Auto-reload with `npm run dev` (Node.js watch mode)
- MongoDB connection with Mongoose

### Frontend Development
- Vite for fast development
- React Router for navigation
- Axios for API calls
- Mobile-first responsive design

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env`
- Verify MongoDB is accessible on the specified port

### Email Not Sending
- Verify SMTP credentials in `.env`
- For Gmail, ensure App Password is used (not regular password)
- Check firewall settings

### CORS Issues
- Backend CORS is configured to allow frontend origin
- Ensure frontend proxy is configured in `vite.config.js`

### Admin Login Issues
- Default credentials: admin/admin123
- Admin user is auto-created on first login
- Check JWT_SECRET is set in `.env`

## Security Notes

- Change default admin credentials in production
- Use a strong JWT_SECRET
- Secure MongoDB connection in production
- Use environment variables for sensitive data
- Enable HTTPS in production

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the project maintainer.
Made with love by MyMindVentures.io
