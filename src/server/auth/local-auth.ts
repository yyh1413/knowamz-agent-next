/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getCookie, setCookie } from "cookies-next";
import { z } from "zod";
import { v4 } from "uuid";
import type { IncomingMessage, ServerResponse } from "http";
import type { Adapter } from "next-auth/adapters";
import { login } from "../../services/user";
import GoogleProvider from "next-auth/providers/google";
import { serverEnv } from "../../env/schema.mjs";

const monthFromNow = () => {
  const now = new Date(Date.now());
  return new Date(now.setMonth(now.getMonth() + 1));
};

function cookieToString(cookie: string | undefined | null | boolean) {
  switch (typeof cookie) {
    case "boolean":
      return cookie.toString();
    case "string":
      return cookie;
    default:
      return "";
  }
}

export const options = (
  adapter: Adapter,
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse
): AuthOptions => {
  return {
    adapter,
    providers: [
      GoogleProvider({
        clientId: serverEnv.GOOGLE_CLIENT_ID ?? "",
        clientSecret: serverEnv.GOOGLE_CLIENT_SECRET ?? "",
        allowDangerousEmailAccountLinking: true,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      Credentials({
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          name: { label: "name", type: "text", placeholder: "jsmith" },
          data: { label: "data", type: "text", placeholder: "jsmith" },
          email: { label: "email", type: "text", placeholder: "jsmith" },
          id: { label: "id", type: "text", placeholder: "jsmith" },
        },
        authorize(credentials, req) {
          // const data = { name: credentials?.name, password: credentials?.password };
          // const res = await login(data);

          // if (res.code === 200) {
          return {
            id: credentials?.id ||'',
            name: credentials?.name,
            email: credentials?.email,
            data: credentials?.data,
          };
          // }

          return null;
        },
      }),
    ],
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      // Fallback to base url if provided url is not a subdirectory
      redirect: (params: { url: string; baseUrl: string }) =>
        params.url.startsWith(params.baseUrl) ? params.url : params.baseUrl,
      signIn({ user, account, profile }) {
        console.log("signIn", user, account, profile);

        if (user && account?.provider !== "Google") {
          const session = {
            // @ts-ignore
            sessionToken: user?.data,
            userId: user.id,
            expires: monthFromNow(),
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          setCookie("next-auth.session-token", session.sessionToken, {
            expires: session.expires,
            req: req,
            res: res,
          });
        }
        return true;
      },
    },
    // jwt: {
    //   encode: (e) => {
    //     const cookie = getCookie("next-auth.session-token", {
    //       req: req,
    //       res: res,
    //     });
    //     console.log("jwtencode", e, cookieToString(cookie));
    //     return cookieToString(cookie);
    //   },
    //   decode: (e) => {
    //     console.log("jwtdecode", e);

    //     return null;
    //   },
    // },
  };
};
