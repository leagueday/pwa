
# LeagueDay v.2 WebApp

## dev setup and workflow

Pre-requisites

1. `nvm`
2. `nodejs` at version found in `.nvmrc`

Setup

1. `$ npm install`
2. `$ npm build-dev`
3. `$ npm start-dev`
4. open [http://localhost:3000](http://localhost:3000)

## release workflow

## launcher icon

some tbd, c.f. [Adding favicons in a multi-browser multi-platform world](https://mobiforge.com/design-development/adding-favicons-in-a-multi-browser-multi-platform-world)

## style guide

### jsx and js

Keep `jsx` syntax in `jsx` files, and those files should be rendering code (React components).

Many other files don't need `jsx` and should be named with `js` suffix.

### css

Avoid introducing `css` files, that can pollute the global styles space. The project build
doesn't include css modules - use JSS instead.
