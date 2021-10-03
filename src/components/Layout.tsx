import React from "react";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <div className="w-fullscreen">{children}</div>
    <Toaster />
  </div>
);
