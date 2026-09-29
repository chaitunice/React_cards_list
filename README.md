# React Cards List

This repository is a small React frontend app that fetches a list of items from a backend API and displays them as a responsive card grid. The goal of the app is to present movie or watch-related data in a clean, interactive layout.

## What this project is

This project is built with React and Create React App. It demonstrates how to:

- fetch data from an external API using Axios
- manage loading and error states in React
- render reusable components dynamically
- organize styling with CSS and Sass
- present data in a card-based UI

## How the repo works

The app starts in `src/App.js`, which renders the main page and loads the `MyButton` component.

The main interaction works like this:

1. The user clicks the `Click Here` button.
2. `src/components/myButton.js` calls the backend endpoint:
   `https://drfproject.azurewebsites.net/watch/list/`
3. The API response is stored in state using `useState()`.
4. Each returned item is mapped into a card component.
5. `src/components/mycard1.js` displays that item’s title, platform, rating, and storyline.

The card layout and visuals are styled in `src/App2.scss` and `src/App1.css`.

## Project structure

- `src/App.js` — app entry point
- `src/components/myButton.js` — fetches data and renders the card grid
- `src/components/mycard1.js` — individual card UI
- `src/App1.css` — base styling
- `src/App2.scss` — grid and card visual styling
- `public/` — static app assets
- `package.json` — project scripts and dependencies

## How to run it locally

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Then open http://localhost:3000 in your browser.

## Tech stack

- React
- Create React App
- Axios
- Semantic UI React
- Sass

## Notes

This app relies on an external backend API for its data. If that API is unavailable or returns an error, the app shows an error message instead of the list of cards.


