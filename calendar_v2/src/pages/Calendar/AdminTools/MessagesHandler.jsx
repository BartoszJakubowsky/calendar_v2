import LabelInput from '@/components/forms/LabelInput';
export default function MessagesHandler({messages, setMessages, boundaryArray, maxMessages, translate, ...rest}) {
    

    
    const updateMessages = (newMessage, index) => {
        const updatedMessages = messages.map((oldMessage, oldIndex)=>
        {
        if (oldIndex !== index)
            return oldMessage;
        
        return {newMessage}
        })

        setMessages(updatedMessages);
    }

    const handleAddMessage = () => {
        setMessages([...messages, {data: '', expires: '', from: false, to: false}])
    }

    const handleDeleteMessage = (indexToRemove) => {
        setMessages(messages.filter((message, messageIndex) => messageIndex !== indexToRemove))
    }

    console.log(messages);

   return (
    <div className={`${rest.className}`}>
        {messages.length > 0 && messages.map((message, index)=>
        {
            const handleDataChange = (newData) => {
                const newMessage = {...messages[index], data: newData};
                updateMessages(newMessage);
            }

            const handleDateChange = (newDate) => {
                const newMessage = {...messages[index], data: newDate};
                updateMessages(newMessage);
            }

            return (
                <div
                className='relative'
                key={index}
                >
                    <LabelInput
                    inputType={'textarea'}
                    value={message.data}
                    setValue={handleDataChange}
                    placeHolder={translate('monthMessagePlaceholder')}
                    />
                    <button 
                    onClick={()=>handleDeleteMessage(index)}  
                    className={`absolute right-1 top-1 button-form-reject w-6 h-6 rounded-sm text:dark-baseColor dark:text-baseColor`}>
                    -
                    </button>
                    <div className='flex'> 
                        <LabelInput inputType='date' inputClassName='w-full'/>
                        <LabelInput inputType='time' inputClassName='w-full'/>
                    </div>
                </div>
            )
        })}
        {maxMessages === messages.length ? 
        false
        :        
        <button onClick={handleAddMessage}  className={`option-on w-6 h-6 rounded-sm text:dark-baseColor dark:text-baseColor`}>
           +
        </button>
        }
    </div>
   )

}
