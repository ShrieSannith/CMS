import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App';
import Signinpage from './pages/login.js';
import Signuppage from './pages/signup.js';
import IssueFormPage from './pages/issueForm.js';
import LogsPage from './pages/logsPage.js';
import DisplayPage from './pages/displayForm.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signin",
    element: <Signinpage />,
  },
  {
    path: "signup",
    element: <Signuppage />,
  },
  {
    path: "form",
    element: <IssueFormPage />,
  },
  {
    path: "logs",
    element: <LogsPage />,
  },
  {
    path: "details/:logId", // Updated to include dynamic logId
    element: <DisplayPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
