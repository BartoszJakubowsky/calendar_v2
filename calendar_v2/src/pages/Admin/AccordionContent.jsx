import FormButton from '@/components/forms/FormButton';
import LoadingMessage from '@/components/ui/LoadingMessage';
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import {AnimatePresence} from 'framer-motion';
export default function AccordionContent({buttonAddText, buttonAddOnClick,buttonDeleteText, buttonDeleteOnClick, textOnTrue, textOnFalse, fetchData, result,children, loadingMessage}) {
    
    return (
        <div className='relative flex flex-row p-2 w-full h-full '>
          <div className='flex flex-col justify-start gap-2 items-end order-last md:w-full w-1/3 ml-2'>
          {buttonAddText && <FormButton 
          text={buttonAddText} 
          onClick={buttonAddOnClick}
          className='md:w-fit w-full flex !m-0 justify-center items-center'
          />}
          <FormButton 
          text={buttonDeleteText} 
          className='md:w-fit w-full button-form-reject !m-0 flex justify-center items-center '
          onClick={buttonDeleteOnClick}
          />
          </div>
          <div className='flex flex-col w-full shadow-md'>
        <AnimatePresence mode='wait'>
          {fetchData 
          && 
          <ApiMessage
          fetchData={fetchData}
          result={result}
          textOnTrue={textOnTrue}
          textOnFalse={textOnFalse}
          loadingMessage={loadingMessage}
          />
          }
          </AnimatePresence>
          <div className='dark:bg-dark-accentLight dark:shadow-xl'>
           {children}
           </div>
          </div>
        </div>
      )
};




function ApiMessage({result, textOnTrue, textOnFalse, loadingMessage}) {


    return (
        <AnimatedContainer className={'backdrop-blur-sm z-10 flex justify-center items-center'} animation={'opacityVariant'}>
            <div className='backdrop-blur-sm flex justify-center items-center'>
           { result === null? 
            <LoadingMessage message={loadingMessage} theme={'text-accentStrong dark:text-dark-accentStrong'} className={'w-fit h-fit'}/>
            :
            <AnimatedContainer className='flex justify-center items-center relative text-accentStrong dark:text-dark-accentStrong w-fit h-fit ' animation={'opacityVariant'}>   
                {result? textOnTrue : textOnFalse}
            </AnimatedContainer>}
            </div>
        </AnimatedContainer>
    )
};
