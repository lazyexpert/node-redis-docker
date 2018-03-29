# node-redis-docker
Core app aspects:
- dockerized (docker-compose)
- redis usage (sorted sets)
- redis locks usage (scalability)
- added endpoint POST /message `{ echoAt: number, message: string }`
- attempting to write clean and clear, reusable code

## Requirements

* docker (with docker-compose)

## Run

Will build the node-app container, then startup the node app and redis containers linked together.

```
docker-compose build && docker-compose up
```

## Test
Added eslint. To run use:
```
npm test
```

Also added handy curl, to query the only enpoint:
```
npm run curl
```
