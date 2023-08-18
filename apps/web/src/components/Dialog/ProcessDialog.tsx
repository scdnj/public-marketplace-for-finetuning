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
        <div className="rounded-lg backdrop:blur-sm bg-gradient-to-r from-[#42275a] to-[#734b6d] card p-4 text-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="flex flex-row mb-2">
                <span className="font-mono text-black font-bold text-lg dark:text-white w-full">{props.title}</span>
                <button className="btn btn-sm btn-circle btn-ghost justify-center place-self-center" onClick={()=>props.onClose()}>X</button>
            </div>
            {props.children}
        </div>
    </div>
    )
}

export default ProcessDialog