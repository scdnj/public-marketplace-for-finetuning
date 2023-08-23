import VoteProposal from '../../components/Contract/VoteProposal'
import ProcessDialog from '../../components/Dialog/ProcessDialog'

import { vote } from "../../service/kamui/contract";
import SmallCountdown from "../Countdown/SmallCountdown";
import { useState, useEffect } from "react";
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
    setIsLoading: any
}

const ProposalCard = (props: ProposalCard) => {
    const [isVotingDialogOpen, setIsVotingDialogOpen] = useState(false)

    function calPercentage(): number | string {
        if (props.denyCount === 0 && props.acceptCount === 0)
            return "no vote";
        if (props.acceptCount === 0 || undefined) return 100;
        if (props.denyCount === 0 || undefined) return 0;
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

    const handleVoteClick = () => {
        setIsVotingDialogOpen(true)
    }

    return (
        <div
            className=" card text-white bg-base-100 border-white border-solid border-2 w-[300px] p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mt-3 cursor-pointer "
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
                    className="progress progress-success w-auto bg-slate-950"
                    value={calPercentage() === "no vote" ? 0 : 100 - Number(calPercentage())}
                    max="100"
                ></progress>
                <div className="flex justify-between">
                    <p className="text-xs text-left font-bold">No</p>
                    <p className="text-xs text-right font-bold">{`${calPercentage() === "no vote" ? 0 : calPercentage()}%`}</p>
                </div>
                <progress
                    className="progress progress-error w-auto bg-slate-950 text-[#FF5E6C]"
                    value={calPercentage() === "no vote" ? 0 : calPercentage()}
                    max="100"
                ></progress>
                <div className="flex justify-center mt-7">
                    {props.status === "Closed" ? (
                        <>
                            <button className="btn btn-outline btn-ghost w-20 border-2"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                Vote
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-outline btn-info w-20 border-2"
                                onClick={handleVoteClick}
                            >
                                Vote
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ProcessDialog
                isOpen={isVotingDialogOpen}
                onClose={() => setIsVotingDialogOpen(false)}
                title={props.proposalBody}
            >
                <VoteProposal setIsLoading={props.setIsLoading} proposalId={props.proposalId} onClose={() => setIsVotingDialogOpen(false)} />
            </ProcessDialog>
        </div>
    );
}

export default ProposalCard