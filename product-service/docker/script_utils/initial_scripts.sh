#!/bin/bash
case "$1" in
  -s|--seed)
    echo run seed
    docker exec products-service npx knex seed:run
    ;;

  -m|--migrate)
    echo run migrations
    docker exec products-service npx knex migrate:latest
    ;;

  *)
  echo $'Usage:\n
    (-s|--seed) run update_feed.py file\n
                Download the data and populate the elastic db\n
    (-h|--historical) run historical.py file\n
                Generate the historical data if needed (it needs the elastic db to be populated)\n
    (-s|--substituter) run substituter.py file\n
                Command line interface to test the substitutions\n'
  ;;
esac