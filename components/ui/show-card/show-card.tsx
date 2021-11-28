import { FC } from "react";
import { EditIcon } from "../icon/edit";
import { StarIcon } from "../icon/star";
import Link from "next/link";
import style from "./show-card.module.scss";
import { AuthStore } from "../../../stores/auth";

interface ShowCardProps {
  _id: string;
  name: string;
  trailer: string;
  time: string;
  poster: string;
  theater: string;
  owner: string;
  banner: string;
}

export const ShowCard: FC<ShowCardProps> = (props) => {
  const auth = AuthStore.useContainer();
  return (
    <div className={style.showCard}>
      {auth.user && (
        <div
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <div style={{ flex: 1 }}></div>
          <button onClick={() => {}} className={style.editBtn}>
            <EditIcon />
          </button>
        </div>
      )}
      <Link href={`/shows/${props._id}`}>
        <a>
          <div
            style={{
              backgroundImage: `url("${props.banner}")`,
            }}
            className={style.banner}
          ></div>
        </a>
      </Link>
      <div className={style.text}>
        <h4>{props.name}</h4>
        <div className={style.ratingDiv}>
          <div className={style.rating}>Ratings</div>
          <div className={style.ratingCount}>
            {" "}
            <StarIcon /> 3.4{" "}
          </div>
        </div>
        <hr />
        <div className={style.description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus,
          possimus? Provident exercitationem itaque doloremque harum, explicabo
          placeat reiciendis ipsam accusamus.
        </div>
      </div>
    </div>
  );
};
