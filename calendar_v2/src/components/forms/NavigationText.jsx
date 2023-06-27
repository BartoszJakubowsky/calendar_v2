export default function NavigationText({header, text, handleClick, className = 'flex flex-col items-center text-sm'}) {
    

    return (
        <div className={className}>
            {header? <p className=" pointer-events-none custom-text-baseColor ">{header}</p> : false}
            <button className="custom-text-accentStrong" onClick={handleClick}>{text}</button>
        </div>
    )
}
