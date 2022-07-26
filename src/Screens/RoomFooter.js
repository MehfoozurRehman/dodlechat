import React from "react";
import { X, Mic, Paperclip, Smile, Check, PlayCircle } from "react-feather";
import IconBtn from "../Components/IconBtn";
import SpeechRecognition from "react-speech-recognition";
import { Picker } from "emoji-mart";

export function RoomFooter({
  openEmojiPicker,
  setOpenEmojiPicker,
  setNewMessage,
  newMessage,
  handleMessageCreation,
  openMic,
  setOpenMic,
  setIsTimerActive,
  minute,
  second,
  setCounter,
}) {
  return (
    <div
      className="messanger__sidebar__header"
      style={{
        borderBottomRightRadius: 10,
      }}
    >
      <div className="messanger__sidebar__header__btn">
        {openEmojiPicker ? (
          <IconBtn
            icon={<X color="currentColor" size={20} />}
            onPress={() => {
              if (openEmojiPicker) {
                setOpenEmojiPicker(false);
              }
            }}
          />
        ) : (
          <IconBtn
            icon={<Smile color="currentColor" size={20} />}
            onPress={() => {
              if (!openEmojiPicker) {
                setOpenEmojiPicker(true);
              }
            }}
          />
        )}

        {openEmojiPicker ? (
          <div className="emoji__picker">
            <Picker
              theme="dark"
              autoFocus={true}
              color="#056162"
              onSelect={(e) => {
                setNewMessage(newMessage + e.native);
              }}
            />
          </div>
        ) : null}

        <IconBtn
          icon={<Paperclip color="currentColor" size={20} />}
          onPress={() => {}}
        />
      </div>
      <form
        className="messanger__sidebar__search__box messanger__sidebar__search__box__reverse"
        style={{
          marginRight: "0em",
        }}
      >
        <input
          value={newMessage}
          type="text"
          placeholder="Type a message"
          className="messanger__sidebar__search__input__field"
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        />
        <button
          style={{
            display: "none",
          }}
          type="submit"
          onClick={handleMessageCreation}
        >
          Send Message
        </button>
      </form>
      <div className="messanger__sidebar__header__btn">
        {openMic ? (
          <>
            <IconBtn
              icon={<X color="currentColor" size={20} />}
              onPress={() => {
                if (openMic) {
                  setOpenMic(false);
                  setIsTimerActive(false);
                }

                SpeechRecognition.stopListening();
              }}
            />
            <div className="messanger__sidebar__header__btn__time__recoded__box">
              <PlayCircle color="white" size={15} />
              <div className="messanger__sidebar__header__btn__time__recoded">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
              </div>
            </div>
            <IconBtn
              icon={<Check color="currentColor" size={20} />}
              onPress={() => {
                // if (openMic) {
                //   setOpenMic(false);
                // }
              }}
            />
          </>
        ) : (
          <IconBtn
            icon={<Mic color="currentColor" size={20} />}
            onPress={() => {
              setCounter(0);
              setIsTimerActive(true); // SpeechRecognition.startListening();

              if (!openMic) {
                setOpenMic(true);
              } // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {

              //   console.log(
              //     "Browser not supported & return some useful info."
              //   );
              // } else {
              //   setNewMessage(transcript);
              // }
              // SpeechRecognition.startListening({
              //   continuous: true,
              // });
            }}
          />
        )}
      </div>
    </div>
  );
}
