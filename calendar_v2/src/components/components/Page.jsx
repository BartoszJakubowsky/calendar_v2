/* eslint-disable react/prop-types */

import {motion as m} from 'framer-motion';
import useAnimation from '../../hooks/useAnimation';


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
export default function Page({animation, basicClassName, children, ...rest}) 
{
    const allAnimations = useAnimation();

    const animateVariants = () => 
    {
        return allAnimations.find(searchedAnimation => searchedAnimation.name === animation);
    }

    return (
        <m.div className={`${basicClassName? basicClassName : 'absolute inset-0'} ${rest.className}`}
        variants={animateVariants()} 
        initial='initial' 
        animate='animate' 
        transition='transition' 
        exit='exit'>
        {children}
        </m.div>
    )
}
