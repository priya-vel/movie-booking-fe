import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { TheaterService } from "../../../../services/theater.service";
import style from "./edit-theater.module.scss";
import { TheaterForm } from "./../../../forms/theater-form/theater-form";
import { AuthStore } from "../../../../stores/auth";

export const EditTheater = () => {
  const router = useRouter();
  const auth = AuthStore.useContainer();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    owner: "",
    shows: [],
  });
  useEffect(() => {
    initData();
  }, [router.query]);
  const initData = () => {
      setLoading(true)
    if (!!router.query.id) {
      let id: any = router.query.id;
      TheaterService.getOne(id)
        .then((res) => {
          setData(res.data.data);
          setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
          console.log(err);
        });
    }
  };

  const checkOwner = useCallback((child: any) => {
      console.log(data.owner != auth.user?._id, data.owner, auth.user?._id)

    if (data.owner != auth.user?._id) {
    //   router.push({
    //     pathname: "/theater/[id]",
    //     query: {
    //       id: router.query.id,
    //     },
    //   });
      return "loading...";
    } else {
        return child
    }
  }, [loading, data.owner]);

  return checkOwner(
    <div className={style.editTheater}>
      <h1>{data.name}</h1>
      {!!data.name && (
        <TheaterForm type="edit" name={data.name} updated={() => initData()} />
      )}
    </div>
  );
};
