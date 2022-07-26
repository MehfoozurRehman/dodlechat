import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { MessengerSidebar } from "./MessengerSidebar";
import { NoRoomSelected } from "./NoRoomSelected";
import { RoomFooter } from "./RoomFooter";
import { RoomMain } from "./RoomMain";
import { RoomHeader } from "./RoomHeader";

export default function Messsanger({ messages, rooms, axios, userName }) {
  const [roomName, setRoomName] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomImage, setNewRoomImage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuesryRooms, setSearchQuesryRooms] = useState("");
  const [searchQuesryMessages, setSearchQuesryMessages] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [roomSelected, setRoomSelected] = useState(false);
  const [roomImage, setRoomImage] = useState("");
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const timeString = date.toLocaleString("en-PK", options);

  useEffect(() => {
    let intervalId;

    if (isTimerActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerActive, counter]);

  function handleRoomCreation() {
    axios.post("/v1/createRoom", {
      name: newRoomName,
      roomImage: newRoomImage,
      date: timeString,
      lastMessage: "lastMessage",
    });
  }

  function handleMessageCreation() {
    axios.post("/v1/createMessage", {
      message: newMessage,
      timestamp: timeString,
      user: userName,
      room: roomName,
    });
  }

  return (
    <div className="messanger">
      <MessengerSidebar
        createRoom={createRoom}
        newRoomName={newRoomName}
        setNewRoomName={setNewRoomName}
        options={options}
        imageCompression={imageCompression}
        handleRoomCreation={handleRoomCreation}
        setCreateRoom={setCreateRoom}
        searchQuesryRooms={searchQuesryRooms}
        setSearchQuesryRooms={setSearchQuesryRooms}
        setRoomName={setRoomName}
        setRoomSelected={setRoomSelected}
        setRoomImage={setRoomImage}
        setNewRoomImage={setNewRoomImage}
        rooms={rooms}
      />
      {roomSelected ? (
        <div className="messanger__chat__box">
          <RoomHeader
            roomImage={roomImage}
            roomName={roomName}
            searchBar={searchBar}
            searchQuesryMessages={searchQuesryMessages}
            setSearchQuesryMessages={setSearchQuesryMessages}
            setSearchBar={setSearchBar}
          />
          <RoomMain
            messages={messages}
            userName={userName}
            searchQuesryMessages={searchQuesryMessages}
            roomName={roomName}
          />
          <RoomFooter
            openEmojiPicker={openEmojiPicker}
            setOpenEmojiPicker={setOpenEmojiPicker}
            setNewMessage={setNewMessage}
            newMessage={newMessage}
            handleMessageCreation={handleMessageCreation}
            openMic={openMic}
            setOpenMic={setOpenMic}
            setIsTimerActive={setIsTimerActive}
            minute={minute}
            second={second}
            setCounter={setCounter}
          />
        </div>
      ) : (
        <NoRoomSelected />
      )}
    </div>
  );
}
