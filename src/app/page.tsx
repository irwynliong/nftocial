"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import Profile from "./profile";
import MyWallet from "./my_wallet";

export default function Home() {
  return (
    <main>
      <h1
      className="absolute p-4"
      >nftocial.</h1>
      <Tabs aria-label="tabs" variant="underlined" className="pt-2 flex items-center justify-center container max-w-screen-lg mx-auto" size="lg" style={{position:"absolute"}}>
        <Tab key="profile" title="Profile">
          <Profile />
        </Tab>
        <Tab key="wallet" title="Wallet">
          <MyWallet />
        </Tab>
      </Tabs>
    </main>
  );
}
