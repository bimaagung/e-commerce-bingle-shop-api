const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'apiteam@swagger.io',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Item: {
      id: 1,
      name: 'Bakso',
      category: 'makanan',
      price: 25000,
      createdAt: '2022-09-01T09:47:02.922Z',
      updatedAt: '2022-09-01T09:47:02.922Z',
    },
  },
}

const outputFile = './docs/docs.json'
const endpointsFiles = ['./app.js']

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then((r) => {
  console.log(r)
})
