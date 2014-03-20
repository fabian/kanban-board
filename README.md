# Kanban Board

[![Build Status](https://travis-ci.org/fabian/kanban-board.svg?branch=master)](https://travis-ci.org/fabian/kanban-board)

## Setup

```
npm install
```

## Tests

```
npm test
```

## Development

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
