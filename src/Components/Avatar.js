import React from "react";

export default function Avatar({ userPic }) {
  return (
    <button className="messanger__sidebar__header__avatar">
      <img
        src={userPic}
        alt="userPic"
        className="messanger__sidebar__header__avatar__img"
      />
    </button>
  );
}
