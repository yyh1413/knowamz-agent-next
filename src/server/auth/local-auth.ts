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
            id: credentials.id,
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
      // session({ session, user, token }) {
      //   // session.accessToken = token.accessToken
      //   console.log(" session-------- ", session, user, token);

      //   session.user.id = user.id;
      //   session.user.name = user.name;
      //   session.user.email = user.email;
      //   return session;
      // },
      signIn({ user }) {
        console.log("useruser---", user);
        if (user) {
          // const session = await adapter.createSession({
          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          //   sessionToken: v4(),
          //   userId: user.id,
          //   expires: monthFromNow(),
          // });
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        }
        return true;
      },
    },
    jwt: {
      encode: () => {
        const cookie = getCookie("next-auth.session-token", {
          req: req,
          res: res,
        });

        return cookieToString(cookie);
      },
      decode: () => {
        return null;
      },
    },
  };
};
