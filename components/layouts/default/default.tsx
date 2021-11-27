import { FC } from "react";
import { Header } from "../header/heaer";

export const DefaultLayout: FC = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};
