import { useEffect, useState } from "react";
import { ShowService } from "../../../services/shows.service";
import { ShowCard } from "../../ui/show-card/show-card";
import style from "./home.module.scss";

export const HomeComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    ShowService.getAll()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>New Show Lists</h1>
      <hr />
      <div className={style.home}>
        {data.map((el, i) => (
          <ShowCard key={i} {...el} />
        ))}
      </div>
    </div>
  );
};
