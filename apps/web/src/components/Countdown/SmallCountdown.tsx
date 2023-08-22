import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function SmallCountdown(props: any) {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

    useEffect(() => {
        // const target = new Date("8/10/2023 20:00:00");

        const target = new Date(dayjs.unix(props.endTime).format("MM/DD/YYYY HH:mm:ss"));
        const interval = setInterval(() => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            const day = Math.floor(difference / (1000 * 60 * 60 * 24));
            setDays(day);

            const hour = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            setHours(hour);

            const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMins(min);

            const sec = Math.floor((difference % (1000 * 60)) / 1000);
            setSecs(sec);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <span className="countdown font-mono text-base ml-auto">
            <span style={{ "--value": days } as any}></span>d
            <span style={{ "--value": hours } as any} className="ml-1"></span>h
            <span style={{ "--value": mins } as any} className="ml-1"></span>m
            <span style={{ "--value": secs } as any} className="ml-1"></span>s
        </span>
    );
}
