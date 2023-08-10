import { Button, Checkbox, Input, message, Radio, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getDiscountPrice, v2pay } from "../../services/user";

interface IProps {
  row: any
}

const Index = ({ row }: IProps) => {
  const [discount, setDiscount] = useState(false);
  const [paybut, setpaybut] = useState(false);
  const [money, setMoney] = useState(row.vipPrice);
  const [discountCode, setdiscountCode] = useState('')
  async function handleDiscount() {
    const res = await getDiscountPrice(row.id, discountCode);
    if (res.code === 200) {
      setMoney(res.data?.discountPrice)
    } else {
      message.error(res.msg)
    }
  }

  async function payClick() {
    const param = {
      vipId: row.id, discountCode: discountCode,
      payChannel: 'PayPal', currency: 'USD', totalAmount: money
    }
    // document.createElement('form')
    const res = await v2pay(param);
    console.log(res);
    window.open(res.data);

  }
  return (
    <>
      <div className="text-[12px] text-[#A3A3A3] mb-[20px]">
        Successful payment indicates that you have read and accepted the User Agreement
        {/* <span className="text-[#3f66ed]">《User Agreement》</span> */}
      </div>
      <hr />
      <div className="py-5 flex ">
        <div className="bg-gray-500/10 border-2 border-gray-500/20 rounded-lg w-[50%] p-4 mr-[20px]">
          <Tag color="orange">{row?.vipType} payment package</Tag>

          <div className="text-sm font-500 flex-between w-full mt-2.5"><div>{row?.vipName}</div><div>US${row?.vipPrice}</div></div>
          <div className="text-neutral-500 text-xs">billing cycle
            <span className="font-500 text-neutral-800">{row?.billPeriod}</span> day</div>
          <hr className="my-4" />
          <div >
            {!discount ?
              <Button type="link" onClick={() => setDiscount(true)} className="pl-[0]">Add discount code</Button> :
              <Input.Search
                value={discountCode}
                onChange={(e) => setdiscountCode(e.target.value)}
                allowClear
                enterButton="confirm"
                size="small"
                onSearch={handleDiscount}
              />
            }
          </div>
          <hr className="my-4" />

          <div className="text-sm flex-between w-full mt-2.5">
            <div className="flex items-center">
              <Checkbox >Automatic renewal</Checkbox>
              <Tag color="volcano">Enjoy 10% off</Tag>

            </div></div>


          <div className="text-sm flex-between w-full mt-5 pb-2.5">
            <div>Total payable</div>
            <div className="text-red-400 font-500">
              ${money}
            </div>
          </div>
        </div>
        <div className=" w-[50%]">
          <div className="border-b-gray-100 w-full border-b pb-4">
            <div className=" flex-between">
              <Radio value={paybut} onChange={() => setpaybut(!paybut)}>
                <div >
                  <span> PayPal</span>
                </div>
              </Radio>
              <Image src='/Paypal.svg' alt="Paypal" width={70} height={40}></Image>

            </div>
            {paybut && <Button type="primary" size="middle" className="w-full mt-4" onClick={payClick}>immediate payment</Button>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
