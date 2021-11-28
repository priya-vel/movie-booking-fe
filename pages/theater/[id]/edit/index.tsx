import React from "react";
import {
  AuthGuard,
  AuthLevel,
} from "../../../../components/middlewares/authGuard";
import { EditTheater } from "../../../../components/pages/theater/edit-theater/edit-theater";

const EditTheaterPage = () => {
  return (
    <div className={"container"}>
      <AuthGuard>
        <AuthLevel type={["owner"]}>
          <EditTheater />
        </AuthLevel>
      </AuthGuard>
    </div>
  );
};

export default EditTheaterPage;
