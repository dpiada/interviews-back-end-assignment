#!/bin/bash

if [[ $1 = "production" ]]; then
    npm_cmd="start"
elif [[ $1 = "development" ]]; then
    npm_cmd="start-nodemon"
else
    echo "ERROR: invalid option $1"
    exit 1
fi

wait-for-it.sh $DB_SERVICE -t 

echo "Running npm run $npm_cmd"
npm run $npm_cmd
