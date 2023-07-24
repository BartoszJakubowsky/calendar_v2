import { useState } from "react";

export default function Accordion({ initial = false, label, children, labelClassName, contentClassName }) {
  const [expanded, setExpanded] = useState(initial);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div >
      <h4 className={`${labelClassName} `}  onClick={handleClick}>
        {label}
      </h4>
      {expanded? <div
        className={`text-sm component h-fit transition-height duration-500 ease-in-out overflow-hidden ${contentClassName}`}
      >
        {children}
      </div> : false}
    </div>
  );
}

// import { useState, useRef, useEffect } from "react";

// export default function Accordion({ label, content, labelClassName, contentClassName }) {
//   const [expanded, setExpanded] = useState(false);
//   const [contentHeight, setContentHeight] = useState(0);
//   const contentRef = useRef();

//   useEffect(() => {
//     if (expanded) {
//       setContentHeight(contentRef.current.scrollHeight);
//     }
//   }, [expanded]);

//   const handleClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className={`${contentClassName}`}>
//       <h4 className={`${labelClassName} `}  onClick={handleClick}>
//         {label}
//       </h4>
//       <div
//         className={`component ${expanded ? "h-fit" : "h-0"} transition-height duration-500 ease-in-out overflow-hidden`}
//         style={{ height: expanded ? contentHeight : 0 }}
//         ref={contentRef}
//       >
//         {content}
//       </div>
//     </div>
//   );
// }