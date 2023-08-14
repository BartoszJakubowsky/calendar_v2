export default function Ping() {
    return (
        <span className="absolute top-0 -right-1 flex ">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full dark:bg-dark-accentStrong bg-accentStrong opacity-75"/>
            <span className="relative inline-flex rounded-full h-2 w-2 dark:bg-dark-accentStrongHover bg-accentStrongHover"/>
        </span>
    );
}
