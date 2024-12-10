"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import Profile from "./profile";

export default function Home() {
  return (
    <main className="min-h-[100vh]">
      <CustomNavbar />
      <div className="flex items-center justify-center container max-w-screen-lg mx-auto">
        <Profile />
      </div>
    </main>
  );
}

function CustomNavbar() {
    return (
        <Navbar>
          <NavbarBrand>
            <p className="font-bold text-inherit">namecard.</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                marketplace
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link aria-current="page" href="#">
                profile
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                my wallet
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      );
}