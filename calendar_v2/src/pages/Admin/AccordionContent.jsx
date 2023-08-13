import FormButton from '@/components/forms/FormButton';
import LoadingMessage from '@/components/ui/LoadingMessage';
import AnimatedContainer from '@/components/containers/AnimatedContainer';

export default function AccordionContent({buttonAddText, buttonAddOnClick,buttonDeleteText, buttonDeleteOnClick, fetchData, result,children}) {
    
    return (
        <div className='relative flex flex-row p-2 w-full h-full'>
          <div className='flex flex-col justify-end items-end order-last md:w-full w-1/3 ml-2'>
          <FormButton 
          text={buttonAddText} 
          onClick={buttonAddOnClick}
          className='md:w-fit w-full mb-2 mt-auto flex justify-center items-center'
          />
          <FormButton 
          text={buttonDeleteText} 
          className='md:w-fit w-full button-form-reject md:mb-3 mb-0 flex justify-center items-center '
          onClick={buttonDeleteOnClick}
          />
          </div>
          <div className='flex flex-col w-full shadow-md'>
          {fetchData 
          && 
          <ApiMessage
          fetchData={fetchData}
          result={result}
          textOnTrue={'Udało się'}
          textOnFalse={'Nie udało się'}
          removeOnTrue
          />
          }
           {children}
            </div>
        </div>
      )
};




function ApiMessage({fetchData, result, textOnTrue, textOnFalse, removeOnTrue = true}) {


    return (
        <AnimatedContainer className={'backdrop-blur-sm z-10 flex justify-center items-center'} animation={'opacityVariant'}>
           { fetchData? 
            <LoadingMessage message={'loading'} theme={'text-accentStrong'}/>
            :
            <AnimatedContainer className='flex text-accentStrong'>
                {result? textOnTrue : textOnFalse}
            </AnimatedContainer>}
        </AnimatedContainer>
    )
};
