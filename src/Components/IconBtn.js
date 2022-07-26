import React from "react";

export default function IconBtn({ icon, onPress, type }) {
  return (
    <button onClick={onPress} type={type} className="messanger__icon__btn">
      {icon && icon}
    </button>
  );
}
