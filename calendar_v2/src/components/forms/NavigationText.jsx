export default function NavigationText({header, text, handleClick, className = 'flex flex-col items-center text-sm'}) {
    

    return (
        <div className={className}>
            {header? <p className=" pointer-events-none">{header}</p> : false}
            <button className=" button-navigation-text" onClick={handleClick}>{text}</button>
        </div>
    )
}
