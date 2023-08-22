import { useRouter } from "next/router";
import { vote } from "../../service/kamui/contract";
import SmallCountdown from "../Countdown/SmallCountdown";
import { useEffect } from "react";
import dayjs from "dayjs";

export interface ProposalCard {
    proposalId: number,
    proposalBody: string,
    acceptCount: any,
    denyCount: any,
    creator: string,
    endTime: any,
    credentialHash: string
    status: string
}

const ProposalCard = (props: ProposalCard) => {
    // const router = useRouter();
    // function handleClick() {
    //     router.push({
    //         pathname: "/card",
    //         query: {
    //             proposalId: props.proposalId,
    //             proposalBody: props.proposalBody,
    //             acceptCount: props.acceptCount.toString(),
    //             denyCount: props.denyCount.toString(),
    //             creator: props.creator,
    //             endTime: props.endTime.toString(),
    //             credentialHash: props.credentialHash,
    //             status: props.status,
    //         },
    //     });
    // }

    function calPercentage(): number | string {
        if (props.denyCount._hex === "0x00" && props.acceptCount._hex === "0x00")
            return "no vote";
        if (props.acceptCount._hex === "0x00" || undefined) return 100;
        if (props.denyCount._hex === "0x00" || undefined) return 0;
        const result = roundToTwoDecimalPlaces(
            (Number(props.denyCount.toString()) /
                (Number(props.acceptCount.toString()) +
                    Number(props.denyCount.toString()))) *
            100
        );
        return result;
    }

    function roundToTwoDecimalPlaces(num: number): number {
        return Number(Number(num.toFixed(3)).toFixed(2));
    }

    function handleAccept(e: any) {
        vote(props.credentialHash, props.proposalId, true);
        e.stopPropagation();
    }

    function handleDeny(e: any) {
        vote(props.credentialHash, props.proposalId, false);
        e.stopPropagation();
    }

    return (
        <div
            className=" card dark:text-white dark:bg-slate-800 dark:border-white dark:border-solid dark:border-2 w-[350px] p-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-3 cursor-pointer text-[#2E1503] "
        >
            <div className="card-body">
                <div className="flex items-center mb-2">
                    <h2 className="card-title">{`VOTE # ${props.proposalId + 1}`}</h2>
                    {props.status === "Closed" ? (
                        <span className="ml-auto">Proposal Ended</span>
                    ) : (
                        <SmallCountdown endTime={props.endTime.toString()} />
                    )}
                </div>
                <p className="text-left mb-4">{props.proposalBody}</p>
                <div className="flex justify-between">
                    <p className="text-xs text-left font-bold">Yes</p>
                    <p className="text-xs text-right font-bold">{`${calPercentage() === "no vote" ? 0 : 100 - Number(calPercentage())}%`}</p>
                </div>
                <progress
                    className="progress progress-success w-auto dark:bg-slate-950"
                    value={calPercentage() === "no vote" ? 0 : 100 - Number(calPercentage())}
                    max="100"
                ></progress>
                <div className="flex justify-between">
                    <p className="text-xs text-left font-bold">No</p>
                    <p className="text-xs text-right font-bold">{`${calPercentage() === "no vote" ? 0 : calPercentage()}%`}</p>
                </div>
                <progress
                    className="progress progress-error w-auto dark:bg-slate-950 text-[#FF5E6C]"
                    value={calPercentage() === "no vote" ? 0 : calPercentage()}
                    max="100"
                ></progress>
                <div className="flex justify-between mt-7">
                    {props.status === "Closed" ? (
                        <>
                            <button
                                className="btn btn-outline btn-ghost w-20 border-2"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-outline btn-ghost w-20 border-2"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                Deny
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-outline btn-success w-20 border-2"
                                onClick={handleAccept}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-outline btn-error w-20 border-2"
                                onClick={handleDeny}
                            >
                                Deny
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProposalCard