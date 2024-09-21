# React User Management Project

This project is a React-based user management system that includes a form to add user details, a paginated user table and a reusable alert component. It's designed to demonstrate best practices in React development, state management, and UI component design.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [UserTable](#usertable)
  - [Alert](#alert)
- [API](#api)
- [Styling](#styling)

## Features

- Paginated user table with dynamic data fetching
- Reusable alert component for displaying notifications
- Responsive design using Tailwind CSS
- TypeScript for type safety
- React Hooks for state management

## Project Structure

```
react-user-management/
│
├── src/
│   ├── components/
│   │   ├── UserTable.tsx
│   │   ├── UserForm.tsx
│   │   └── Alert.tsx
│   ├── App.tsx
│   └── index.tsx
│
├── public/
│   └── index.html
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Tanay-Verma/Dev-Assignment.git
   ```

2. Navigate to the project directory:
   ```
   cd react-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3000`. You should see the user table and can interact with the pagination controls (make sure the API is setup and running).

To use the Alert component, import it in your React files and use it as needed.

## Components

### UserTable

The UserTable component displays a list of users with pagination.

#### Usage

```tsx
import { UserTable } from './components/UserTable';

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UserTable />
    </div>
  );
}
```

### UserForm

The UserForm component is used to add new users to the table.

#### Usage

```tsx
import { UserForm } from './components/UserForm';

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm />
    </div>
  );
}
```

### Alert

The Alert component is used to display notifications or alerts.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'success' \| 'warning' \| 'destructive' | 'default' | Determines the color scheme of the alert |
| message | string | - | Message to display |
| duration | number | 3000 | Duration in milliseconds (optional) |

#### Usage

```tsx
import Alert from './components/Alert';

function App() {
  return (
    <div className="App">
      <Alert 
        variant="success"
        message="New user has been successfully added to the database."
        duration={3000} // 3 seconds default
      />
    </div>
  );
}
```

## API

The project assumes a backend API endpoint at `http://localhost:3000/users` that returns a list of users. Each user object should have the following structure:

```typescript
interface User {
  name: string;
  age?: number;
  email: string;
}
```

Ensure your backend API is set up to return data in this format.
