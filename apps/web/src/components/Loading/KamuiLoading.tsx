import Image from 'next/image'


const KamuiLoading = (() => {

    return (
        <div className='flex flex-col items-center justify-center space-y-4'>
            <Image src="/tobi/Kamui.svg" alt='Sharingan' className='w-40 h-40 animate-spin' width={500} height={500} />
        </div>
    )

})
export default KamuiLoading