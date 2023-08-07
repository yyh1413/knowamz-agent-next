import React, { useEffect, useState } from "react";
import styles from '../styles/pages.module.css';

interface IProps {
  sendVerificationCode: (sendCode: () => void) => void
}

const Code = (props: IProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);


  useEffect(() => {
    if (isCounting && seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      setIsCounting(false); // 将 isCounting 设置为 false
    }
  }, [isCounting, seconds]);

  const sendCode = () => {
    setSeconds(60); // 设置倒计时时间
    setIsCounting(true);
  };

  const sendVerificationCode = () => {
    // 在这里执行发送验证码的逻辑
    // 可以使用异步请求等方式发送验证码
    props.sendVerificationCode(sendCode);
  };
  return (
    <button className={styles.code} onClick={sendVerificationCode} disabled={isCounting} >
      {isCounting ? `${seconds}s` : 'Code'}

    </button>
  );
};

export default Code;
