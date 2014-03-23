# Kanban Board

[![Build Status](https://travis-ci.org/fabian/kanban-board.svg?branch=master)](https://travis-ci.org/fabian/kanban-board)

## Setup

All project dependencies are managed with npm, the node package manager. To download all dependencies run the following command inside the project directory.

```
npm install
```

## Tests

The code is tested with Jasmine, a behavior-driven development framework for testing JavaScript code.

```
npm test
```

## Development

For local development install [PostgreSQL](http://www.postgresql.org/), import the SQL file [install.sql](./install.sql) and start the server with the following commands:

```
node app.js
```

## Deployment

```
heroku addons:add heroku-postgresql:dev
heroku config:set DATABASE_URL=postgres://...
heroku pg:psql HEROKU_POSTGRESQL_BROWN_URL
heroku labs:enable websockets
```
