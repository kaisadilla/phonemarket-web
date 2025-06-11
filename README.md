# PhoneMarket

## Introduction
This project is a sample project for the technical test for a front-end application for Nunegal. This project has been developed with **React** and **JavaScript**, using **Vite** as a build tool.

For convenience, the query functions used to connect to the external API include console logs to help track when an API call occurs and when data is fetched from the cache.

The project has been built assuming the external API will be up, although loading times are handled gracefully regardless of connection speed.

During development, the endpoint `api/cart` has always returned `1` regardless of the amount of items added through it, which is why, while testing this project, you may see that the amount of items is always equal to `1` in the front-end. The logic for this component works correctly and would display any other number if `api/cart` returned so.

This project has been developed with a mobile-first philosophy, taking some liberties in the phone view to adapt the proposed layouts to a mobile-friendly experience.

The testing included is just a sample test with **vitest**.

## How to run
* `npm start` or `npm run start`: Launches the website in dev mode.
* `npm run build`: Builds the production build of the project, which can then be hosted as a server or run locally with a tool such as [serve](https://www.npmjs.com/package/serve).
* `npm test`: Launches the test suite, which is implemented with vitest. Only a small test for `pages/ProductList` is provided.
* `npm lint`: Checks the code using ESLint.

## Libraries
* `mantine`: Mantine provides the project with customizable and highly polished components, such as text boxes or buttons.
* `@tanstack/react-query`: This library provides utilities for querying external APIs, as well as cache the results of said queries (provided by the plugin `@tanstack/react-query-persist-client`).
* `fuzzysort`: Efficient fuzzy searching library.
* `sass`: Used for styles.
* `material-symbols`: Used for icons.