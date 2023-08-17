import LabelInput from '@/components/forms/LabelInput';
export default function MessagesHandler({messages, setMessages, boundaryArray, maxMessages, translate, ...rest}) {
    
    const updateMessages = (newMessage, index) => {
        const updatedMessages = messages.map((oldMessage, oldIndex)=>
        {
        if (oldIndex !== index)
            return oldMessage;
        
        return newMessage
        })
        setMessages(updatedMessages);
    }
    const handleAddMessage = () => {
        const newMessage = {data: '', expires: {date: '', time: ''}, from: boundaryArray? 0 : false, to: boundaryArray?  boundaryArray.length-1 : false}
        if (messages.length === 0)
            setMessages([newMessage])
        else
            setMessages([...messages, newMessage])
    }

    const handleDeleteMessage = (indexToRemove) => {
        setMessages(messages.filter((message, messageIndex) => messageIndex !== indexToRemove))
    }

   return (
    <div className={`${rest.className}`}>
        {messages.length > 0 && messages.map((message, index)=>
        {
            const handleDataChange = (newData) => {
                const newMessage = {...message, data: newData};
                updateMessages(newMessage, index);
            }

            const handleDateChange = (newDate) => {
                const newMessage = { ...message, expires: { ...message.expires, date: newDate } };
                updateMessages(newMessage, index);
            }

            const handleTimeChange = (newTime) => {
                const newMessage = { ...message, expires: { ...message.expires, time: newTime } };
                updateMessages(newMessage, index);
            }

            const handleFromChange = (newFrom) => {
                const newFromIndex = boundaryArray.indexOf(newFrom);
                const newMessage = { ...message, from: newFromIndex};
                updateMessages(newMessage, index);
            }

            const handleToChange = (newTo) => {
                const newToIndex = boundaryArray.indexOf(newTo);
                const newMessage = { ...message, to: newToIndex};
                updateMessages(newMessage, index);
            }
            return (
                <div
                className='flex w-full flex-row'
                key={index}>
                    <div className='relative w-2/3  mr-2 mb-2'>
                        <LabelInput
                        inputType={'textarea'}
                        inputContainerClassName='w-full h-full relative min-w-[full]'
                        inputClassName='h-full'
                        value={message.data}
                        setValue={handleDataChange}
                        placeHolder={translate('monthMessagePlaceholder')}
                        />
                        <button 
                        onClick={()=>handleDeleteMessage(index)}  
                        className={`flex justify-center absolute right-1 top-3 button-form-reject w-6 h-6 rounded-sm text:dark-baseColor dark:text-baseColor`}>
                        -
                        </button>
                    </div>
                    <div className='flex flex-col w-1/3'> 
                        <LabelInput 
                        inputType='date' 
                        inputClassName='w-full'
                        value={message.expires.date}
                        setValue={handleDateChange}
                        />
                        <LabelInput 
                        inputType='time' 
                        inputClassName='w-full'
                        value={message.expires.time}
                        setValue={handleTimeChange}
                        />
                        {boundaryArray ? 
                        <div className='flex w-full h-10'>
                            <LabelInput 
                            inputType='list' 
                            inputContainerClassName='mr-1'
                            valueList={boundaryArray}
                            value={0}
                            setValue={handleFromChange} />
                             <LabelInput 
                            inputType='list' 
                            inputContainerClassName='ml-1'
                            valueList={boundaryArray}
                            value={boundaryArray.length-1}
                            setValue={handleToChange} />
                        </div> 
                        : false}
                    </div>
                </div>
            )
        })}
        {maxMessages === messages.length ? 
        false
        :        
        <button onClick={handleAddMessage}  className={`mt-1 option-on w-6 h-6 rounded-sm text:dark-baseColor dark:text-baseColor`}>
           +
        </button>
        }
    </div>
   )

}
