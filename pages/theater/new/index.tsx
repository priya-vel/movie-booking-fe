import React from "react";
import {
  AuthGuard,
  AuthLevel,
} from "../../../components/middlewares/authGuard";

const NewTheater = () => {
  return (
    <div className="container">
      <AuthGuard>
        <AuthLevel type={["owner"]}>
          <h1>New Theater</h1>
        </AuthLevel>
      </AuthGuard>
    </div>
  );
};

export default NewTheater;
