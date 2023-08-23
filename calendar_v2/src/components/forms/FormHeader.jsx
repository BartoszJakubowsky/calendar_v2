export default function FormHeader({text}) {
    return (
        <h1 className="md:text-3xl text-2xl font-semibold text-center text-form-accent underline custom-text-accentStrong pointer-events-none">
            {text}
        </h1>
    )
}
