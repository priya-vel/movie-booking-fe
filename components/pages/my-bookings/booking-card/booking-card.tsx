import moment from "moment";
import { useRouter } from "next/dist/client/router";
import { FC } from "react";
import { Btn } from "../../../ui/btn/btn";
import style from "./booking-card.module.scss";

export interface BookingCardProps {
  bookingId: string;
  createdAt: string;
  seat: string;
  show: {
    banner: string;
    createdAt: string;
    name: string;
    theater: string;
    time: string;
    trailer: string;
    updatedAt: string;
    _id: string;
  }[];
  status: string;
  theater: {
    createdAt: string;
    name: string;
    owner: string;
    shows: [];
    updatedAt: string;
    _id: string;
  }[];
  type: string;
  updatedAt: string;
  user: string;
  _id: string;
}

export const BookingCard: FC<BookingCardProps> = (props) => {
  const ft = (f: string) => moment(props.show[0].time).format(f);
  const router = useRouter()
  return (
    <div className={style.bookingCard}>
      <img height="100" width="100" src={props.show[0].banner} alt="" />
      <div className={style.text}>
        <div className={style.name}>Theater: {props.theater[0].name}</div>
        <div className={style.name}>Name: {props.show[0].name}</div>
        <div className={style.name}>Date: {ft("DD, MMM YYYY")}</div>
        <div className={style.name}>Time: {ft("h:MM A")}</div>
        <div className={style.name}>Seat: {props.seat} </div>
        <Btn onClick={() => router.push({
          pathname: "/shows/[id]",
          query: {
            id: props.show[0]._id
          }
        })}>VIEW</Btn>
      </div>
    </div>
  );
};
