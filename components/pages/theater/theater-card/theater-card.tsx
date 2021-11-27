import { FC } from "react";
import style from "./theater-card.module.scss";
import Link from 'next/link';

interface TheaterCardProps {
    name?: string
    to: string
}

export const TheaterCard: FC<TheaterCardProps> = (props) => {
  return <Link href={props.to}>
  <div className={style.theaterCard}>
    <span>{!!props.children ? props.children : props.name}</span>
  </div>
  </Link>;
};
