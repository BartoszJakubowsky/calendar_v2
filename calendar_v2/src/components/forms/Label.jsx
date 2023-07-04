export default function Label({error, text, labelColor = 'custom-text-baseColor duration-300'}) {
    
    return (
        <label className={`block text-sm font-semibold ${error? 'valid text-red-300 duration-75' : labelColor} `}>
            {text}
        </label>
    )
}
