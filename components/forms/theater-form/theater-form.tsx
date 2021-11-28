import { useRouter } from "next/dist/client/router";
import { FC, useState } from "react";
import { TheaterService } from "../../../services/theater.service";
import { Btn } from "../../ui/btn/btn";
import { FormInput } from "../form-input/form-input";
import style from "./theater-form.module.scss";

interface TheaterFormProps {
  type: "new" | "edit";
  disabled?: boolean;
  name?: string;
  updated?: () => void;
}

export const TheaterForm: FC<TheaterFormProps> = (props) => {
  const [name, setName] = useState(!!props.name ? props.name : "");
  const [canEdit, setCanEdit] = useState(props.disabled);
  const router = useRouter();
  const onSubmit = () => {
    if (props.type == "new") {
      TheaterService.createTheater({
        name,
      })
        .then((res) => {
          if (!!props.updated) {
            props.updated();
          }
        })
        .catch((err) => console.error(err));
    } else {
      let id: any = router.query.id;
      TheaterService.updateName(id, name)
        .then((res) => {
          if (!!props.updated) {
            props.updated();
          }
        })
        .catch((err) => console.error(err));
    }
  };
  const btnText = {
    new: "CREATE",
    edit: "UPDATE",
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={style.theaterForm}
    >
      <FormInput
        value={name}
        id="name"
        onChange={setName}
        placeHolder={"Name"}
        label="Name"
        required
        disabled={canEdit}
      />
      {!canEdit ? (
        <div>
          <Btn
            outlined
            type="button"
            onClick={() => {
              if (!props.disabled) {
                router.push("/theater");
              } else {
                setCanEdit(true);
              }
            }}
          >
            CANCLE
          </Btn>
          <span style={{ paddingLeft: "10px" }}></span>
          <Btn type="submit">{btnText[props.type]}</Btn>
        </div>
      ) : (
        <div>
          <Btn onClick={() => setCanEdit(false)}>Edit</Btn>
        </div>
      )}
    </form>
  );
};
