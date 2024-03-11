#!/bin/bash

export NODE_ENV=test
export DB_SERVICE='localhost:5432'
export POSTGRES_USER=pguser
export POSTGRES_PASSWORD=pgPassword
export POSTGRES_DB=products

mkdir -p logs
date=$(date '+%Y-%m-%d-%H-%M-%S')

lab_options="test/"

lab_options="$lab_options $@"

echo "Running lab $lab_options"
 
tap $lab_options -o logs/test_$date.log || exit 1