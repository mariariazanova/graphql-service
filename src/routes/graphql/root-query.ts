import { GraphQLObjectType } from 'graphql/type/index.js';

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {},
});

export default rootQuery;
