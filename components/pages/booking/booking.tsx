import style from "./booking.module.scss";
import { Seat } from "./seat/seat";
import { FC } from "react";

interface BookingProps {
  data: any[]
  onChange?: (val: any) => void
}

export const Booking: FC<BookingProps> = (props) => {
  return (
    <div className={style.booking}>
      <div className={style.theater}>
        {props.data.map((el, i) => (
          <Seat 
          onClick={(val: any) => !!props.onChange ? props.onChange(val) : ""}
          _id={el._id}
          status={el.status}
          disabled={i%2 != 0 || el.status == "booked"}
          vip={el.type == "VIP"} name={el.seat} key={i} />
        ))}
      </div>
    </div>
  );
};
