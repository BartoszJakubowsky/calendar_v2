import AnimatedContainer from '@/components/containers/AnimatedContainer'

export default function InfoModal({headerText, contentText}) {
    
    return (
        <AnimatedContainer 
        className='relative mt-20'
        animation='ySwipeVariant'
        transition={{delay: 0.5, duration: 0.5, ease: "easeOut"}}>
        <div className=' w-80 h-64 bg-accentLight dark:bg-dark-accentLight shadow-lg text-center p-2'>
            <h3 className='text-xl text-accentStrong dark:text-dark-accentStrong p-2'>
                {headerText}
            </h3>
            {contentText}
        </div>
    </AnimatedContainer>
    )
}
