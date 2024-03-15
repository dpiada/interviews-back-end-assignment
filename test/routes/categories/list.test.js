const { testRoute } = require('../../../lib/helpers/tester');

testRoute(
  [
    {
      description: '200 - GET /v1/categories/list - return a list of categories',
      setUpCallback: () => {
        const buildRequest = {
          url: '/v1/categories/list?page=1&size=10',
          method: 'GET',
        };
        return buildRequest;
      },
      testCallback: ({ response, tap }) => {
        const { statusCode, body } = response;
        tap.equal(statusCode, 200);
        tap.ok(body);
        const { results, total } = JSON.parse(body);
        tap.ok(results);
        tap.ok(total);
      },
    },
    {
      description: '400 - GET /v1/categories/list - parameters are missing or invalid',
      setUpCallback: () => {
        const buildRequest = {
          url: '/v1/categories/list?page=invalid&size=10',
          method: 'GET',
        };
        return buildRequest;
      },
      testCallback: ({ response, tap }) => {
        const { statusCode } = response;
        tap.equal(statusCode, 400);
      },
    },
    {
      description: '400 - GET /v1/categories/list - parameters are missing or invalid',
      setUpCallback: () => {
        const buildRequest = {
          url: '/v1/categories/list?page=1&size=invalid',
          method: 'GET',
        };
        return buildRequest;
      },
      testCallback: ({ response, tap }) => {
        const { statusCode } = response;
        tap.equal(statusCode, 400);
      },
    },
  ],
);
