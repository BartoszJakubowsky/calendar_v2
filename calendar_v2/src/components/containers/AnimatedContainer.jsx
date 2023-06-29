/* eslint-disable react/prop-types */

import {motion as m} from 'framer-motion';
import useAnimation from '@/hooks/useAnimation';


/**
 * Highly customizable carousel 
 * @example
 * const animation = 'opacityVariant'
 * //basicClassName changes default size of the page
 * basicClassName = 'w-10 h-10'
 * 
 * //default component
 * return (
 *   <Page 
 *      className='absolute inset-0'
 *      animation = {swipeFromLeftToUpVariant}
 *    >
 *      {children}
 *  </Page>
 * )
 */
export default function AnimatedContainer({animation, children, initial, animate, transition, exit, ...rest}) 
{
    const allAnimations = useAnimation();

    const animateVariants = () => 
    {
        return allAnimations.find(searchedAnimation => searchedAnimation.name === animation);
    }

    return (
        <m.div className={`${'absolute inset-0'} ${rest.className? rest.className : ''}`}
        variants={animateVariants()} 
        initial={initial? initial : 'initial' }
        animate={animate? animate : 'animate'}
        transition={transition? transition : 'transition'}
        exit={exit? exit: 'exit'}>
        {children}
        </m.div>
    )
}
