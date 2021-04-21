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

### "Full Stack" Netlify Dev With HMR

0. Find AIRTABLE_API_KEY and FAUNADB_SECRET in the netlify app dashboard.
1. `$ npx cross-env NODE_ENV=development AIRTABLE_API_KEY=123 FAUNADB_SECRET=123 netlify dev`
2. `$ npx netlify dev`
3. View [http://localhost:8888](http://localhost:8888); it should open automatically.

## Operational note on the Index DB Cache

In my version Chrome, with the devtools open, a long press of the refresh button
in the toolbar reveals a small menu, with options

- Normal Reload
- Hard Reload
- Empty Cache and Hard Reload

I'm not sure what cache is emptied by the 3rd menu action, but it _isn't_ the
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

### React components

Use functional components rather than `React.Component` and `React.PureComponent`.

### APIs and Logic

Use hooks. A custom hook might be introduced if and only if it uses at least one existing
hook in its implementation.

### Syntactical pedantry

Semicolons introduce unrequired noise, they can be almost entirely eliminated.

Lines of code that introduce non-interdependent things, i.e. that can be written in
any order, should be written in alphabetical order. For example, this applies to
import statements, the entries of style classes, and entries of object literals in
general.

Import statements are also arranged into 3 sections, stated in this order:

1. General-purpose, external libraries. `React` should be the first import, if
   `jsx` syntax is in the file or if a React component is exported. `Redux` should
   be the second import if used in the file. Then other general-purpose libraries
   follow in alphabetical order.
2. Material-UI imports, in alphabetical order. Utility functions imported before
   widget components.
3. Imports provided in this application code. Higher-level (in terms of directory
   structure) imported first (e.g. `../../styling`) and imports from the current
   subpackage (e.g. `./SomeComponent`) last. Within each hierarchical level, imports
   are written in alphabetical order.

Each section of imports is separated by a single empty line.

### Functional-programming libraries

I personally _love_ [`ramda`](https://ramdajs.com/), which is a competitor of the more
widely-used [`lodash`](https://lodash.com/). However point-free functional code could
be much more difficult for newcomers to understand. In order to avoid the potential of
complicating the logic, neither are used. The babel settings enable up-to-date
ECMAScript, which should provide enough algorithms to write this application without
either of these libraries.

Either library would be a help to a developer accustomed to using it, and a hindrance
to a developer not accustomed to it. The choice here (neither) is intended to create a
more approachable neutral ground.

### Functional-programming techniques

React, especially using functional components as done here, is a very functional
environment. Additionally, Redux, at the heart of this application, is a very
functional solution. The style of this project is largely functional. In some
cases IIFEs (immediately-invoked function expressions) can be found, and the
functional nature of Javascript is exploited. Even so, legibility of the code
and clarity about the application runtime behavior should be preferred whenever
possible.

### Additional guidance

Some subpackages (i.e. subdirectories) may contain additional `README.md` files
with details specific to those subpackages.
