import {motion as m} from 'framer-motion';
export default function Background() 
{
    return (
        <m.section className="spikes" initial={{y: '-100%'}} animate={{y: "0%", transition: { duration: 0.3 }}} exit={{y: "-100%", transition: { duration: 0.5 }}} ></m.section>
    )
}