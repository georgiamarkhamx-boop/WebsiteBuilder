# Security Enhance - Interactive Cybersecurity Training Platform

## Overview

Security Enhance is a comprehensive cybersecurity training platform designed to bridge the human gap in security through engaging, interactive learning experiences. The platform offers role-based training modules, tabletop exercises, compliance assessments, and certification programs to help organizations reduce security incidents caused by human error.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system using pastel colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful API with JSON responses
- **Session Management**: Express sessions with PostgreSQL session store
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Validation**: Zod for runtime type checking

### Key Components

1. **Training Modules System**
   - Interactive learning content with gamification
   - Role-based training paths (General, Technical, Leadership, Compliance)
   - Multimedia content support (videos, quizzes, simulations)
   - Progress tracking and completion certificates

2. **Assessment Engine**
   - Security maturity assessments
   - Interactive quizzes and scenario-based evaluations
   - Real-time feedback and scoring
   - Customizable assessment criteria

3. **Tabletop Exercise (TTX) Platform**
   - Scenario-based training simulations
   - Decision-making exercises with consequences
   - Cross-functional collaboration scenarios
   - Performance analytics and debriefing

4. **Dashboard & Analytics**
   - Employee progress tracking
   - Organizational security maturity scoring
   - Department-level completion rates
   - Compliance reporting and documentation

5. **Certification System**
   - Automated certificate generation
   - Digital verification with QR codes
   - LinkedIn integration capabilities
   - Compliance documentation support

## Data Flow

1. **User Registration/Authentication**
   - User creates account with company information
   - Profile includes role-based access permissions
   - Session management for persistent login

2. **Course Enrollment & Progress**
   - Users browse and enroll in relevant courses
   - Progress tracked in real-time with database updates
   - Completion triggers certificate generation

3. **Assessment Workflow**
   - Users complete interactive assessments
   - Answers processed and scored server-side
   - Results stored for analytics and reporting

4. **Dashboard Updates**
   - Real-time aggregation of user progress
   - Department-level statistics calculation
   - Maturity scoring based on completion rates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Database ORM with TypeScript support
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: UI component primitives
- **zod**: Schema validation and type safety
- **wouter**: Lightweight routing

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first styling
- **drizzle-kit**: Database migration and schema management

### Database Schema
- **users**: User accounts and company information
- **courses**: Training module definitions and content (seeded with 13 courses)
- **enrollments**: User course progress and completion
- **assessments**: Quiz results and maturity scores
- **certificates**: Generated certificates and verification

### Database Implementation
- PostgreSQL database with Neon serverless hosting
- Drizzle ORM for TypeScript-first database operations
- Database seeded with comprehensive course catalog
- Real-time data persistence for all user interactions

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- TypeScript compilation and type checking
- Tailwind CSS with live reload
- In-memory storage fallback for development

### Production Build
- Vite builds optimized client bundle to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Static file serving for production deployment
- Database migrations applied via `drizzle-kit push`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- Session configuration for authentication
- CORS and security headers for production

### Key Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: ARIA compliance through Radix UI components
- **Performance**: Optimized bundle sizes and lazy loading
- **Security**: Input validation, session management, and SQL injection prevention
- **Scalability**: Serverless database with connection pooling
- **Monitoring**: Request logging and error tracking

The platform is designed to be easily deployable on modern hosting platforms with minimal configuration requirements, focusing on developer experience and maintainability while providing a robust foundation for cybersecurity training at scale.