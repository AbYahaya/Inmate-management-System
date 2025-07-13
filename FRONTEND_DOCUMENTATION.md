
# Inmate Management System - Frontend Documentation

## Project Overview

A modern, responsive web frontend for an inmate management system built with React, TypeScript, and Tailwind CSS. The application provides a comprehensive interface for managing inmates, cells, visitors, and facility operations.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── Layout.tsx              # Main application layout with sidebar
│   ├── Dashboard.tsx           # Dashboard with statistics and activity
│   ├── InmateList.tsx          # Inmate listing with search/filter
│   ├── InmateRegistration.tsx  # New inmate registration form
│   ├── CellManagement.tsx      # Cell management and assignments
│   └── VisitorLogging.tsx      # Visitor management (read-only)
├── hooks/
│   └── use-toast.ts           # Toast notification hook
├── lib/
│   └── utils.ts               # Utility functions
├── pages/
│   ├── Index.tsx              # Landing page (read-only)
│   └── NotFound.tsx           # 404 error page (read-only)
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and Tailwind config
```

## Core Features

### 1. Dashboard (`/`)
- **Statistics Cards**: Total inmates, available cells, visitors today, releases this week
- **Recent Activity Feed**: Real-time updates on system activities
- **Upcoming Releases**: Calendar view of scheduled releases
- **Responsive Design**: Adapts to mobile and desktop layouts

### 2. Inmate Management (`/inmates`)
- **Comprehensive Listing**: Searchable and filterable inmate directory
- **Search Functionality**: Search by name or inmate ID
- **Status Filtering**: Filter by Active, Released, Transferred status
- **Action Buttons**: View, Edit, and More options for each inmate
- **Status Badges**: Visual status indicators with color coding

### 3. Inmate Registration (`/inmates/register`)
- **Multi-Section Form**: Personal info, admission details, emergency contacts
- **Form Validation**: Required field validation and data type checking
- **Responsive Layout**: Mobile-friendly form design
- **Auto-Generated IDs**: Structured inmate ID system (INM-YYYY-XXX)
- **Success Feedback**: Form submission confirmation

### 4. Cell Management (`/cells`)
- **Visual Cell Grid**: Card-based cell layout with occupancy indicators
- **Occupancy Tracking**: Real-time capacity monitoring
- **Block Filtering**: Filter cells by facility blocks (A, B, C)
- **Cell Types**: Standard and Solitary cell classifications
- **Status Management**: Available, Full, Empty, Maintenance statuses
- **Assignment Actions**: Quick inmate assignment and transfer options

### 5. Navigation & Layout
- **Collapsible Sidebar**: Responsive navigation with toggle functionality
- **Active Route Highlighting**: Visual indication of current page
- **User Profile Section**: Admin user display with logout option
- **Mobile Responsive**: Hamburger menu for mobile devices

## Component Architecture

### Layout Component
- **Sidebar Navigation**: Collapsible sidebar with icon-based navigation
- **Route Management**: React Router integration with NavLink components
- **Responsive Design**: Mobile-first approach with breakpoint handling
- **User Session**: Admin user display and logout functionality

### Data Management
- **Mock Data**: Currently uses static mock data for demonstration
- **API Ready**: Structured for easy Django backend integration
- **State Management**: React Query setup for future API calls
- **Type Safety**: Full TypeScript implementation

### UI Components
- **shadcn/ui Integration**: Professional component library
- **Consistent Design**: Unified color scheme and spacing
- **Accessibility**: ARIA labels and keyboard navigation support
- **Loading States**: Skeleton loaders and loading indicators

## Styling & Design System

### Color Palette
- **Primary**: Blue theme (blue-600, blue-700, blue-800, blue-900)
- **Status Colors**: 
  - Green: Available/Active states
  - Red: Full/Error states
  - Yellow: Warning/Maintenance states
  - Gray: Neutral/Inactive states

### Typography
- **Font Family**: System fonts for optimal performance
- **Hierarchy**: Consistent heading sizes (text-3xl, text-xl, text-lg)
- **Weight Distribution**: Strategic use of font weights for emphasis

### Layout Patterns
- **Grid Systems**: CSS Grid and Flexbox for responsive layouts
- **Card Components**: Consistent card design with hover states
- **Form Layouts**: Multi-column responsive forms
- **Table Design**: Clean data tables with action buttons

## Current Data Models

### Inmate
```typescript
{
  id: number;
  inmateId: string;          // Format: INM-YYYY-XXX
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  offense: string;
  admissionDate: string;     // YYYY-MM-DD format
  cell: string;              // Format: A-101
  status: 'Active' | 'Released' | 'Transferred';
}
```

### Cell
```typescript
{
  id: number;
  cellNumber: string;        // Format: A-101
  block: string;             // A, B, C
  capacity: number;
  currentOccupancy: number;
  inmates: string[];         // Array of inmate names with IDs
  status: 'Available' | 'Full' | 'Empty' | 'Maintenance';
  type: 'Standard' | 'Solitary';
}
```

### Dashboard Statistics
```typescript
{
  title: string;
  value: string;
  change: string;            // Format: +5, -2
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  color: string;             // Tailwind color class
}
```

## API Integration Points

### Ready for Django Backend
The frontend is structured to easily integrate with a Django REST API:

1. **Authentication Endpoints**
   - `/api/auth/login/`
   - `/api/auth/logout/`
   - `/api/auth/user/`

2. **Inmate Management**
   - `GET /api/inmates/` - List inmates
   - `POST /api/inmates/` - Create inmate
   - `GET /api/inmates/{id}/` - Get inmate details
   - `PUT /api/inmates/{id}/` - Update inmate
   - `DELETE /api/inmates/{id}/` - Delete inmate

3. **Cell Management**
   - `GET /api/cells/` - List cells
   - `PUT /api/cells/{id}/` - Update cell
   - `POST /api/cells/{id}/assign/` - Assign inmate

4. **Dashboard Data**
   - `GET /api/dashboard/stats/` - Get statistics
   - `GET /api/dashboard/activity/` - Recent activity
   - `GET /api/dashboard/releases/` - Upcoming releases

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd inmate-management-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_TITLE=Inmate Management System
```

