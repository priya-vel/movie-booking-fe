import { TheaterForm } from "../../../components/forms/theater-form/theater-form";
import { EditIcon } from "../../../components/ui/icon/edit";
import { AuthStore } from "../../../stores/auth";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { TheaterDetail } from "../../../components/pages/theater/theeater-detail/theater-detail";
import { AuthGuard } from "../../../components/middlewares/authGuard";

const ViewTheater = () => {
  return (
    <div className={"container"}>
      <AuthGuard>
        <TheaterDetail />
      </AuthGuard>
    </div>
  );
};

export default ViewTheater;
