import React, { useEffect } from "react";
import XIcon from "../Icons/XIcon";
import { closeModal } from "../../util/Util";
export const Modal = ({ id, title, children }) => {
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        console.log("escape");
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [id]);
  return (
    <div>
      <div id={id} className='modal modal_container'>
        <div id={`style-${id}`} className='modal_style'>
          <header className='header'>
            <h1>{title}</h1>
            <button onClick={() => closeModal(id)} className='close_modal'>
              {XIcon}
            </button>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};
