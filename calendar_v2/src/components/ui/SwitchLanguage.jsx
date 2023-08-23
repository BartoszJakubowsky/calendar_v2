import i18next from 'i18next';
import Flag_PL from '../../assets/flags/pl.svg'
import Flag_RU from '../../assets/flags/ru.svg'
import Flag_ENG from '../../assets/flags/gb-eng.svg'
import useAuthentication from '@/hooks/useAuthentication';
export default function SwitchLanguage({...rest}) {
    

    const {language, getLanguageFromUser} = useAuthentication();
    const handleClick = (lng) => {
    
    if (lng == language)
        return;

        i18next.changeLanguage(lng, (err, t) => {
            if (err) return console.log('something went wrong while changing language', err);

            t();
            getLanguageFromUser(lng);
          });
    }

    const options = [
        {lng: 'pl', img: Flag_PL, alt: "Polish flag"},
        {lng: 'ru', img: Flag_RU, alt: "Russian flag"},
        {lng: 'en', img: Flag_ENG, alt: "English flag"}
    ]
    return (
        <ul className={`${rest.className} bg-accentLight dark:bg-dark-accentLight background-border border-2 rounded-2xl h-8 p-2 flex`}>
            <li className='flex gap-2 justify-center items-center'>
                {options.map(option => {
                    const {lng, img, alt} = option;

                    return (
                        <button onClick={() => handleClick(lng)} key={lng} className={`h-6 w-6  hover:opacity-100 active:scale-110 transition-all duration-200 ${language == lng? 'opacity-100' : 'opacity-50'}`}>
                            <img className={` rounded-full w-full h-full ${language == lng? 'border-2 border-accentMedium  dark:border-dark-accentStrong' : ''}`} src={img} alt={alt} />
                        </button>
                    )
                })}
            </li>
        </ul>
    )
}
