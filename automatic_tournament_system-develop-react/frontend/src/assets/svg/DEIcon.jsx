import React from "react";
import classes from './Svg.module.css';


function DEIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            className={classes.my_svg}
            viewBox="0 0 32 32"
        >
            <path d="M.545 3.105zm15.26 12.06l3.865 3.865 3.891 3.839 3.813 3.865 3.863 3.812v-4.548L13.314 8.075l2.66-2.66-1.726-1.726L9.937 8a15.13 15.13 0 01-3.825-2.774A14.633 14.633 0 013.007.645C1.777 1.015.943 1.819.546 3.106c3.101 1.327 5.817 3.902 7.357 6.93l-4.212 4.212 1.726 1.726 2.687-2.687 17.595 17.595h1.73l-.286-.05-.593-3.273-3.272-.593-.567-3.247-3.273-.593-.593-3.272-3.273-.593-.592-3.273-3.247-.567-.773-4.278 1.134.206-.026.026 3.736 3.788z"></path>
        </svg>
    );
  }
  
  export default DEIcon;