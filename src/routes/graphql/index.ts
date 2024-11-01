import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';
import {createGqlResponseSchema, gqlResponseSchema, gqlSchema} from './schemas.js';
import { getGqlContext } from "./get-gql-context.js";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = req.body.query;
      const variableValues = req.body.variables;

      console.log(source, variableValues);

      const result = await graphql({
        schema: gqlSchema,
        source,
        variableValues,
        contextValue: getGqlContext(prisma),
      });

      console.log('result', result);

      return result;
    },
  });
};

export default plugin;
