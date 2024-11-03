import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import { getGqlContext } from './get-gql-context.js';

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
      const validationErrors = validate(gqlSchema, parse(source), [depthLimit(5)]);

      if (validationErrors.length > 0) {
        return { data: null, errors: validationErrors };
      }

      const result = await graphql({
        schema: gqlSchema,
        source,
        variableValues,
        contextValue: getGqlContext(prisma),
      });

      return result;
    },
  });
};

export default plugin;
