'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FaGoogle } from "react-icons/fa";
import type { ClientSafeProvider } from "next-auth/react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../server/auth/auth";

import FadeIn from "../components/motions/FadeIn";
import Image from "next/image";
import { useRouter } from "next/router";
import Input from "../components/Input";
import type { LiteralUnion } from "next-auth/react/types";
import type { BuiltInProviderType } from "next-auth/providers";
import styles from '../styles/pages.module.css';
import Agreement from "../components/Agreement";
import { Message } from "../components/message/Message";
import { MESSAGE_TYPE_ERROR } from "../types/message";
import { encryptPassword, passwordText, validatePassword } from '../utils/user';
import { login, getUserInfo } from "../services/user";


const SignIn = ({ providers }: { providers: Provider }) => {
  const { data: session } = useSession();
  const { push } = useRouter();
  // console.log(globalThis);

  if (session) push("/").catch(console.error);

  // const details = Object.values(providers)
  //   .map((provider) => providerButtonDetails[provider.id])
  //   .filter((detail): detail is ButtonDetail => detail !== undefined);

  return (
    <>
      <Head>
        <title>Sign in - knowamz</title>
      </Head>

      <div className="radial-background-1 grid h-screen w-screen place-items-center bg-black">
        <div className="flex h-full w-full max-w-screen-lg flex-col items-center justify-center gap-10">
          <FadeIn
            duration={1.5}
            initialY={-50}
            className="flex flex-col items-center justify-center gap-6 text-white"
          >
            <div className="flex flex-row gap-6">
              <Image src="logos/dark-default-solid.svg" width="56" height="56" alt="Reworkd AI" />
              <h1
                className={clsx(
                  "bg-gradient-to-br from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent",
                  "text-center text-3xl font-bold leading-[1.1em] tracking-[-0.64px] md:text-5xl"
                )}
              >
                <span className="hidden sm:flex">Welcome to knowamz</span>
                <span className="flex sm:hidden">knowamz</span>
              </h1>
            </div>
            {/* <Button type="primary">Button</Button>
            <Search placeholder="input search text" enterButton="Search" size="large" loading /> */}

          </FadeIn>
          <FadeIn duration={1.5} delay={0.4} initialY={50}>
            {/* {providers.credentials && <InsecureSignin />} */}
            <InsecureSignin />
            {/* {details.map((detail) => ( */}
            {/* <ProviderSignInButton key={detail.id} detail={detail} /> */}
            {/* ))} */}
            <ProviderSignInButton />
            <BottomBut />
          </FadeIn>
        </div>
      </div>
    </>
  );
};
const BottomBut = () => {
  const { push } = useRouter();

  return (
    <>
      <div className={clsx(styles.f_c_b, styles.registration)}>
        <span onClick={() => {
          push(`signup?type=0`).catch(console.error);
        }}>sign up</span>
        <span onClick={() => {
          push("signup?type=1").catch(console.error);
        }}>Forgot password</span>
      </div>
      <Agreement />
    </>
  )

}
const InsecureSignin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState('');
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(!(!!email && !!password))
  }, [email, password])

  function handleValidate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidate('Incorrect email format')
      return false;
    }
    if (!validatePassword(password)) {
      setValidate(passwordText)
      return false;
    }
    return true;
  }
  async function handleSignIn() {
    if (!handleValidate()) return;
    const param = { name: email, password: encryptPassword(password) }
    const res = await login(param);
    if (res.code === 200) {
      const info = await getUserInfo((res.data as string));

      if (info.code === 200) {
        const infop = {
          email: info.data?.email,
          name: info.data?.name,
          id: info.data?.id,
        }
        signIn("credentials", { callbackUrl: "/", ...infop, data: res.data }).catch(console.error);
      }
    }
    setValidate(res.msg)
    return;
  }
  return (
    <div>
      <FadeIn delay={0.8} duration={0.5}>
        {!!validate && <Message
          message={{
            type: MESSAGE_TYPE_ERROR,
            value:
              validate,
          }}
        />}
      </FadeIn>
      <div className="mb-4"></div>
      <Input
        left='email'
        value={email}
        onChange={(e) => setemail(e.target.value)}
        // placeholder="Please enter your email"
        type="text"
      />
      <div className="mb-4"></div>
      <Input
        left='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // placeholder="Please enter the password"
        type="password"
      />
      <button
        disabled={disabled}
        style={{ 'width': 540 }}
        onClick={() => handleSignIn()}
        className={clsx(
          "mb-4 mt-4 flex items-center rounded-md bg-white px-10 py-3 text-sm font-semibold text-black sm:text-base",
          "transition-colors duration-300 hover:bg-gray-200  justify-center",
          disabled && "cursor-not-allowed"
        )}
      >
        Sign in
      </button>
    </div>
  );
};

type Provider = Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;

interface ButtonDetail {
  id: string;
  icon: JSX.Element;
  color: string;
}

const providerButtonDetails = {
  google: {
    id: "google",
    icon: <FaGoogle className="mr-2" />,
    color: "bg-white hover:bg-gray-200 text-black",
  },
  // discord: {
  //   id: "discord",
  //   icon: <FaDiscord className="mr-2" />,
  //   color: "bg-blue-600 hover:bg-blue-700 text-white",
  // },
  // github: {
  //   id: "github",
  //   icon: <FaGithub className="mr-2" />,
  //   color: "bg-gray-800 hover:bg-gray-900 text-white",
  // },
};

const ProviderSignInButton = () => {
  const detail = providerButtonDetails.google
  return (
    <button
      style={{ 'width': 540 }}
      onClick={() => {
        signIn(detail.id, { callbackUrl: "/" }).catch(console.error);
      }}
      className={clsx(
        detail.color,
        " justify-center mb-4 flex items-center rounded-md px-10 py-3 text-base font-semibold shadow-md transition-colors duration-300 sm:px-16 sm:py-5 sm:text-xl"
      )}
    >
      {detail.icon}
      Sign in with {detail.id}
    </button>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { providers: (await getProviders()) ?? {} },
  };
}
