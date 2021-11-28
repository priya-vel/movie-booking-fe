
import { FC } from 'react';
import style from './seat.module.scss';

interface SeatProps {
    name: string
    vip: boolean
    disabled: boolean
}

export const Seat: FC<SeatProps> = (props) => {
    return (
        <button className={style.seat} 
        title={!!props.disabled ? 'taken' : ''}
        disabled={props.disabled}>
            {props.name}
            {props.vip && <span className={style.vipSticker}>VIP</span>}
        </button>
    )
}