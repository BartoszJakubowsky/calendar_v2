export default function Background({bg = 'base' , children}) {
    
    
    return (
        <div className={`inset-0 -z-10 absolute bg-white dark:bg-dark-white ${bg}` }>
            {children}
        </div>
    )
}
