export default function Message({message, hide, ...rest}) {
    

    if (hide)
      return false
    
    const data = message.data;
    const date = message.date;
    const time = message.time;

    function isPastDate(dateToCheck) {
        const currentDate = new Date('2023-08-31T22:00:00.000Z');
        const inputDate = new Date(dateToCheck);
        if (time)
        {
            const [hours, minutes] = time.split(':');
            inputDate.inputDateTime.setUTCHours(hours, minutes, 0, 0);
        }

        return inputDate < currentDate;
      }

    if (data == '')
      return false

    const isPast = date && isPastDate(date);
    if (isPast)
      return false
    
    return (
        <div className={`${rest.className? rest.className : ''} z-[1] inset-0 absolute flex justify-center items-center bg-accentMedium dark:bg-dark-accentMedium dark:text-baseColor rounded-md border-2 border-accentStrong dark:border-dark-accentStrong`}>
            <p className={`${rest.className? '': 'sticky top-1/4 bottom-1/2 left-1/4 right-1/4 '} text-center`}>{data}</p>
        </div>
    )
      
     
    
  


}
