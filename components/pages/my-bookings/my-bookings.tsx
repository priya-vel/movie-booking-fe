import { useEffect, useState } from "react"
import { UserService } from "../../../services/user.service"
import { BookingCard, BookingCardProps } from "./booking-card/booking-card"
import style from './my-bookings.module.scss';

export const MyBookings = () => {
    const [booking, setBooking] = useState([] as BookingCardProps[])
    useEffect(() => {
        initData()
    }, [])
    const initData = () => {
        UserService.myBookings()
        .then(res => {
            setBooking(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className={`container ${style.myBookings}`}>
            <h1>My bookings</h1>
            <div style={{
                padding: "10px 0"
            }}>
                <b>Total: </b> <span>{booking.length}</span>
            </div>
            <div className={style.list}>
                {booking.map((el, i) => (
                    <BookingCard key={i} {...el} />
                ))}
            </div>
        </div>
    )
}