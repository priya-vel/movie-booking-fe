import { useRouter } from "next/dist/client/router";
import React from "react";
import { TheaterForm } from "../../../components/forms/theater-form/theater-form";
import {
  AuthGuard,
  AuthLevel,
} from "../../../components/middlewares/authGuard";

const NewTheater = () => {
  const router = useRouter();
  return (
    <div className="container">
      <AuthGuard>
        <AuthLevel type={["owner"]}>
          <h1>New Theater</h1>
          <TheaterForm type="new" updated={() => {
            router.push("/theater")
          }} />
        </AuthLevel>
      </AuthGuard>
    </div>
  );
};

export default NewTheater;
