import moment from "moment";
import { FC } from "react";
import { ShowService } from "../../../services/shows.service";
import { Btn } from "../../ui/btn/btn";
import style from "./book-form.module.scss";

interface BookShowFormProps {
  bookingId: string;
  createdAt: string;
  seat: string;
  show: string;
  status: string;
  theater: string;
  type: string;
  user: string;
  _id: string;
}

export const BookShowForm: FC<BookShowFormProps | any> = (props) => {
  const dF = (d: string, f: any) => {
    return moment(d).format(f);
  };
  const onSubmit = () => {
    ShowService.booking(props.id)
    .then(res => {
        console.log(res);
        props.done()
    }).catch(err => {
      props.done()
        console.log(err);
    })
  }
  return (
    <form className={style.bookForm} onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
    }}>
      <hr />
      <table>
          <tbody>
              <tr>
                  <td>Name:</td>
                  <td>{props.name}</td>
              </tr>
              <tr>
                  <td>Date:</td>
                  <td>{dF(props.time, "DD, MMM YYYY")}</td>
              </tr>
              <tr>
                  <td>Time:</td>
                  <td>{dF(props.time, "hh:MM A")}</td>
              </tr>
              <tr>
                  <td>Type:</td>
                  <td>{props.type}</td>
              </tr>
              <tr>
                  <td>Seat:</td>
                  <td>{props.seat}</td>
              </tr>
          </tbody>
          </table>
      <div>
          <Btn block>Book Now</Btn>
      </div>
    </form>
  );
};
