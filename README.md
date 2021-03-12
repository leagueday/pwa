# LeagueDay v.2 WebApp

[![Netlify Status](https://api.netlify.com/api/v1/badges/868462ab-5314-4f34-a38e-96f3a6c9ffe4/deploy-status)](https://app.netlify.com/sites/unruffled-jang-4961e9/deploys)

## dev setup and workflow

Pre-requisites

1. `nvm`
2. `nodejs` at version found in `.nvmrc`
3. install netlify-cli globally with `npm install -g netlify-cli`
4. `npx netlify login`

Setup

1. `$ npm install`
2. `$ cd functions/node-fetch/ && npm install`
3. (repeat step 2 for any other `functions/*/` added in the future)

### "Full Stack" Netlify Dev With HMR

1. `$ npx cross-env NODE_ENV=development AIRTABLE_API_KEY=A1B2C3 npx netlify dev`
2. `$ npx netlify dev`
3. View [http://localhost:8888](http://localhost:8888); it should open automatically.

## Operational note on the Index DB Cache

In my version Chrome, with the devtools open, a long press of the refresh button
in the toolbar reveals a small menu, with options

* Normal Reload
* Hard Reload
* Empty Cache and Hard Reload

I'm not sure what cache is emptied by the 3rd menu action, but it *isn't* the
IndexDB. The `LeagueDay_*` tables can be found in the devtools under
`Application / Storage / IndexedDB`, and these tables can be deleted or cleared
to reset this cache.

Since this cache is so durable, some care should be taken to avoid introducing
backward incompatibility, or else code defensively wrt uninterpretable values.

## release workflow

1. merge to `master`

## launcher icon

some tbd, c.f. [Adding favicons in a multi-browser multi-platform world](https://mobiforge.com/design-development/adding-favicons-in-a-multi-browser-multi-platform-world)

## FAQ

### Why are all the package deps added as production dependencies? Why is the `devDependencies` empty?

The odd thing is that the netlify build environment only installs with the dependencies given the
`NODE_ENV`. I.e. if `NODE_ENV=development`, then only the `devDependencies` are installed. And
conversely for `NODE_ENV=production` only the `dependencies` are installed.

For a frontend app, whether deps are in `devDependencies` or `dependencies` has no impact to the
static bundle produced by webpack/babel.

Putting all the deps as production deps lets it build locally (dev) and also on netlify (prod).
It's set up in the netlify dashboard, with the env variable `NODE_ENV=production`.

## style guide

### jsx and js

Keep `jsx` syntax in `jsx` files. A `jsx` file should default-export a React component.

Many other files don't need `jsx` and should be named with `js` suffix.

### css

Avoid introducing `css` files, that can pollute the global styles space. The project build
doesn't include css modules - use JSS instead.
