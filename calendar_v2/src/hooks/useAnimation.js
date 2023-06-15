
function useAnimation() {
    
    const opacityVariant = 
    {
        name: 'opacityVariant',
        initial: { opacity: 0},
        animate: { opacity: 1},
        transition : {duration:0.5, ease: 'easeOut'},
        exit: { opacity: 0},
    }
    const swipeVariant = 
    {
          hidden: { opacity: 0, x: -200, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: -100 },
    }

    const buttonMessageVariant = 
    {
        animatedButton:{
            hidden: { opacity: 1},
            enter: { opacity: 1, x: 0, y: 0 },
            exit: { opacity: 0, x: 0, y: -100 },
        }
    }

    return ([opacityVariant, swipeVariant]);


}

export default useAnimation;