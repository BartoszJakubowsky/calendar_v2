export default function CalendarCard({calendar}) {

    return (
        <div className=" w-40 h-64 rounded-md border border-accentMediumStrong select-none m-2 transition-all active:scale-110 hover:scale-105 hover:shadow-bottom-right duration-200 ease-in-out hover:shadow-accentLight cursor-pointer">
            <h3 className="w-full h-16 pt-4 text-baseColor text-sm font-semibold rounded-t-md  bg-accentMediumStrong text-center ">
                {calendar.name}
            </h3>
            <section className="text-custom-text-baseColor break-words text-sm p-2">
                {calendar.description}
            </section>
        </div>
    )
}
    