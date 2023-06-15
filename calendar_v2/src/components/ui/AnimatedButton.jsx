/* eslint-disable no-unused-vars */
import Button from './Button';
import AnimatedContainer from '../containers/AnimatedContainer';
export default function AnimatedButton({animation, buttonClassName, text,...rest}) {

    <AnimatedContainer className={animation}> 
        <Button class={buttonClassName} onClick={resizeTo.onClick} text={text}/>
    </AnimatedContainer>
}
