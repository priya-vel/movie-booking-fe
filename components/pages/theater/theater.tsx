import { useEffect, useState } from "react";
import { TheaterService } from "../../../services/theater.service";
import { AuthStore } from "../../../stores/auth";
import { AddIcon } from "../../ui/icon/add";
import { TheaterCard } from "./theater-card/theater-card";
import style from "./theater.module.scss";

export const Theater = () => {
  const auth = AuthStore.useContainer();
  const [theaters, setTheaters] = useState([] as any[]);

  useEffect(() => {
    TheaterService.getTheater()
      .then((res) => {
        setTheaters(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={style.theater}>
      <h1>Your Theaters</h1>
      <div className={style.theaterWrapper}>
        {auth.user && auth.user.type == "owner" ? (
          <TheaterCard to="/theater/new">
            <div className={style.newTheater}>
              <AddIcon /> <span>NEW</span>
            </div>
          </TheaterCard>
        ) : (
          <></>
        )}
        {theaters.map((el, i) => (
          <TheaterCard key={i} to={`/theater/${el._id}`} name={el.name} />
        ))}
      </div>
    </div>
  );
};
