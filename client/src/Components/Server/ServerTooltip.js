import React from "react";
import "../../Styles/Tooltip.css";
export const ServerTooltip = ({ text }) => {
  return (
    <div>
      <span className='tooltiptext'>{text}</span>
    </div>
  );
};
