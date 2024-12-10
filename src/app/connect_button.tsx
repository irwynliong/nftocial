// app/page.tsx
import type { NextPage } from "next";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "./actions/login"; // we'll create this file in the next section

export default function Button() {
  return (
    <ConnectButton
      client={client}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) =>
          generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};