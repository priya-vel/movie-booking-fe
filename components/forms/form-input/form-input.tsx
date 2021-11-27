import { FC } from "react";
import style from "./form-input.module.scss";

export interface FormInputProps {
  value: any;
  onChange: (val: any) => void;
  label?: string;
  placeHolder?: string;
  pattern?: string;
  id?: string;
  type?: "password" | "email" | "text" | "number";
}

export const FormInput: FC<FormInputProps> = (_props) => {
  return (
    <div className={style.FormInput}>
      <label htmlFor={_props.id}>{_props.label}</label>
      <input
        value={_props.value}
        onChange={(e) => _props.onChange(e.target.value)}
        id={_props.id}
        placeholder={!!_props.placeHolder ? _props.placeHolder : ""}
        type={!!_props.type ? _props.type : "text"}
      />
    </div>
  );
};
