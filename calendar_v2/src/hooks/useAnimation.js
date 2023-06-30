
function useAnimation() {
    
    const opacityVariant = 
    {
        name: 'opacityVariant',
        initial: { opacity: 0},
        animate: { opacity: 1},
        transition : {duration:0.5, ease: 'easeOut'},
        exit: { opacity: 0},
    }

      
    const xSwipeVariant = 
    {
          name: 'xSwipeVariant',
          initial: { opacity: 0, x: -200, y: 0 },
          animate: { opacity: 1, x: 0, y: 0 },
          transition : {duration:0.5, ease: 'easeOut'},
          exit: { opacity: 0, x: 0, y: -100 },
    }
    const ySwipeVariant = 
    {
          name: 'ySwipeVariant',
          initial: { opacity: 0, x: 0, y: 200 },
          animate: { opacity: 1, x: 0, y: 0 },
          transition : {duration:0.5, ease: 'easeOut'},
          exit: { opacity: 0, x: 0, y: -100 },
    }

    const reverseCurtainVariant = 
    {
        name: 'reverseCurtainVariant',
        initial: { opacity: 0, x: 0, y: 100 },
        animate: { opacity: 1, x: 0, y: 0 },
        transition : {duration:0.5, ease: 'easeOut'},
        exit: { opacity: 1, x: 0, y: 0 },
    }

    const buttonMessageVariant = 
    {
        animatedButton:{
            hidden: { opacity: 1},
            enter: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: 0, y: -100 },
        }
    }

   
    return ([opacityVariant, xSwipeVariant, ySwipeVariant, reverseCurtainVariant ]);


}

export default useAnimation;