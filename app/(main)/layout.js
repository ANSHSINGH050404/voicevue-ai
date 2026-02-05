import React from "react";
import DashboardProvider from "./provider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <DashboardProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <Header />
          <div className="mx-5 md:mx-20 lg:mx-36 py-10">{children}</div>
        </div>
      </DashboardProvider>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
