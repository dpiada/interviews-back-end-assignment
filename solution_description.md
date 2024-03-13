# The solution 

For these challenges I decided to use a backend two tier:

1. First tier a WebServer
2. Second tier a Database


## First Tier - Webserver

For Webserver I choose [fastify](https://fastify.dev/) web framework.
I used the personal skeleton for fastify that you'll find in this [fastify-skeleton](https://github.com/dpiada/fastify-skeleton)

## Second Tier - Database 

For this use case I was undecided about SQL or NOSQL databases.
At the last I decided to use a SQL Database because easiest describe the nature of a grocery market and its relations (categories-product-cart-users).
With all these relations beetwen these objects I prefer strict relations and dependencies.


### Challenge #1: Available Products

I opted for a route in get a paginated list of products.
For the images I used a path, because I choose to not save image into database but a link where the image is located.
In the solution the image can be store in a storage service like minIO, or AWS S3 and deliver them directly after a request of frontend.

In case multiple requests can be possible use some chaching service for images or some chaching methods for backend/database.

Other this the backend is stateless any information is stored directly into web server so it's easily horizontal scalable

## API Documentations
---
[Api Documentation](swagger-api.yaml)

## Useful links

- (fatsify)[https://fastify.dev/]
- (nope-tap)[https://node-tap.org/]
- (docker)[https://www.docker.com/]




