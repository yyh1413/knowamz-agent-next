'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Head from "next/head";

import FadeIn from "../components/motions/FadeIn";
import Image from "next/image";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Agreement from "../components/Agreement";
import styles from '../styles/pages.module.css';
import { useAuth } from "../hooks/useAuth";
import { sendVerifyCode, setHandleSignup, restPassword } from "../services/user";
// import { Button, message, Space } from 'antd';
import { Message } from "../components/message/Message";
import { MESSAGE_TYPE_ERROR } from "../types/message";
import { encryptPassword, validatePassword, passwordText } from "../utils/user";
import { debounce } from 'lodash';
import { message } from 'antd';
import { HttpResponse } from "../services/api-axios";

const text = {
  '0': "Sign up",
  '1': "Reset password",
}
type IText = keyof typeof text
const Signup = () => {
  const router = useRouter();
  const { query } = router;

  const [type, setType] = useState<IText>('0')

  useEffect(() => {
    setType((query.type as IText))
  }, [query]);

  return (
    <>
      <Head>
        <title>{text[type]} - knowamz</title>
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
                <span className="hidden sm:flex">{text[type]} - knowamz</span>
                <span className="flex sm:hidden">knowamz</span>
              </h1>
            </div>

          </FadeIn>
          <FadeIn duration={1.5} delay={0.4} initialY={50}>
            <InsecureSignup type={type} />
            <BottomBut />
          </FadeIn>
        </div>
      </div>
    </>
  );
};
const BottomBut = () => {
  const { signIn } = useAuth();

  return (
    <>
      <div className={clsx(styles.f_c_b, styles.registration)} onClick={() => void signIn()}>
        <span>You already have an account, sign in now</span>
      </div>
      <Agreement />
    </>
  )
}

const InsecureSignup = (props: { type: IText }) => {

  const [name, setUsername] = useState("");
  const [email, setEmailValue] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [validate, setValidate] = useState('');
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (props.type === '0') {
      setDisabled(!(!!name && !!email && !!code && !!password))
    } else if (props.type === '1') {
      setDisabled(!(!!email && !!code && !!password))
    }
  }, [name, email, code, password, props.type])
  // useEffect(() => {
  //   // 在Effect中调用message.notice()
  //   void message.info('这是一个通知');
  // }, []);


  function handleValidate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setValidate('email cannot be empty')
      return false;
    }
    if (props.type === "0" && !name) {
      setValidate('User name cannot be empty')
      return false;
    }
    if (!emailRegex.test(email)) {
      setValidate('Incorrect email format')
      return false;
    }
    return true;
  }
  const sendhandleCode = async (sendCode: () => any) => {
    if (handleValidate()) {
      const res = await sendVerifyCode({ name, email, type: props.type })
      if (res.code === 200) {
        sendCode()
      } else {
        setValidate(res.msg)
        return;
      }
      setValidate('')
    }
  }

  // 定义防抖处理的事件处理函数
  const handleSignup = debounce(async () => {
    // 在此处执行实际的搜索逻辑，例如发送搜索请求等
    if (!handleValidate()) return;
    if (!validatePassword(password)) {
      setValidate(passwordText)
      return;
    }
    let res: HttpResponse<any>;
    console.log(name, email, password, code);

    if (props.type === '0') {
      res = await setHandleSignup({ name, email, password: encryptPassword(password), code })
    } else {
      res = await restPassword({ email, password: encryptPassword(password), code })
    }

    if (res.code === 200) {
      void message.success(props.type === '0' ? 'login was successful' : 'Successfully modified password')
    } else {
      setValidate(res.msg)
      return;
    }
    setValidate('')

    // 设置防抖的等待时间（单位：毫秒）
  }, 2000, { leading: true } // 设置leading为true，使第一次点击立即执行事件处理函数
  );

  return (
    <div className="w-[540px]">
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
      {props.type === '0' && <Input
        left='name'
        value={name}
        onChange={(e) => setUsername(e.target.value)}
        // placeholder="Please enter your name"
        type="text"
      />}
      <div className="mb-4"></div>
      <Input
        left='email'
        value={email}
        onChange={(e) => setEmailValue(e.target.value)}
        // placeholder="Please enter your email"
        type="text"
      />
      <div className="mb-4"></div>
      <Input
        left='code'
        value={code}
        maxLength={6}
        onChange={(e) => setCode(e.target.value)}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        sendVerificationCode={sendhandleCode}
        // placeholder="Please enter your Code"
        type="text"
        code
      />
      <div className="mb-4"></div>
      <Input
        // left={props.type === '0' ? "password" : "new password"}
        left={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // placeholder="Please enter the password"
        type="password"
      />
      <button
        disabled={disabled}
        style={{ 'width': 540 }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleSignup}
        className={clsx(
          "mb-4 mt-4 flex items-center rounded-md bg-white px-10 py-3 text-sm font-semibold text-black sm:text-base",
          "transition-colors duration-300 hover:bg-gray-200  justify-center",
          disabled && "cursor-not-allowed"
        )}
      >
        {text[props.type]}
      </button>
    </div>
  );
};

export default Signup;
