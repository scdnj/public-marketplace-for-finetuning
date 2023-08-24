import { createProposal } from '../../service/kamui/contract'
import { useState } from 'react';
import { DateTimePicker } from "@mui/x-date-pickers";
import { sleep } from 'helper'
import ProcessLoading from '../../components/Loading/ProcessLoading'

export interface CreateProposalProps {
    onClose: any
}

const CreateProposal = ({ onClose }: CreateProposalProps) => {
    const [open, setOpen] = useState(false);
    const [endTime, setEndTime] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setFinished] = useState(false)

    const handleEndTimeChange = (event: any) => {
        const datetime = new Date(event)
        const currentTime = new Date();
        const timestamp = Math.floor((datetime.getTime() - currentTime.getTime()) / 1000);
        setEndTime(timestamp);
    };

    const handleCreate = async () => {
        setIsLoading(true)
        await createProposal(content, endTime)
        // await sleep(2000)
        setIsLoading(false)
        setFinished(true)
    }

    return (
        <div className='flex flex-col space-y-4 items-center'>
            {isFinished
                ? <div className='flex flex-col w-[200px] items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-24 h-24 mb-4">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <div className="btn" onClick={onClose} >OK</div>
                </div>
                : <>
                    <DateTimePicker
                        label="End Time"
                        className="z-50 mt-5 bg-base-100"
                        onChange={handleEndTimeChange}
                        sx={{
                            width: "100%",
                            "& input": { color: "#A6ADBA" },
                            /* Change the border color of the outlined input */
                            ".MuiOutlinedInput-root.MuiInputBase-formControl .MuiOutlinedInput-notchedOutline": {
                                borderColor: "transparent" /* Replace with your desired border color */
                            },

                            /* Change the label color */
                            ".MuiInputLabel-root.MuiInputLabel-formControl": {
                                color: "#A6ADBA"/* Replace with your desired label color */
                            },

                            ".MuiSvgIcon-root": {
                                fill: "#A6ADBA"
                            }

                        }}
                    />
                    <input type="text" placeholder="Content" className="input input-bordered w-[350px] max-w-xs" onChange={(e) => setContent(e.target.value)} />
                    {
                        isLoading
                        ? <ProcessLoading />
                        : <div className="btn" onClick={handleCreate}>Create</div>
                    }
                </>
            }
        </div>
    )

}

export default CreateProposal