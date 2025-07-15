# Inmate Management System

## Overview

This is a web-based **Inmate Management System (IMS)** designed to replace manual, paper-based records traditionally used in correctional facilities. Built with modern technologies—React and TypeScript for the frontend, Node.js and Express for the backend, and MongoDB for data storage—the system automates inmate registration, cell management, visitor logging, and reporting.

## Features

- **Inmate Management**: Register, update, and search inmate profiles including personal details, offense, admission date, cell assignment, and notes.
- **Cell Management**: Create and manage cells, monitor occupancy, assign and transfer inmates, manage cell status (Available, Full, Maintenance).
- **Visitor Logging**: Record visitor details linked to inmates, track visit dates and reasons.
- **Dashboard & Reporting**: Visual statistics for total inmates, new admissions, cell occupancy, and upcoming releases along with recent activity logs.
- **Responsive UI**: Clean, intuitive interface built with React and Tailwind CSS.
- **API-driven**: Backend REST API built with Express and MongoDB, supporting efficient data access and manipulation.

## Technologies Used

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, React Query, Axios |
| Backend    | Node.js, Express, Mongoose (MongoDB ODM)             |
| Database   | MongoDB                                           |

## Installation and Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or remote)
- **npm** or **yarn**

### Backend Setup

1. Navigate to the backend directory:
cd inmate-management-backend

text
2. Install dependencies:
npm install

text
3. Create a `.env` file for environment variables, e.g.:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inmate_management_db
JWT_SECRET=your_jwt_secret

text
4. Start the server:
npm start

text
or for development with auto-restart:
npm run dev

text

### Frontend Setup

1. Navigate to the frontend directory:
cd inmate-management-frontend

text
2. Install dependencies:
npm install

text
3. Start the React development server:
npm run dev

text
4. The application should now be accessible at `http://localhost:3000` (or the port your frontend uses).

## API Endpoints

### Inmate Endpoints

| Method | URL           | Description                         |
|--------|---------------|-----------------------------------|
| GET    | `/inmates/`    | Get all inmates with related info |
| POST   | `/inmates/`    | Register a new inmate              |
| PUT    | `/inmates/:id` | Update inmate profile             |

### Cell Endpoints

| Method | URL             | Description                     |
|--------|-----------------|---------------------------------|
| GET    | `/cells/`       | Get all cells                   |
| POST   | `/cells/`       | Create a new cell              |
| POST   | `/cells/:id/assign` | Assign inmate to a cell  |

### Visitor Endpoints

| Method | URL            | Description               |
|--------|----------------|---------------------------|
| GET    | `/visitors/`    | List visitors              |
| POST   | `/visitors/`    | Log a new visitor          |

### Dashboard Endpoints

| Method | URL                 | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/dashboard/stats`  | Get aggregated system stats    |
| GET    | `/dashboard/activity`| Get recent activities          |
| GET    | `/dashboard/releases`| Get upcoming inmate releases  |

## Usage

- Access the UI and use dashboard for quick overview.
- Register inmates via the inmate module.
- Manage cells, assign inmates, and monitor occupancy.
- Log visitors linked to inmates.
- Retrieve reports and analytics from the dashboard.

## Development Notes

- The backend uses Express middleware to support JSON parsing, routing, and error handling.
- React Query is used on the frontend for efficient asynchronous data fetching and caching.
- MongoDB relationships use Mongoose population for linked documents such as inmates and cells.
- The current version omits authentication; it is planned as a future enhancement.
- Notes and inmate details can be viewed in modals for better user experience.

## Extending the Project

- Implement user authentication and role-based access.
- Add biometric integration for inmate identification.
- Enhance reporting with export options (PDF, CSV).
- Mobile app companion for field access.
- Automated backups and audit trails.

## Troubleshooting

- Ensure MongoDB is running and accessible.
- Verify API base URLs in frontend `lib/api.ts`.
- Use browser DevTools Network tab to debug fetch requests.
- Backend logs provide detailed error messages.
- For authentication errors in future versions, verify JWT token presence and validity.

## Contribution

This project welcomes contributions to improve features, fix bugs, or add enhancements. Please fork the repository, create a branch for your changes, and submit a pull request for review.

## License

Specify project license here (e.g., MIT License).

## Contact

For questions or support, contact [Your Name] at [your.email@example.com].

---

*Project last updated: Tuesday, July 15, 2025*
