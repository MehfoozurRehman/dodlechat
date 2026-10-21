# dodlechat

A React chat client with a sidebar of rooms, a message view, emoji and image sending, talking to a separate hosted backend.

**Status:** In progress. The chat screens are built, but the backend that serves rooms and messages is not in this repo, so the full flow cannot be checked here.

## The problem

The code is a chat front end. A user picks a name, sees a list of rooms, and reads and writes messages in a room. Messages are sent to a backend that lives elsewhere.

## What it does

- **Sign-in by name.** `src/Components/Auth.js` asks for a user name, saves it to localStorage, and opens the dashboard. There is no password check.
- **Room list.** `src/Screens/MessengerSidebar.js` shows the rooms and the signed-in user's entry.
- **Room view.** A header, message list and footer with a message box (`RoomHeader.js`, `RoomMain.js`, `RoomFooter.js`).
- **Emoji.** An emoji picker from `emoji-mart`.
- **Images.** Images are compressed in the browser with `browser-image-compression` before they are sent.
- **Empty state.** A no-room-selected screen when no room is open.

## How it's built

- Create React App (`react-scripts`) with React and React Router.
- A single axios instance in `src/axios.js` holds the backend base URL, and `src/utils/fetcher.js` plugs it into SWR for reads.
- `Messsanger.js` uses `useSWR` to load data for the chat screens.

## Running it locally

Uses pnpm (there is a `pnpm-lock.yaml`).

```bash
pnpm install
pnpm start
pnpm build
pnpm test
```

## What's left

- The backend is not in this repo. The base URL is hard-coded in `src/axios.js`, with a commented-out localhost line.
- Sign-in is only a user name, so there is no real authentication.
- No automated tests.
- The README was the Create React App template before this one.
