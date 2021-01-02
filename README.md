
# LeagueDay v.2 WebApp

## dev setup and workflow

Pre-requisites

1. `nvm`
2. `nodejs` at version found in `.nvmrc`

Setup

1. `$ npm install`
2. `$ npx cross-env NODE_ENV=development AIRTABLE_API_KEY=A1B2C3 npm run start-dev`
3. open [http://localhost:3000](http://localhost:3000)

Netlify Dev

1. `$ cd functions/node-fetch && npm install`
2. `$ cd ../..`
3. `$ npx cross-env NODE_ENV=development AIRTABLE_API_KEY=A1B2C3 npm run build-dev`
4. `$ npx netlify dev`

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
