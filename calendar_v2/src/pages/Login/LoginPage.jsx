
import { useState } from "react";
import Carousel from "../../components/containers/Carousel";
import AnimatedContainer from "../../components/containers/AnimatedContainer";
import LoginForm from "./LoginForm";

export default function LoginPage() 
{
    const [swipe, setSwipe] = useState(0);
    const [mail, setMail] = useState('');


    const forms = [
      <LoginForm key='login' mail={mail} setMail={setMail} setSwipe={setSwipe}/>
    ]

    return (
      <AnimatedContainer animation={'opacityVariant'}>
        <Carousel 
          className='w-full h-full bg-indigo-100 dark:bg-slate-400'
          startPosition={0}
          pages = {forms}
          swipeToIndex={swipe}
        />
      </AnimatedContainer>
    );
}
