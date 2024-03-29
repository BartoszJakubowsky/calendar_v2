
export default function FormContainer({children, ...rest}) {

    return (
        <div className={`w-11/12 md:w-[30rem] p-6 m-auto rounded-md shadow-md background ${rest.className}`}>
            {children}
        </div>
    )
}
