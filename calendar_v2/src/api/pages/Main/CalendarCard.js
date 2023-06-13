
import classNames from "classnames";

export default function CalendarCard({calendar, children, ...rest}) 
{
const CartCardClasses = classNames(rest.className,
    "relative m-2 box-content md:w-64 md:h-64 text-sm md:text-xl w-40 h-40 border-2 border-gray-800 flex hover:-translate-y-1 duration-300 backdrop-blur-sm text-2xl overflow-hidden bg-white"
);
    return <div
            {...rest} 
            className={` order-${calendar.order}  ${CartCardClasses} flex justify-center items-center cursor-pointer overflow-hidden`}
            >{children}
            </div>;

}
