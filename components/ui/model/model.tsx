import { FC } from "react";
import { CloseIcon } from "../icon/close";
import style from "./model.module.scss";

interface ModelProps {
  model?: boolean;
  title?: string;
  onClose?: (val: boolean) => void;
}

export const Model: FC<ModelProps> = (props) => {
  return props.model ? (
    <div className={style.model}>
      <div className={style.child}>
        <div className={style.header}>
          <div className={style.title}>
            {props.title}
          </div>
          <button onClick={() => !!props.onClose ? props.onClose(false) : ""} className={style.closeBtn}><CloseIcon /></button>
        </div>
        {props.children}</div>
      <div
        className={style.close}
        onClick={() => (!!props.onClose ? props.onClose(false) : "")}
      ></div>
    </div>
  ) : (
    <></>
  );
};
