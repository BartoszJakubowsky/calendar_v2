import Button from '../ui/Button'
export default function FormButton({text, ...rest}) 
{

    return (
    <Button 
        className={'w-full px-4 py-2 mb-10 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'} 
        onClick={rest.onClick}
        text={text}
        />
    );
}
