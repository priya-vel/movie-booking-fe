
import { FC } from 'react';
import style from './seat.module.scss';

interface SeatProps {
    _id: string
    name: string
    vip: boolean
    disabled: boolean
    status: string
    onClick?: (val: any) => void
}

export const Seat: FC<SeatProps> = (props) => {
    return (
        <button
        onClick={() => !!props.onClick ? props.onClick(props._id) : ""} 
        className={`${style.seat} ${props.status == "booked" && style['seat--booked']}`} 
        title={!!props.disabled ? 'taken' : ''}
        disabled={props.disabled}>
            {props.status == "booked" && <span className={style.booked}>booked</span>}
            {props.name}
            {props.vip && <span className={style.vipSticker}>VIP</span>}
        </button>
    )
}