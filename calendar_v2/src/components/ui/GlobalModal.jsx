import Modal from './Modal';
import { ReactDOM } from 'react';
import { useEffect } from 'react';
export default function GlobalModal({...rest}) {
    

    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.getElementById('root').appendChild(modalContainer);

    useEffect(()=> {
        return () => {
            modalContainer.remove();
        }
    },[])


    
    const modal = (<Modal {...rest}/>);

    ReactDOM.render(modal, modalContainer);

    return false
};
