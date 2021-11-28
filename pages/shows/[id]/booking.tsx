import { useRouter } from "next/dist/client/router";
import { Booking } from "../../../components/pages/booking/booking";

const BookingPage = () => {
    const router = useRouter()
    return (
        <div className="container">
            <h1>Booking {router.query.id}</h1>
            {/* <Booking /> */}
        </div>
    )
}

export default BookingPage;
