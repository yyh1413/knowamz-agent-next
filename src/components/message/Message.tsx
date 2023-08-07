import React, { useState } from "react";
import clsx from "clsx";
import { getMessageContainerStyle, getTaskStatusIcon } from "../utils/helpers";
import type { Message as IMessage } from "../../types/message";

const Message = ({ message }: { message: IMessage }) => {

  return (
    <div
      className={clsx(
        getMessageContainerStyle(message),
        " rounded-lg border-2 bg-red-100 p-2 font-mono text-xs hover:border-red-300  sm:p-3",
        "text-[14px] border-red-600"
      )}
    >
      <div className="mr-2 inline-block h-[0.9em]">{getTaskStatusIcon(message, {})}</div>
      <span className="mr-2 font-bold whitespace-pre-line	">{message.value}</span>
    </div>
  );
};
export { Message };