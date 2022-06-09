/* eslint-disable no-continue */
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { loadSchema } = require('@graphql-tools/load');
const { JsonFileLoader } = require('@graphql-tools/json-file-loader');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addMocksToSchema } = require('@graphql-tools/mock');
// const { printSchema } = require('graphql');
// const fs = require('fs');
// const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const glob = require('glob');
// const typeDefs = require('./typeDefs');

const app = express();

function generateRootSchema(version, queryFields, mutationFields) {
  const schema = {};
  // If we have query fields, add a query schema
  if (Object.getOwnPropertyNames(queryFields).length) {
    schema.query = new GraphQLObjectType({
      name: 'Query',
      description: `Root query for ${version} resources`,
      fields: queryFields,
    });
  }
  // // If we have mutation fields, add a mutation schema
  // if (Object.getOwnPropertyNames(mutationFields).length) {
  //   schema.mutation = new GraphQLObjectType({
  //     name: 'Mutation',
  //     description: `Root mutation for ${version} resources`,
  //     fields: mutationFields,
  //   });
  // }

  return new GraphQLSchema(schema);
}

async function load2() {
  const paths = './src/resources/3_0_1/profiles/**/register.js';
  const configPaths = glob.sync(paths);

  const configs = configPaths.map(require);
  const queryFields = {};
  const mutationFields = {};
  for (let i = 0; i < configs.length; i += 1) {
    const config = configs[i];
    if (!Object.getOwnPropertyNames(config).length) {
      continue;
    }

    Object.assign(queryFields, config.query);
    Object.assign(mutationFields, config.mutation);
  }
  const rootSchema = generateRootSchema('R3', queryFields, mutationFields);
  return rootSchema;
}

async function load3() {
  const schema3 = await loadSchema('./schema_R3.gql', { loaders: [new GraphQLFileLoader()] });
  const schema4 = await loadSchema('./schema_R4.gql', { loaders: [new GraphQLFileLoader()] });
  // return { schema3, schema4 };

  return {
    schema3: addMocksToSchema({ schema: schema3 }),
    schema4: addMocksToSchema({ schema: schema4 }),
  };
}

async function main() {
  const schema = await load2();
  const server = new ApolloServer({
    schema,
  });
  server.applyMiddleware({ app, path: '/' });

  // const { schema3, schema4 } = await load3();
  // const server3 = new ApolloServer({
  //   schema: schema3,
  // });
  // const server4 = new ApolloServer({
  //   schema: schema4,
  // });

  // server3.applyMiddleware({ app, path: '/r3' });
  // server4.applyMiddleware({ app, path: '/r4' });
  // server4.applyMiddleware({ app, path: '/' });

  app.listen(3000, '127.0.0.1', () => {
    console.log('🚀 Running on port 3000');
  });
}

main();
