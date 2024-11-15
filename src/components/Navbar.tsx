"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ThemeSwitch } from "./ThemeSwitch";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, CirclePlus, X } from "lucide-react";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="fixed z-30 top-0 w-full h-[70px] bg-background px-2 md:px-10 flex items-center justify-between border-bs shadow-md shadow-slate-100 dark:shadow-slate-800/30">
      <div className="flex items-center gap-2">
        <Link href={"/"} className="flex gap-1 items-center">
          <Image
            src="/marigold.png"
            alt="logo"
            width={500}
            height={500}
            className="w-14 h-14"
          />
          <h1 className="text-primary text-2xl font-bold ">
            Mari<span className="text-yellow-800">gold</span>
          </h1>
        </Link>
      </div>
      <nav className="flex gap-4 mr-6 max-md:fixed  max-md:top-0 max-md:w-[300px] max-md:bg-card max-md:h-screen -left-[300px]  max-md:flex-col max-md:p-4  ">
        <div className="flex items-center justify-between md:hidden">
          <div className="flex gap-1 items-center">
            <Image
              src="/marigold.png"
              alt="logo"
              width={500}
              height={500}
              className="w-14 h-14"
            />
            <h1 className="text-primary text-2xl font-bold ">
              Mari<span className="text-yellow-800">gold</span>
            </h1>
          </div>
          <Button variant={"secondary"}>
            <X />
          </Button>
        </div>
        <Link className="text-sm" href="/app">
          Home
        </Link>
        <Link className="text-sm" href="/app/forum">
          Forum
        </Link>
        <Link className="text-sm" href="/app/resources">
          Resources
        </Link>
        <Link className="text-sm" href="/app/marketplace">
          Marketplace
        </Link>
        <Link className="text-sm" href="/app/jobs">
          Jobs
        </Link>
        <Link className="text-sm" href="/app/reports">
          Report
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link href={"/app/forum/add-post"}>
          <Button className="">
            <CirclePlus className="md:hidden" />{" "}
            <span className="max-md:hidden">Ask question</span>{" "}
          </Button>
        </Link>
        {/* {user?.publicMetadata.role === "admin" && ( */}

        <Link href={"/app/dashboard"} className="max-md:hidden">
          <Button className="">Dashboard</Button>
        </Link>
        {/* )} */}

        <ThemeSwitch />
        <div className="relative">
          <Bell />
          <div className=" absolute -top-2 text-white text-[8px] -right-2 h-4 w-4 p-2 rounded-full flex items-center justify-center bg-red-500">
            99+
          </div>
        </div>
        <div className="flex gap-2">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
