export default function Background({bg = 'base' , children}) {
    
    
    return (
        <div className={`inset-0 absolute bg-white dark:bg-dark-white ${bg}` }>
            {children}
        </div>
    )
}
