import { useRouter } from "next/dist/client/router";
import { AuthGuard } from "../../../components/middlewares/authGuard";
import { Booking } from "../../../components/pages/booking/booking";
import { ShowDetail } from "../../../components/pages/show/show";

const ShowDetailsPage = () => {
  const router = useRouter();
  return (
    <div className={"container"}>
      <AuthGuard>
        <ShowDetail />
      </AuthGuard>
    </div>
  );
};

export default ShowDetailsPage;
