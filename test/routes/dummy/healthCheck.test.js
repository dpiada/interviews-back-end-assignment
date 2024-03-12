const { testRoute } = require('../../../lib/helpers/tester');

testRoute(
  [
    {
      description: 'GET /v1/dummy',
      setUpCallback: () => {
        const buildRequest = {
          url: '/v1/dummy',
          method: 'GET',
        };
        return buildRequest;
      },
      testCallback: ({ response, tap }) => {
        const { statusCode, statusMessage } = response;
        tap.equal(statusCode, 200);
        tap.ok(statusMessage);
      },
    },
  ],
);
