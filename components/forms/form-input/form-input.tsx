import { FC, useState } from "react";
import { Btn } from "../../ui/btn/btn";
import { EyeIcon } from "../../ui/icon/eye";
import { EyeCloseIcon } from "../../ui/icon/eye-close";
import style from "./form-input.module.scss";

export interface FormInputProps {
  value: any;
  disabled?: boolean;
  onChange: (val: any) => void;
  label?: string;
  placeHolder?: string;
  pattern?: string;
  id?: string;
  required?: boolean;
  type?: "password" | "email" | "text" | "number";
}

export const FormInput: FC<FormInputProps> = (_props) => {
  const [type, setType] = useState(_props.type);
  return (
    <div className={style.formInput}>
      <label htmlFor={_props.id}>{_props.label}</label>
      <div className={style.input}>
        <input
          disabled={_props.disabled}
          required={_props.required}
          pattern={_props.pattern}
          value={_props.value}
          onChange={(e) => _props.onChange(e.target.value)}
          id={_props.id}
          placeholder={!!_props.placeHolder ? _props.placeHolder : ""}
          type={!!_props.type ? type : "text"}
        />
        {_props.type == "password" ? (
          <div>
            {type == "password" ? (
              <button
                className={style.icon}
                type="button"
                onClick={() => setType("text")}
              >
                <EyeIcon />
              </button>
            ) : (
              <button
                className={style.icon}
                type="button"
                onClick={() => setType("password")}
              >
                <EyeCloseIcon />
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
