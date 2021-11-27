import { AuthGuard, AuthLevel } from "../../components/middlewares/authGuard";
import { Theater } from "../../components/pages/theater/theater";

const TheaterPage = () => {
  return (
    <AuthGuard>
      <Theater />
    </AuthGuard>
  );
};

export default TheaterPage;
