import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

type Provider = "google" | "github" | "discord";

interface Auth {
  signIn: (provider?: Provider) => Promise<void>;
  signOut: () => Promise<void>;
  status: "authenticated" | "unauthenticated" | "loading";
  session: Session | null;
}
const sessiontext: Session = {
  accessToken:
    "eyJhbGciOiJIUzUxMiJ9.eyJqd3RFeHBpcmVUaW1lIjoxNjk0MDExNTA1Mjc4LCJleHAiOjE2OTQwMTE1MDUsInVzZXJJZCI6IjMifQ.m4Vm1DQHExWr6LZ9zDBKPYvRhDr-eLXKqOO-kIDCt2m9h4JKmqP7H3uuQKm-B5g5XVHaGizx5Fbsb_6tfMOUUw",
  user: {
    id: "3",
    name: "yyh",
    email: "17645221413@163.com",
    image: "",
  },
  expires: "",
};
export function useAuth({ protectedRoute } = { protectedRoute: false }): Auth {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (protectedRoute && status === "unauthenticated") {
      handleSignIn().catch(console.error);
    }
  }, [protectedRoute, status]);

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    }).catch();
  };

  return {
    signIn: handleSignIn,
    signOut: handleSignOut,
    status,
    session:session,
    // status: "authenticated",
    // session: sessiontext,
  };
}
