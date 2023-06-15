/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

/**
 * ClassNames for button
 * @example
 * const class = formClassName | ;

 */

export default function Button({text, ...rest}) {

    return (
        <button className={rest.className} onClick={rest.onClick}>
            {text}
        </button>
    )

}
