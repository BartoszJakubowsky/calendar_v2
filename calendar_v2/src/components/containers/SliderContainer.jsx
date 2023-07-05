
export default function SliderContainer({direction = 'right', isOpen = false, children ,...rest}) {
 
    const sliderClassName = direction === 'right' ? 
    `${isOpen? 'translate-x-0' : 'translate-x-full'}`  
    :
    `${isOpen? 'translate-x-0' : '-translate-x-full'}`

    return (
        <div className={`absolute inset-0 transition-all duration-200 ease-out ${sliderClassName} ${rest.className}`}>
            {children}
        </div>
    )
}
