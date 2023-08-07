import { FC, useEffect } from "react";
import React, { useState } from "react";
import type { Session } from "next-auth";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { get_avatar } from "../../utils/user";
import { FaEllipsisH, FaSignInAlt } from "react-icons/fa";
import Dialog from "../../ui/dialog";
import { ThemeMenu } from "../ThemeMenu";
import { getUserInfo, handlerlogout } from "../../services/user";
import { message, Progress } from "antd";

const AuthItem: FC<{
  session: Session | null;
  classname?: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}> = ({ session, classname, signOut, signIn }) => {
  const [t] = useTranslation("drawer");
  const [showDialog, setShowDialog] = useState(false);
  const [info, setInfo] = useState<any>();
  const [loading, setloading] = useState(false);
  const user = session?.user;
  async function init() {
    setloading(true)
    const res = await getUserInfo();
    if (res.code === 200) {
      setInfo(res.data)
    } else {
      message.error(res.msg)
    }
    setloading(false)

  }
  useEffect(() => {
    if (showDialog) {
      init();
    }
  }, [showDialog])
  async function handlerSignout() {
    const res = await handlerlogout();
    if (res.code === 200) {
      localStorage.removeItem('next-auth.session-token')
      signOut()
        .then(() => setShowDialog(false))
        .catch(console.error)
        .finally(console.log);
    } else {
      message.error(res.msg)
    }

  }
  return (
    <div className="flex items-center justify-between">
      <div
        className={clsx(
          "text-color-primary flex flex-1 items-center justify-start gap-3 rounded-md px-2 py-2 text-sm font-semibold",
          "hover:background-color-2 cursor-pointer",
          classname
        )}
        onClick={(e) => {
          user ? setShowDialog(true) : void signIn();
        }}
      >
        {user && (
          <img
            className="h-9 w-9 rounded-md bg-neutral-800"
            src={get_avatar(user)}
            alt="user avatar"
          />
        )}
        {!user && (
          <h1 className="ml-2 flex h-9 w-9 flex-grow items-center gap-2 text-center">
            <FaSignInAlt />
            {t("SIGN_IN")}
          </h1>
        )}

        <span className="sr-only">Your profile</span>
        <div>
          <p aria-hidden="true">{user?.name}</p>
          <p aria-hidden="true" className="text-xs font-thin">
            {user?.email}
          </p>
        </div>
        {user && <FaEllipsisH className="ml-auto">Test</FaEllipsisH>}

        <Dialog
          inline
          open={showDialog}
          setOpen={setShowDialog}
          title="My Account"
          icon={<img className="h-20 w-20 rounded-md" src={get_avatar(user)} alt="" />}
          actions={
            <>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                onClick={handlerSignout}
              >
                Sign out
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
            </>
          }
        >
          <p className="text-sm text-gray-600 font-bold ">{user?.name}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <div className="bg-[#9BA7BC] text-white rounded-lg	flex flex-col p-3  mt-3">
            {info?.id ?
              <>
                <div className="text-1xl text-left	font-bold	">{info?.vipName} <span>· VIP</span></div>
                <div className="text-sm text-left	">VIP expires on <span>{info?.vipValidPeriod}</span>  </div>
              </>
              :
              <div className="text-1xl text-left	font-bold	">Non member users </div>
            }
          </div>
          <div className="text-sm mt-3">
            <div className="flex justify-between ">
              <span className="	font-semibold">GPT-3.5 usage times</span>
              <span>{info?.list[0]?.dailyRemainUseNum || 0}/{info?.list[0]?.dailyUseNum || 0}</span>
            </div>
            <Progress percent={info?.id ? info?.list[0]?.dailyRemainUseNum / info?.list[0]?.dailyUseNum * 100 : 0} status="exception" showInfo={false} />
          </div>
          <div className="text-sm">
            <div className="flex justify-between ">
              <span className="	font-semibold">GPT-4 usage times</span>
              <span>{info?.list[1]?.dailyRemainUseNum || 0}/{info?.list[1]?.dailyUseNum || 0}</span>
            </div>
            <Progress percent={info?.id ? info?.list[1]?.dailyRemainUseNum / info?.list[1]?.dailyUseNum * 100 : 0} status="exception"
              showInfo={false} />
          </div>
          <div className="text-sm ">
            <div className="flex justify-between ">
              <span className="	font-semibold">Number of cycles</span>
              <span>{info?.loopNum || 0}</span>
            </div>
            <Progress percent={info?.id ? 100 : 0} status="exception" showInfo={false} />
          </div>

        </Dialog>
      </div>
      <div className="ml-2 mt-2">
        <ThemeMenu />
      </div>
    </div>
  );
};

export default AuthItem;
