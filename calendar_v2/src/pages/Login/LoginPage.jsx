/* eslint-disable react/jsx-key */

import { useState } from "react";
import Carousel from "../../components/components/Carousel";
import Page from "../../components/components/Page";

export default function LoginPage() 
{
    const [swipe, setSwipe] = useState(0);
    const toShow = [<div>siema</div>, <div>hej</div>, <div>elo</div>]
    const handleClick = () => 
    {
      setSwipe(1)
    }



    return (
      <Page animation={'opacityVariant'}>
        <Carousel 
          className='absolute inset-0 bg-blue-300'
          startPosition={0}
          const pages = {toShow}
          swipeToIndex={swipe}
        />
      <button onClick={handleClick}>click</button>
      </Page>
    );
}
