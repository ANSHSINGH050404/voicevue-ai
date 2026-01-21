import React from "react";
import DashboardProvider from "./provider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <DashboardProvider>
        <Header />
        <div className="p-10">{children}</div>
      </DashboardProvider>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
