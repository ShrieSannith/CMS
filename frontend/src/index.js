import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import App from './App';
import Signinpage from '../src/pages/login.js';
import Signuppage from '../src/pages/signup.js';
import IssueFormPage from '../src/pages/issueForm.js';


import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "",
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
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
