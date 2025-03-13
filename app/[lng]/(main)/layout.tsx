"use client";
import React from "react";
import Navbar from "./components/navbar";
import { ChildProps } from "@/types";
import { useParams } from "next/navigation";

// Define a type for the params to constrain lng
type Params = {
  lng: string;
};

const MainLayout = ({ children }: ChildProps) => {
  const params = useParams<Params>();

  return (
    <div className="font-orbitron bg-black">
      <Navbar lng={params.lng} />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
