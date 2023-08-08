import { authOptions as prodOptions } from "./auth";
import { options as devOptions } from "./local-auth";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import merge from "lodash/merge";
import type { IncomingMessage, ServerResponse } from "http";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../db";
import type { Adapter } from "next-auth/adapters";
import { env } from "../../env/server.mjs";

const commonOptions: Partial<AuthOptions> & { adapter: Adapter } = {
  adapter: {
    ...PrismaAdapter(prisma),
    // getSessionAndUser: async function (sessionToken) {
    //   console.log("getSessionAndUser", 1111);

    //   return new Promise((resolve) => {
    //     resolve({
    //       user: {
    //         name: "yyh",
    //         email: "173@qq.com",
    //         emailVerified: new Date(),
    //         image: "",
    //         id: "clj53i9nu0000pe77ejofkzq9",
    //       },
    //       session: {
    //         userId: "",
    //         expires: new Date(),
    //         sessionToken: "81a1832b-a75d-4491-aea4-ec8924d18ada",
    //       },
    //     });
    //   });
    // },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) session.user.id = user.id;

      session.user.id = user.id;
      session.user.name = user.name;
      session.user.email = user.email;
      session.accessToken = (
        await prisma.session.findFirstOrThrow({
          where: { userId: user.id },
          orderBy: { expires: "desc" },
        })
      ).sessionToken;
      // console.log(" session-------- ", session, user);

      return session;
    },
  },
};
export const authOptions = (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse
) => {
  // const options =
  //   env.NEXT_PUBLIC_VERCEL_ENV === "development"
  //     ? devOptions(commonOptions.adapter, req, res)
  //     : prodOptions;
  const options = devOptions(commonOptions.adapter, req, res);

  return merge(commonOptions, options) as AuthOptions;
};

/**
 * Wrapper for getServerSession so that you don't need
 * to import the authOptions in every file.
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions(ctx.req, ctx.res));
};
