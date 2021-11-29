import { FC, useEffect, useState } from "react";
import { Btn } from "../../ui/btn/btn";
import { FormInput } from "../form-input/form-input";
import style from "./show-form.module.scss";
import moment from "moment";
import { ShowService } from "../../../services/shows.service";

interface ShowFormProps {
  type: "NEW" | "EDIT";
  done?: () => void;
  theater: any;
  data?: {
    banner: "",
    name: "",
    theater: "",
    time: "",
    trailer: "",
    owner: "",
    _id: ""
  }
}

export const ShowForm: FC<ShowFormProps> = (props) => {
  const [showData, setShowData] = useState({
    name: "",
    banner: "",
    trailer: "",
    time: "",
    theater: "",
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const updateData = (key: any, value: any) => {
    setShowData({ ...showData, [key]: value });
  };
  const submitHandle = () => {
    console.log(date + " " + time);

    let newDate = moment();
    const [y, m, d] = date.split("-");
    newDate.set("hours", Number(time.split(":")[0]));
    newDate.set("minutes", Number(time.split(":")[1]));
    newDate.set("month", Number(m));
    newDate.set("date", Number(d));
    newDate.set("year", Number(y));

    let videoLink = String(showData.trailer)
      .replace("https://www.youtube.com/watch?v=", "")
      .replace("https://www.youtube.com/embed/", "")
      .replace("https://youtu.be/", "");
    let body = {
      ...showData,
      trailer: videoLink,
      time: newDate.toISOString(),
      theater: props.theater,
    };
    console.log(body);
    if (props.type == "NEW") {
      ShowService.create(body)
        .then((_res) => {
          if (!!props.done) {
            props.done();
          }
          console.log(_res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (props.type == "EDIT") {
      ShowService.update(props.data?._id, body)
        .then((_res) => {
          if (!!props.done) {
            props.done();
          }
          console.log(_res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const buttonText = {
    NEW: "CREATE",
    EDIT: "UPDATE",
  };
  useEffect(() => {
    if (props.type == "EDIT") {
      if (props.data) {
        const ti = (v: number) => v < 10 ? `0${v}` : v
        let t = `${ti(new Date(props.data.time).getHours())}:${ti(new Date(props.data.time).getMinutes())}`
        setDate(String(props.data.time).slice(0, 10))
        setTime(t)
        setShowData(props.data)
        console.log(t);
      }
    }
  },[])
  return (
    <form
      className={style.showForm}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandle();
      }}
    >
      <FormInput
        value={showData.name}
        label={"Name"}
        placeHolder={"Name"}
        onChange={(e) => updateData("name", e)}
        id={"name"}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1em",
        }}
      >
        <FormInput
          value={date}
          label={"Show Date"}
          placeHolder={"Show Date"}
          onChange={(e) => setDate(e)}
          id={"date"}
          type={"date"}
        />
        <FormInput
          value={time}
          label={"Show Time"}
          placeHolder={"Show Time"}
          onChange={(e) => setTime(e)}
          id={"time"}
          type={"time"}
        />
      </div>
      <FormInput
        value={showData.banner}
        label={"Banner Image URL"}
        placeHolder={"Banner Image URL"}
        onChange={(e) => updateData("banner", e)}
        id={"banner"}
      />
      <FormInput
        value={showData.trailer}
        label={"Trailer YourTube video URL"}
        placeHolder={"Trailer video URL"}
        onChange={(e) => updateData("trailer", e)}
        id={"trailer"}
      />
      <div style={{
        height: "20px"
      }}>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <Btn
          onClick={() => (!!props.done ? props.done() : "")}
          type="button"
          block
          outlined
        >
          CANCEL
        </Btn>
        <div
          style={{
            width: "20px",
          }}
        ></div>
        <Btn type="submit" block>
          {buttonText[props.type]}
        </Btn>
      </div>
    </form>
  );
};
