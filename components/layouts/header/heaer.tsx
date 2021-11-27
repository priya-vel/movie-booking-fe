import { FC } from "react";
import style from "./header.module.scss";
import Link from "next/link";
import { AuthStore } from "../../../stores/auth";

export const Header: FC = () => {
  const links = [
    { label: "home", path: "/" },
    { label: "Theater", path: "/theater/" },
  ];
  const auth = AuthStore.useContainer();
  return (
    <header className={style.header}>
      <Link href={"/"}>
        <img
          src="https://media.glassdoor.com/sqll/809791/bookmyshow-squarelogo-1426681832545.png"
          alt=""
        />
      </Link>
      <h1>
        <Link href={"/"}>My Show</Link>
      </h1>
      <nav>
        <ul>
          {links.map((el, i) => (
            <li key={i}>
              <Link href={el.path}>
                <a>{el.label}</a>
              </Link>
            </li>
          ))}
          {!!auth.user && <li >
            <Link href={'/my-shows'}>
              <a>My Bookings</a>
            </Link>
          </li> }

          {!!auth.user ? (
            <li>
              <button onClick={auth.logout} className={style.logout}>
                logout
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
};
