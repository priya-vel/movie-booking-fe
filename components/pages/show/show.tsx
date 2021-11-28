import moment from "moment";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { ShowService } from "../../../services/shows.service";
import { AuthStore } from "../../../stores/auth";
import { BookShowForm } from "../../forms/book-form/book-form";
import { StarIcon } from "../../ui/icon/star";
import { Model } from "../../ui/model/model";
import { Booking } from "../booking/booking";
import style from "./show.module.scss";

export const ShowDetail = () => {
  const router = useRouter();
  const auth = AuthStore.useContainer();
  const [seates, setSeates] = useState([]);
  const [showBookingModel, setShowBookingModel] = useState(false);
  const [show, setShow] = useState({
    banner: "",
    createdAt: "",
    name: "",
    theater: "",
    time: "",
    trailer: "",
    updatedAt: "",
    _id: "",
  });
  const [theater, setTheater] = useState({
    createdAt: "",
    name: "",
    owner: "",
    shows: [],
    updatedAt: "",
    _id: "",
  })
  const [selected, setSelected] = useState({} as any)
  const getShowDetail = async () => {
    if (!!router.query.id) {
      let id: any = router.query.id;
      ShowService.getOne(id)
        .then((res) => {
          setShow(res.data.data);
          setSeates(res.data.shows);
          setTheater(res.data.theater)
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getShowDetail();
  }, [router.query]);

  const selectItem = (id: any) => {
    const item = seates.find((e: any) => e._id == id)
    setSelected(item)
    setShowBookingModel(true)
  }
  const td = (f: string) => moment(show.time).format(f);
  return (
    <div className={style.showDetail}>
        <div>
            Theater: {theater.name}
        </div>
        <div>
        <iframe className={style.video} height="315" 
        src={`https://www.youtube.com/embed/${show.trailer}`} 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div>
            <div className={style.alignCenter} >Ratings: <StarIcon></StarIcon>4.3</div>
            <div>
                Date: {td("DD, MMM YYYY")}
            </div>
            <div>
                Time: {td("h:MM A")}
            </div>
        </div>
      <h1>Booking</h1>
      {!!auth.user && (
        <div>
          <Model
            title="Book Show"
            onClose={setShowBookingModel}
            model={showBookingModel}
          >
              <BookShowForm 
              done={() => {
                getShowDetail()
                setShowBookingModel(false)
              }}
              id={selected._id}
              {...show} {...selected}  />
          </Model>
        </div>
      )}
      {!!seates.length && 
      <Booking data={seates} onChange={(id) => selectItem(id)} />}
    </div>
  );
};
