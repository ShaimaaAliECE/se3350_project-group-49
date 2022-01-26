import { useEffect, useState } from "react"

export const Timer = () => {
    const [time, setTime] = useState(0);

    const tick = () => {
        setTime(time+1);
    }

    const displayTime = () => {
        let minutes = Math.floor((time/60)).toString().padStart(2,"0");
        let seconds = Math.floor((time%60)).toString().padStart(2,"0");
        return (
            <label className="timer">{minutes}:{seconds}</label>
        );
    }

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    }, [time])

    return displayTime();
}