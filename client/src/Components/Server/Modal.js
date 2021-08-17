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
          <div className='modal_openup'>
            <header className='modal-header'>
              <div>
                <h1>{title}</h1>
                <button onClick={() => closeModal(id)} className='close_modal'>
                  X
                </button>
              </div>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
