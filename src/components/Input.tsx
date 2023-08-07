import React from "react";
import Label from "./Label";
import Code from "./Code";
import clsx from "clsx";
import type { toolTipProperties } from "../types";

interface InputProps {
  small?: boolean; // Will lower padding and font size. Currently only works for the default input
  code?: boolean;
  left?: React.ReactNode;
  value: string | number | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  setValue?: (value: string) => void;
  sendVerificationCode?: (sendCode: () => void) => void
  type?: string;
  maxLength?: number;
  subType?: string;
  attributes?: { [key: string]: string | number | string[] }; // attributes specific to input type
  toolTipProperties?: toolTipProperties;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => void;
}

const Input = (props: InputProps) => {
  const {
    maxLength,
    small,
    placeholder,
    left,
    value,
    type,
    onChange,
    setValue,
    disabled,
    attributes,
    inputRef,
    toolTipProperties,
    onKeyDown,
    code
  } = props;
  const [isHidden, setIsHidden] = React.useState(false);

  const isTypeTextArea = () => {
    return type === "textarea";
  };

  let inputElement;

  if (isTypeTextArea()) {
    inputElement = (
      <textarea
        className={clsx(
          "border:black delay-50 h-15 background-color-5 placeholder:text-color-tertiary text-color-primary border-color-1 border-focusVisible-1 border-hover-1 w-full resize-none rounded-xl border-2 p-2 text-sm tracking-wider outline-0 transition-all sm:h-20 md:text-lg",
          disabled && "cursor-not-allowed",
          left && "md:rounded-l-none",
          small && "text-sm sm:py-[0]"
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...attributes}
      />
    );
  } else {
    inputElement = (
      <input
        className={clsx(
          "background-color-5 placeholder:text-color-tertiary text-color-primary border-color-1 border-focusVisible-1 border-hover-1 w-full rounded-xl border-2 p-2 py-1 text-sm tracking-wider outline-0 transition-all duration-200 sm:py-3 md:text-lg",
          disabled && "cursor-not-allowed",
          left && "md:rounded-l-none",
          small && "text-sm sm:py-[0]"
        )}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...attributes}
      />
    );
  }

  return (
    <div
      className={clsx(
        "items-left z-5 text-color-primary flex h-fit w-full flex-col rounded-xl font-mono text-lg md:flex-row md:items-center",
        "md:flex-row md:items-center relative"
      )}
    >
      {left && <Label left={left} type={type} toolTipProperties={toolTipProperties} />}
      {inputElement}
      {code && props.sendVerificationCode ? <Code sendVerificationCode={props.sendVerificationCode} /> : undefined}
    </div>
  );
};

export default Input;
