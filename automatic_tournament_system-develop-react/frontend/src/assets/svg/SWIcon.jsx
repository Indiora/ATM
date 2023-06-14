import React from "react";
import classes from './Svg.module.css';


function SWIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            className={classes.my_svg}
            viewBox="0 0 32 32"
        >
            <path d="M29.723 10.691l.77-.771-6.823-6.823-.77.77 1.849 2.994-1.593 1.593 1.291 1.291-2.045-.537-.687.687 1.313 1.313-2.08-.546-.674.674 1.334 1.335-2.114-.555-3.551 3.551-8.824-8.824 1.867-2.976-.77-.77L1.393 9.92l.77.771 2.994-1.849 1.475 1.475 1.31-1.31-.544 2.075.676.676 1.332-1.332-.554 2.11.663.663 1.354-1.353-.563 2.144 3.657 3.657L5.49 26.12l-1.345 3.332L7.471 28.1l8.473-8.473 8.474 8.474 3.332 1.345-1.352-3.326-8.474-8.474 8.824-8.824z"></path>
        </svg>
    );
  }
  
  export default SWIcon;