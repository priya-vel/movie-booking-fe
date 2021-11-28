import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { TheaterService } from "../../../../services/theater.service";
import style from "./theater-detail.module.scss";
import Link from "next/link";
import { AuthStore } from "../../../../stores/auth";
import { EditIcon } from "../../../ui/icon/edit";
import { ShowCard } from "../../../ui/show-card/show-card";
import { TheaterCard } from "../theater-card/theater-card";
import { AddIcon } from "../../../ui/icon/add";
import { Model } from "../../../ui/model/model";
import { ShowForm } from "../../../forms/show-form/show-form";

export const TheaterDetail = () => {
  const [newShowModel, setNewShowModel] = useState(false);
  const router = useRouter();
  const auth = AuthStore.useContainer();
  const [editModel, setEditModel] = useState(false);
  const [show, setShow] = useState({
    banner: "",
    name: "",
    theater: "",
    time: "",
    trailer: "",
    owner: "",
    _id: ""
  } as any
  );
  const [shows, setShows] = useState(
    [] as {
      banner: string;
      name: string;
      theater: string;
      time: string;
      trailer: string;
      owner: string;
      _id: string;
    }[]
  );

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
          getShows();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query]);
  const getShows = () => {
    let id: any = router.query.id;
    TheaterService.getShows(id)
      .then((res) => {
        setShows(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.editTheater}>
      <h1>
        {data.name}{" "}
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
        {auth.user?.type == "owner" && (
          <div>
            <Model
              title={"New Show"}
              model={newShowModel}
              onClose={setNewShowModel}
            >
              <ShowForm
                theater={router.query.id}
                type={"NEW"}
                done={() => {
                  setNewShowModel(false);
                  getShows();
                }}
              />
            </Model>
            <Model
              title={"Edit Show"}
              model={editModel}
              onClose={setEditModel}
            >
              <ShowForm
                theater={router.query.id}
                type={"EDIT"}
                data={show}
                done={() => {
                  setEditModel(false);
                  getShows();
                }}
              />
            </Model>
            {/* editModel */}
          </div>
        )}

        <div className={style.theaterDetailGrid}>
          <div className={style.newShow} onClick={() => setNewShowModel(true)}>
            <div className={style.newTheater}>
              <AddIcon /> <span>NEW</span>
            </div>
          </div>
          {shows.map((el, i) => (
            <ShowCard
              onEdit={() => {
                setShow(shows[i])
                setEditModel(true)
              }}
              key={i}
              _id={el._id}
              banner={el.banner}
              name={el.name}
              owner={el.owner}
              poster={el.banner}
              theater={el.theater}
              time={new Date().toISOString()}
              trailer={el.trailer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
