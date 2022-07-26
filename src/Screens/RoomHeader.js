import React from "react";
import { Menu, Search, X } from "react-feather";
import Avatar from "../Components/Avatar";
import IconBtn from "../Components/IconBtn";

export function RoomHeader({
  roomImage,
  roomName,
  searchBar,
  searchQuesryMessages,
  setSearchQuesryMessages,
  setSearchBar,
}) {
  return (
    <div
      className="messanger__sidebar__header"
      style={{
        borderTopRightRadius: 10,
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Avatar userPic={"data:image/png;base64," + roomImage} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "1em",
            justifyContent: "space-between",
          }}
        >
          <div className="messanger__sidebar__room__left__name">{roomName}</div>
          <div className="messanger__sidebar__room__timestamp">online</div>
        </div>
      </div>
      <div className="messanger__sidebar__header__btn">
        {searchBar ? (
          <div className="messanger__sidebar__search__box messanger__sidebar__search__box__reverse">
            <Search color="currentColor" size={20} />
            <input
              value={searchQuesryMessages}
              type="text"
              placeholder="Search Messages"
              className="messanger__sidebar__search__input__field"
              onChange={(e) => {
                setSearchQuesryMessages(e.target.value);
              }}
            />
          </div>
        ) : null}
        {searchBar ? (
          <IconBtn
            icon={<X color="currentColor" size={20} />}
            onPress={() => {
              if (searchBar) {
                setSearchBar(false);
              }
            }}
          />
        ) : (
          <IconBtn
            icon={<Search color="currentColor" size={20} />}
            onPress={() => {
              if (!searchBar) {
                setSearchBar(true);
              }
            }}
          />
        )}
        <IconBtn
          icon={<Menu color="currentColor" size={20} />}
          onPress={() => {}}
        />
      </div>
    </div>
  );
}
