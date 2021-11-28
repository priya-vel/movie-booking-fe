import { useRouter } from "next/dist/client/router";
import { FC } from "react";
import style from "./btn.module.scss";

interface BtnProps {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined
  onClick?: (e: any) => void;
  block?: boolean
  outlined?: boolean
  to?: string
}

export const Btn: FC<BtnProps> = (props) => {
  const router = useRouter()
  const onClick = (e: any) => {
    if (!!props.to) {
      router.push(props.to)
    }
    if (!!props.onClick) {
      props.onClick(e)
    }
  }
  return (
    <button
    type={props.type}
      onClick={(e) => onClick(e)}
      className={
          `${style.btn
        } ${
          props.block && style["btn--block"]
        } ${props.outlined && style["btn--outlined"]} ${
            !!props.className ? props.className : ""}`}
    >
      {props.children}
    </button>
  );
};
