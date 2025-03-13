"use client";
import React from "react";
import Navbar from "./components/navbar";
import { ChildProps } from "@/types";
import { useParams } from "next/navigation";

const MainLayout = ({ children }: ChildProps) => {
  const { lng } = useParams();
  return (
    <div className="font-orbitron bg-black">
      <Navbar lng={lng} />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
