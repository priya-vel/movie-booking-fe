import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { TheaterService } from "../../../../services/theater.service";
import style from "./theater-detail.module.scss";
import Link from "next/link";
import { AuthStore } from "../../../../stores/auth";
import { EditIcon } from "../../../ui/icon/edit";
import { ShowCard } from "../../../ui/show-card/show-card";

export const TheaterDetail = () => {
  const router = useRouter();
  const auth = AuthStore.useContainer();
  const [data, setData] = useState({
    name: "loading...",
    owner: "",
    shows: [],
  });
  useEffect(() => {
    if (!!router.query.id) {
      let id: any = router.query.id;
      TheaterService.getOne(id)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query]);
  return (
    <div className={style.editTheater}>
      <h1>
        {data.name} {" "}
        {auth.user && auth.user._id == data.owner && (
          <Link
            href={{
              pathname: "/theater/[id]/edit",
              query: {
                id: router.query.id,
              },
            }}
            passHref
          >
            <sup style={{ cursor: "pointer" }}>
              <EditIcon />
            </sup>
          </Link>
        )}
      </h1>
      <div>
        <h3>Shows</h3>
        <hr />
        <div className={style.theaterDetailGrid}>
            <ShowCard 
            _id={"sdjflaksjdf"}
            banner={"https://cdn.123telugu.com/content/wp-content/uploads/2021/11/Maanaadu.jpg"}
            name="New movei name"
            owner="ownder"
            poster="sakdlfjsdlkf"
            theater="asjoifjsadiofdsf"
            time={new Date().toISOString()}
            trailer={"https://www.youtube.com/embed/6GKiaWbsThA"}
            />
        </div>
      </div>
    </div>
  );
};
