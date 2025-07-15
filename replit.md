# Security Enhance - Interactive Cybersecurity Training Platform

## Overview

Security Enhance is an advanced, AI-driven training platform that has evolved beyond traditional cybersecurity to become a comprehensive business technology education platform. It features cybersecurity training, AI for business growth, tech for founders, and other business technology topics. The platform revolutionizes education through gamified learning, adaptive content, and intelligent analytics, featuring highly interactive modules, AI-driven tabletop exercises (TTX), predictive risk analytics, customizable learning paths, emerging technology coverage, and a centralized dashboard integrating e-learning, assessments, and threat monitoring.

**Latest Enhancement (July 2025)**: All AI & Business and Tech for Founders courses now include immersive 3D interactive labs with virtual command centers, tech stack builders, and hands-on simulation environments.

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

1. **Advanced Interactive Learning System**
   - Gamified learning with XP points, achievements, and leaderboards
   - Adaptive content that adjusts dynamically based on user skill assessments
   - Emerging technology modules (blockchain security, IoT threats, quantum-safe encryption)
   - Customizable learning paths with AI-driven personalization
   - Recognition and accreditation with industry-standard certifications

2. **AI-Driven Tabletop Exercise (TTX) Platform**
   - Real-time scenario adaptation based on participant responses
   - Hybrid training model combining digital scenarios with expert facilitation
   - Cross-functional collaboration exercises for IT, legal, HR, and PR teams
   - Comprehensive post-event analytics identifying competencies and gaps
   - AI-powered insights and recommendations for improvement

3. **Next-Level Security Maturity & Compliance Assessment**
   - Automated continuous assessment with real-time monitoring
   - Predictive risk analytics to identify vulnerabilities before they manifest
   - Customized industry solutions for healthcare, finance, government, and manufacturing
   - AI-generated personalized roadmaps prioritized by ROI and risk
   - Virtual Chief Information Security Officer (vCISO) subscription services

4. **Centralized Command Center Dashboard**
   - Integrated platform combining e-learning, TTX, assessments, and analytics
   - Real-time threat monitoring with automated response capabilities
   - Live security metrics and performance tracking
   - AI-driven insights and recommendations
   - Cross-platform data visualization and reporting

5. **Enhanced Course Catalog**
   - 35+ comprehensive courses addressing market gaps
   - Board-level cybersecurity leadership training
   - Zero-to-one security maturity building for organizations
   - Sector-specific training for healthcare, education, and non-profits
   - Advanced interactive content with crisis simulations and decision trees
   - AI & Business Growth courses covering AI tools, ChatGPT, marketing automation, and ML
   - Tech for Founders courses including tech stacks, no-code solutions, analytics, and team scaling
   - Cross-platform business technology training beyond traditional cybersecurity
   - **3D Interactive Labs**: Virtual command centers, tech stack builders, and immersive simulation environments for hands-on learning

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
- **courses**: Training module definitions and content (seeded with 35+ courses including AI & Business and Tech for Founders)
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
- **Security**: Complete cybersecurity implementation with enterprise-grade features
- **Scalability**: Serverless database with connection pooling
- **Monitoring**: Request logging and error tracking

### Security Implementation
- **Encryption**: HTTPS with HSTS headers and secure content security policies
- **Authentication**: Bcrypt password hashing with salt rounds (12)
- **Multi-Factor Authentication**: TOTP-based MFA with QR code setup
- **Rate Limiting**: API rate limiting (100 req/min) and auth rate limiting (5 attempts/15min)
- **Account Security**: Account lockout after failed attempts, password reset tokens
- **Headers**: Helmet.js security headers including CSP, HSTS, and XSS protection
- **Input Validation**: Zod schema validation for all user inputs
- **Session Security**: Secure session management with proper expiration

The platform is designed to be easily deployable on modern hosting platforms with minimal configuration requirements, focusing on developer experience and maintainability while providing a robust foundation for cybersecurity training at scale.