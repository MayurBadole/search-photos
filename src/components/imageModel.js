import React, { useRef, useEffect } from "react";
import "../style/ImageModel.css";
const Popup = ({ imageUrl, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <div ref={popupRef} className="popup-inner">
        <img src={imageUrl} alt="Popup" />
        <button onClick={onClose} className="closeButton">
          X
        </button>
      </div>
    </div>
  );
};

export default Popup;
