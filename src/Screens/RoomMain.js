import React from "react";

export function RoomMain({
  messages,
  userName,
  searchQuesryMessages,
  roomName,
}) {
  return (
    <div className="messanger__chat__box__main">
      {messages
        .filter(
          (message) =>
            message.message.includes(searchQuesryMessages) &&
            message.room === roomName
        )
        .map((message) => (
          <div
            key={message._id}
            className={
              message.user === userName
                ? "messanger__chat__box__main__message__row message__recieved"
                : "messanger__chat__box__main__message__row "
            }
          >
            <div className="messanger__chat__box__main__message ">
              <div className="messanger__chat__box__main__message__user">
                {message.user}
              </div>
              <div className="messanger__chat__box__main__message__content">
                {message.message}
              </div>
              <div className="messanger__chat__box__main__message__timestamp">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