## Testing Strategy

### Component Testing
- Unit tests for individual components
- Form validation testing
- Search and filter functionality testing

### Integration Testing
- Navigation flow testing
- Data flow between components
- API integration testing

### E2E Testing
- Complete user workflows
- Cross-browser compatibility
- Mobile responsiveness

## Security Considerations

### Frontend Security
- Input validation and sanitization
- XSS prevention through proper escaping
- CSRF protection for form submissions
- Secure authentication token handling

### Data Protection
- Sensitive data handling protocols
- Audit trail implementation
- Role-based access control preparation

## Performance Optimization

### Code Splitting
- Lazy loading for route components
- Dynamic imports for large components
- Bundle size optimization

### Caching Strategy
- React Query for API response caching
- Static asset caching
- Service worker implementation

### Accessibility (A11Y)
- WCAG 2.1 compliance
- Screen reader compatibility
- Keyboard navigation support
- Color contrast compliance

## Future Enhancements

### Phase 1 - Core Backend Integration
- [ ] Connect to Django REST API
- [ ] Implement authentication system
- [ ] Add real-time data updates
- [ ] Implement error handling

### Phase 2 - Advanced Features
- [ ] Advanced search and filtering
- [ ] Bulk operations for inmates
- [ ] Cell assignment optimization
- [ ] Report generation

### Phase 3 - Enhanced UX
- [ ] Real-time notifications
- [ ] Advanced dashboard analytics
- [ ] Mobile app considerations
- [ ] Offline capability

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Responsive Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+

## Deployment

### Build Configuration
```bash
# Production build
npm run build

# Preview production build
npm run preview
```


### Code Standards
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Conventional commit messages
- Component documentation requirements

### Pull Request Process
1. Feature branch from main
2. Component and type documentation
3. Testing requirements
4. Code review approval
5. Deployment verification

## Support and Maintenance


*This documentation provides a comprehensive overview of the inmate management system frontend. For specific implementation details, refer to the individual component files and their inline documentation.*
