import Button from '@/components/ui/Button'
export default function FormButton({text, ...rest}) 
{

    return (
    <Button 
        className={'w-full px-4 py-2 mb-10 tracking-wide button-form-ok'} 
        onClick={rest.onClick}
        text={text}
        />
    );
}
