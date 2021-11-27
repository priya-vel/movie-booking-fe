import { FC } from "react";
import style from "./btn.module.scss";

interface BtnProps {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined
  onClick?: (e: any) => void;
  block?: boolean
}

export const Btn: FC<BtnProps> = (props) => {
  return (
    <button
    type={props.type}
      onClick={!!props.onClick ? props.onClick : () => {}}
      className={
          `${style.btn
        } ${props.block && style["btn--block"]} ${
            !!props.className ? props.className : ""}`}
    >
      {props.children}
    </button>
  );
};
