# Kanban Board

[![Build Status](https://travis-ci.org/fabian/kanban-board.svg?branch=master)](https://travis-ci.org/fabian/kanban-board)

## Setup

All project dependencies are managed with npm, the node package manager. To download all dependencies run the following command inside the project directory.

```
npm install
```

## Development

For local development install [PostgreSQL](http://www.postgresql.org/), import the SQL file [install.sql](./install.sql) and start the server with the following commands:

```
node app.js
```

The application is then available at [http://localhost:3000](http://localhost:3000/).

## Tests

The code is tested with Jasmine, a behavior-driven development framework for testing JavaScript code.

```
npm test
```

To generate a code coverage report, run the test command with `--coverage`:

```
npm test --coverage
open coverage/lcov-report/index.html
```

## Deployment

The project is ready to be deployed to [Heroku](http://www.heroku.com), however some additional commands are needed to activate all components.

```
heroku addons:add heroku-postgresql:dev
heroku config:set DATABASE_URL=postgres://...
heroku pg:psql HEROKU_POSTGRESQL_BROWN_URL
heroku labs:enable websockets
```
