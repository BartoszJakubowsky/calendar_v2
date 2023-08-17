export default function Message({message}) {
    
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
    
    const isPast = date && isPastDate(date);

    if (isPast)
      return false
    
    return (
        <div className="m-2 w-full h-full flex justify-center items-center bg-accentMedium dark:a rounded-md">
            {data}
        </div>
    )
      
     
    
  


}
