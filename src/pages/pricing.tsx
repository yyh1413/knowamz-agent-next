import clsx from "clsx";
import React, { useEffect, useState } from "react";
import FadeIn from "../components/motions/FadeIn";
import { template, vipList } from "../components/pricing/pricingTemplates";
import PricingDialog from "../components/pricingDialog";
import DashboardLayout from "../layout/dashboard";
import {
  FaPlus, FaMinus
} from "react-icons/fa";
import Image from "next/image";
import { getVipPackage } from "../services/user";
import { Modal } from 'antd';
import { type GetStaticProps, type NextPage } from "next";
import { languages } from "../utils/languages";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config.js";
const Pricing = () => {
  const [active, setActive] = useState(true);
  const [warn, setWarn] = useState(template);
  const [row, setRow] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [vipList, setVipList] = useState<any[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClickOpen(i: number) {
    const warnNew = JSON.parse(JSON.stringify(warn)) as typeof template
    warnNew[i]!.open = !warn[i]!.open;
    setWarn(warnNew)
  }

  useEffect(() => {
    void getVipPackageInit();
  }, [active])
  async function getVipPackageInit() {
    const res = await getVipPackage(active ? "Month" : "Year");
    if (res.code === 200) {
      setVipList(res.data)

    }
  }
  function handlePay(row: any) {
    setRow(row)
    setIsModalOpen(true)
  }
  const textClass = 'text-gray-400 mb-2 ml-4 flex gap-2 text-xs flex items-center'
  return (
    <DashboardLayout>
      <div className="flex h-full w-full flex-col p-10">
        <FadeIn initialX={-45} initialY={0} delay={0.1}>
          <div>
            <h1 className="text-4xl font-bold text-white">VIP Package</h1>
            <h2 className="mb-4 text-xl font-thin text-white">
              Open your exclusive version and unleash unlimited possibilities
            </h2>
          </div>
        </FadeIn>
        <FadeIn initialY={45} delay={0.1}>
          <div className="flex flex-col items-center ">
            <div className="w-80 h-11	border-2  bg-black rounded-full	p-1 flex cursor-pointer">
              <div className={clsx("w-1/2 h-full  rounded-full text-white flex items-center justify-center font-semibold", active && 'bg-gray-400')}
                onClick={() => setActive(true)}>
                monthly payment
              </div>
              <div className={clsx("w-1/2 h-full  rounded-full text-white  flex items-center justify-center font-semibold	", !active && 'bg-gray-400')}
                onClick={() => setActive(false)}>
                Annual payment
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 font-mono text-white md:flex-row w-11/12 mt-4 mb-4">
              {
                vipList && vipList?.map(v => (
                  <div key={v.vipName} className="md:w-[calc(100%/3)] max-w-[calc(100%-1rem)] 
                  border p-4 rounded-md bg-black w-72 border-2 flex flex-col border-white/30  hover:border-[#1E88E5]">
                    <div className="mb-1 flex items-center gap-2"><h2 className="flex-grow text-xl font-semibold">{v.vipName}</h2></div>
                    <div className="flex items-center gap-2">
                      <p className="text-4xl font-black">${(v.vipPrice as number)?.toString().split('.')[0]}
                        <span className="text-[24px]">.{(v.vipPrice as number)?.toString().split('.')[1]}</span>
                      </p>
                      <div className="flex flex-col">
                        <p className="text-xs text-gray-400">/ {active ? "month" : 'year'}</p>
                      </div>
                    </div>
                    <hr className="my-3 border-[1.5px] border-white/30"></hr>
                    <p className="mb-2 font-black">Features:</p>
                    <div>
                      <div className={textClass}>
                        <Image src="/duihao.svg" width="16" height="16" alt="Reworkd AI" />
                        {v.packageDataField.verDailyUseNum[0].dailyUseNum} demo agents a day using GPT-3.5-Turbo</div>
                      <div className={textClass}>
                        <Image src="/duihao.svg" width="16" height="16" alt="Reworkd AI" />
                        {v.packageDataField.verDailyUseNum[1].dailyUseNum}  demo agents a day using GPT-4</div>
                      <div className={textClass}>
                        <Image src="/duihao.svg" width="16" height="16" alt="Reworkd AI" />
                        {v.packageDataField.loopNum} Loops per Agent</div>
                      <div className={textClass}>
                        <Image src="/duihao.svg" width="16" height="16" alt="Reworkd AI" />
                        {v.packageDataField.maxTokenNum}  maximum tokens</div>
                      <div className={textClass}>
                        {v.packageDataField.isEnableSearch === 'Y' ? <Image src="/duihao.svg" width="16" height="16" alt="Reworkd AI" />
                          : <Image src="/cuowu.svg" width="16" height="16" alt="Reworkd AI" />}
                        Unlimited web search capabilities</div>
                      <div className={textClass}>
                        {v.packageDataField.isEnableLatestGptPlugin === 'Y' ? <Image src="/duihao.svg" width="16" height="16" alt="Reworkd AI" />
                          : <Image src="/cuowu.svg" width="16" height="16" alt="Reworkd AI" />}
                        Link to the latest GPT plugin (under development)</div>
                    </div>
                    <div className="flex justify-center mt-[20px]">
                      <button onClick={() => handlePay(v)} className="text-gray/50 relative rounded-lg border-2 border-white/30
                       px-4 py-1 font-bold transition-all sm:px-10 sm:py-3 mou cursor-pointer bg-[#1E88E5]/70 
                       text-white/80 hover:border-white/80 hover:bg-[#0084f7] hover:text-white hover:shadow-2xl 
                       border-white/20 bg-gradient-to-t from-sky-500 to-sky-600 transition-all hover:bg-gradient-to-t 
                       hover:from-sky-400 hover:to-sky-600"><span className="absolute right-[-3px] top-[-3px] flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75">
                          </span><span className="relative inline-flex h-3 w-3 rounded-full opacity-90 bg-white"></span>
                        </span><div className="relative">
                          <div className="flex h-full w-full items-center justify-center">Subscribe</div></div></button></div>
                  </div>
                ))
              }
              {/* <div className="md:w-[calc(100%/3)] max-w-[calc(100%-1rem)] border p-4 rounded-md bg-black w-72 border-2 flex flex-col border-white/30 h-[25em]">111</div>
              <div className="md:w-[calc(100%/3)] max-w-[calc(100%-1rem)] border p-4 rounded-md bg-black w-72 border-2 flex flex-col border-white/30 h-[25em]">111</div> */}
            </div>
          </div>
        </FadeIn>
        <FadeIn initialY={45} delay={0.1}>
          <div className=" text-white  items-center flex flex-col">
            <div className="w-11/12">
              <div className="font-semibold text-3xl	mb-[20px] pb-[20px] border-b-2  border-white/30 w-full">
                Frequently asked questions
              </div>
              {warn.map((v, i) => (
                <div key={i} className="text-[20px] mb-[20px] pb-[20px] border-b-2  border-white/30  w-full">
                  <div className="flex items-center justify-between	font-semibold ">
                    <div>{v.title}</div>
                    <div onClick={() => handleClickOpen(i)} className='cursor-pointer'>
                      {v.open ? <FaMinus /> : <FaPlus />}
                    </div>
                  </div>
                  {v.open && <div className="text-white/50" >{v.content}</div>}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div >
      <Modal title={<div >VIP package purchase</div>} open={isModalOpen}
        onCancel={() => setIsModalOpen(false)} destroyOnClose footer={null}
        width='630px'>
        <PricingDialog row={row} />

      </Modal>
    </DashboardLayout >
  );
};

export default Pricing;


export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};
