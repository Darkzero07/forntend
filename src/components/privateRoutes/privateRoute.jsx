import React from "react";
import ConfigRoutes from "../../config/routes";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import NavBar from "../navbar/navbar";
import Footer from "../navbar/footer";


function PrivateRoutes(props) {
  const role = props.role || "guest";

  if (!ConfigRoutes[role]) {
    console.error(`No configuration found for role: ${role}`);
    return null;
  }

  const allowedRoute = ConfigRoutes[role]?.allowedRoutes;
  const redirectRoute = ConfigRoutes[role]?.redirectRoute;

  if (!Array.isArray(allowedRoute) || !redirectRoute) {
    console.error(`Invalid route configuration for role: ${role}`, {
      allowedRoute,
      redirectRoute,
    });
    return <div>Role not found</div>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {allowedRoute.map((route, index) => {
          if (!route || !route.url || !route.component) {
            console.error(
              `Invalid route at index ${index} for role: ${role}`,
              route
            );
            return null;
          }

          return (
            <Route path={route.url} key={route.url} exact
              element={<route.component setRole={props.setRole} />} />
          );
        })}
        <Route path="*" element={<Navigate to={redirectRoute} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default PrivateRoutes;
