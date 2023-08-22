
import {translateMenu} from "@/locales/translate";

export default function Section({header, links}) {


    const hClassName = "mt-10 text-xl font-semibold custom-text-baseColor border-b-4 border-baseColor dark:border-dark-baseColor mb-4 cursor-default";

    return(
        <div className=" overflow-x-hidden">
        {header? <h3 className={hClassName}>{translateMenu(header)}</h3> : false}
            <ul className=" ">
                {links}
            </ul>
        </div>
    );
}
