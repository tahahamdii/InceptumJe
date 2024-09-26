"use client";
import React from "react";
import { cn } from "@/lib/utils";

const LayoutAuth = ({ children, className }) => {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4",
        className
      )}
    >
      <div className="max-w-md w-full bg-white dark:bg-black rounded-lg shadow-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default LayoutAuth;
