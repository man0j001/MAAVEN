import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignIn from "./components/auth/SignIn.tsx";
// import SignUp from "./components/auth/SignUp.tsx";
// Commented out Apollo Client since we're using dummy data
// import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter } from "react-router-dom";

// Commented out Apollo Client configuration
// const client = new ApolloClient({
//   uri: 'http://127.0.0.1:8000/graphql/',
//   cache: new InMemoryCache(),
// });

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   { path: "/login", element: <SignIn /> },
//   { path: "/register", element: <SignUp /> },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  {/* Commented out ApolloProvider since we're using dummy data */}
  {/* <ApolloProvider client={client}> */}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  {/* </ApolloProvider> */}
  </React.StrictMode>

);
