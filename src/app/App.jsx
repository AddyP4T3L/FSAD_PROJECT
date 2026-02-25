import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { routes } from "./routes";

const isAuthenticated = () => localStorage.getItem("cc_auth") === "true";

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", fontSize: "16px", color: "red" }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            {routes.map((r, i) => (
              <Route key={i} path={r.path} element={r.element} />
            ))}
          </Route>

          <Route
            path="*"
            element={<Navigate to={isAuthenticated() ? "/" : "/login"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}