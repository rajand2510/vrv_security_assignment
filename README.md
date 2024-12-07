# **User, Role, and Permission Management Dashboard**

This project implements a comprehensive dashboard for managing users, roles, and permissions. The dashboard is designed for administrators to efficiently perform CRUD operations, manage roles and their associated permissions, and handle user statuses.

---

## **Features**

### **Users Management**
- View all users in a table.
- Edit user details (name and role) in a popup modal.
- Toggle user status (Active/Inactive).
- Add new users with predefined roles.
- Delete users from the system.

### **Roles Management**
- View roles and their associated permissions in a structured table.
- Edit role details and manage permissions using interactive tags.
- Add new roles with selected permissions.
- Delete roles from the system.

### **Permissions Management**
- View all permissions and their descriptions.
- Edit permission details and descriptions in real time.
- Add new permissions to the system.
- Delete permissions when no longer needed.

---

## **Tech Stack**

- **React**: For building reusable and dynamic UI components.
- **Tailwind CSS**: For responsive and clean styling.
- **shadcn/ui**: For professional and accessible UI components.
- **TypeScript**: Ensures type safety and minimizes runtime errors.
- **Vite**: A fast and modern build tool for local development.

---

## **File Structure**
src/ ├── types/ # TypeScript types for Users, Roles, and Permissions 
│
└── index.ts 
├── data/ 
# Mock data for initial testing 
│ └── mockData.ts
├── components/ 
# UI components for the dashboard 
│ 
├── UserTable.tsx 
# Component for user management 
│ 
├── RoleTable.tsx 
# Component for role management 
│ 
└── PermissionTable.tsx 
# Component for permission management 
├── App.tsx # Entry point of the application 
└── index.tsx # Application bootstrapping

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/user-role-permission-dashboard.git
cd user-role-permission-dashboard
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Start the Development Server
```bash
npm run dev
```
## Development Highlights
# Responsive Tabs
- The dashboard is organized into tabs for seamless navigation between Users, Roles, and Permissions sections.
# CRUD Operations
- Fully functional Create, Read, Update, Delete features for all entities.
# Interactive UI
- Use of shadcn/ui for modals, tooltips, and interactive elements.
- Toggle buttons for Active/Inactive status and permission management.
# Type Safety
- Types defined in src/types/index.ts ensure consistency and error prevention.

## Data Management
# Mock Data
- Mock data is stored in src/data/mockData.ts and used for initial testing. Replace this with API integration as needed.

# State Management
- State is managed locally using React's useState for simplicity.
- Extendable to global state management libraries like Redux or Context API.

## Extending the Dashboard
# Add an API Backend
- Replace mock data with API calls.
- Update useState hooks to handle asynchronous data fetching.
# Customize UI Components
- Modify components in src/components/ to match your project's theme.

## License
### **Suggestions for Further Enhancements**
- **Role-Based Access Control (RBAC):** Limit access to sections based on user roles.
- **API Integration:** Replace mock data with real-time data from a backend.
- **Audit Logging:** Track changes to users, roles, and permissions for accountability.
- **Search and Filters:** Add search and filtering options for large datasets.