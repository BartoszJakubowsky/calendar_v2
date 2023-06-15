/* eslint-disable react/prop-types */
import AnimatedContainer from '../containers/AnimatedContainer';

export default function AnimatedText({animation, text,...rest}) {
    
    return (
        <AnimatedContainer animation={animation} className={rest.className}> 
            {text}
        </AnimatedContainer>
    )
}
