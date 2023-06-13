import { useContext } from "react";
import SlotContext from "../context/slots";

function useSlots()
{
    return useContext(SlotContext);
}

export default useSlots;



