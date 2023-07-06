import Button from '@/components/ui/Button'
export default function FormButton({text, ok='button-form-approve',...rest}) 
{

    return (
    <Button 
        className={`w-full px-4 py-2 mb-10 tracking-wide rounded-md ${ok} ${rest.className}`} 
        onClick={rest.onClick}
        text={text}
        />
    );
}
