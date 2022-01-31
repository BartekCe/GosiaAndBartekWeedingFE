import React, {useEffect, useRef, useState} from "react";
import "./CountDownTimer.css"

const CountDownTimer = () => {

    const [timerDays, setTimerDays] = useState<number | string>('00')
    const [timerHours, setTimerHours] = useState<number | string>('00')
    const [timerMinutes, setTimerMinutes] = useState<number | string>('00')
    const [timerSeconds, setTimerSeconds] = useState<number | string>('00')

    let interval:any = useRef();

    const startTimer = () => {
        const countDownDate: number = new Date('July 09 2022 15:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date(Date.now()).getTime()
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
            const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)));
            const seconds = Math.floor((distance % (1000 * 60) / 1000));

            if (distance < 0) {
                clearInterval(interval.current)
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    })


    return (
            <div className="timer">
                <div>
                    <section>
                        <p>{timerDays}</p>
                        <p><small>Days</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerHours}</p>
                        <p><small>Hours</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerMinutes}</p>
                        <p><small>Minutes</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{timerSeconds}</p>
                        <p><small>Seconds</small></p>
                    </section>
                </div>
            </div>
    )
}

export default CountDownTimer;