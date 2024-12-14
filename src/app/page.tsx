"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "../lib/client";
import Profile from "./profile";
import MyWallet from "./my_wallet";
import Friends from "./friends";
import Button from "./connect_button";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react";

export default function Home() {
  const client_id = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
  return (
    <ThirdwebSDKProvider activeChain={43114} clientId={client_id}>
    <main>
      <div className="absolute top-0 right-0 p-4 flex items-center">
        <h1 className="mr-4">nftocial.</h1>
        <Button />
      </div>
      <Tabs aria-label="tabs" variant="underlined" className="pt-2 flex items-center justify-center container max-w-screen-lg mx-auto" size="lg" style={{position:"absolute"}}>
        <Tab key="profile" title="Profile">
          <Profile />
        </Tab>
        <Tab key="wallet" title="Wallet">
          <MyWallet />
        </Tab>
        <Tab key="friends" title="Friends">
          <Friends />
        </Tab>
      </Tabs>
    </main>
    </ThirdwebSDKProvider>
  );
}
