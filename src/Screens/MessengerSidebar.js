import React from "react";
import { Menu, MessageSquare, Search, X, Image } from "react-feather";
import userPic from "../Assets/userPic.jpg";
import Avatar from "../Components/Avatar";
import IconBtn from "../Components/IconBtn";
import imageToBase64 from "image-to-base64/browser";

export function MessengerSidebar({
  createRoom,
  newRoomName,
  setNewRoomName,
  imageCompression,
  handleRoomCreation,
  setCreateRoom,
  searchQuesryRooms,
  setSearchQuesryRooms,
  setRoomName,
  setRoomSelected,
  setRoomImage,
  setNewRoomImage,
  rooms,
}) {
  return (
    <div className="messanger__sidebar">
      <div
        className="messanger__sidebar__header"
        style={{
          borderTopLeftRadius: 10,
        }}
      >
        <Avatar userPic={userPic} />
        <div className="messanger__sidebar__header__btn">
          {createRoom ? (
            <form
              style={{
                display: "flex",
              }}
              encType="multipart/form-data"
            >
              <div
                className="messanger__sidebar__search__box messanger__sidebar__search__box__reverse"
                style={{
                  marginRight: "0em",
                  maxWidth: "200px",
                }}
              >
                <input
                  value={newRoomName}
                  type="text"
                  placeholder="Room name"
                  className="messanger__sidebar__search__input__field"
                  onChange={(e) => {
                    setNewRoomName(e.target.value);
                  }}
                />
              </div>
              <div className="messanger__icon__btn messanger__sidebar__search__input__btn">
                <input
                  type="file"
                  name="roomImage"
                  accept="image/*"
                  onChange={async (e) => {
                    const options = {
                      maxSizeMB: 0.02,
                      maxWidthOrHeight: 300,
                      useWebWorker: true,
                    };

                    try {
                      const compressedFile = await imageCompression(
                        e.target.files[0],
                        options
                      );
                      imageToBase64(URL.createObjectURL(compressedFile))
                        .then((response) => {
                          setNewRoomImage(response); // console.log(response);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
                <Image color="currentColor" size={20} />
              </div>
              <button
                style={{
                  display: "none",
                }}
                type="submit"
                onClick={handleRoomCreation}
              >
                Creat Room
              </button>
            </form>
          ) : null}
          {createRoom ? (
            <IconBtn
              icon={<X color="currentColor" size={20} />}
              type="button"
              onPress={() => {
                if (createRoom) {
                  setCreateRoom(false);
                }
              }}
            />
          ) : (
            <IconBtn
              icon={<MessageSquare color="currentColor" size={20} />}
              type="button"
              onPress={() => {
                if (!createRoom) {
                  setCreateRoom(true);
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
      <div className="messanger__sidebar__search">
        <div className="messanger__sidebar__search__box">
          <Search color="currentColor" size={20} />
          <input
            type="text"
            value={searchQuesryRooms}
            placeholder="Search Rooms"
            className="messanger__sidebar__search__input__field"
            onChange={(e) => {
              setSearchQuesryRooms(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="messanger__sidebar__rooms">
        {rooms
          .filter((room) => room.name.includes(searchQuesryRooms))
          .map((room) => (
            <div className="messanger__sidebar__room" key={room._id}>
              <input
                type="radio"
                name="messanger__sidebar__room"
                id="messanger__sidebar__room"
                onChange={() => {
                  setRoomName(room.name);
                  setRoomSelected(true);
                  setRoomImage(room.roomImage);
                }}
              />
              <div className="messanger__sidebar__room__content">
                <Avatar userPic={"data:image/png;base64," + room.roomImage} />
                <div className="messanger__sidebar__room__right">
                  <div className="messanger__sidebar__room__top">
                    <div className="messanger__sidebar__room__left__name">
                      {room.name}
                    </div>

                    <div className="messanger__sidebar__room__timestamp">
                      {room.date}
                    </div>
                  </div>
                  <div className="messanger__sidebar__room__left__last__message">
                    {room.lastMessage}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
