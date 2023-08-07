import type { User } from "next-auth";
import md5 from "md5";

export const get_avatar = (user?: User) =>
  user?.image ||
  "https://avatar.vercel.sh/" +
    (user?.email || "") +
    ".svg?text=" +
    (user?.name?.substr(0, 2).toUpperCase() || "");

export function encryptPassword(password: string): string {
  const encryptedPassword: string = md5(password);
  return encryptedPassword;
}

export function validatePassword(password: string) {
  // 正则表达式，包含数字、字母和特殊字符的密码
  const passwordPattern = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
  // 使用 test 方法校验密码是否匹配正则表达式
  return passwordPattern.test(password);
}

export const passwordText = `
1. At least one special character (for example:! @ # $% ^&*)

2. At least one digit (0-9)

3. At least one letter

4. Minimum length of 8 characters`;
