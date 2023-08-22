export interface ProcessDialogProps {
    isOpen: boolean
    onClose: any
    title: any
    children: any
}
const ProcessDialog = ({...props}: ProcessDialogProps) => {
    if(!props.isOpen) return null
    
    return(
        <div className="fixed inset-0 flex flex-col items-center justify-center">
            <div className="rounded-lg bg-gradient-to-r from-[#42275a] to-[#734b6d] card p-4 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="flex flex-row mb-2 items-center">
                    <span className="font-mono text-black font-bold text-lg dark:text-white w-full">{props.title}</span>
                    <svg className="btn btn-sm btn-circle btn-ghost justify-center rounded-full w-8 h-6" onClick={()=>props.onClose()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                {props.children}
            </div>
        </div>
    )
}

export default ProcessDialog