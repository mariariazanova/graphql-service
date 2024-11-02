import {
    GraphQLFloat, GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql/type/index.js';
import { Context} from '../get-gql-context.js';
import {UUIDType} from './uuid.js';
import {GraphQLList} from 'graphql';
import { User } from '@prisma/client';

const id = { type: new GraphQLNonNull(UUIDType) };
const name = { type: new GraphQLNonNull(GraphQLString) };
const balance = { type: new GraphQLNonNull(GraphQLFloat) };

export const UserType = new GraphQLObjectType<User, Context>({
    name: 'User',
    fields: () => ({
        id,
        name,
        balance,
    }),
});

export const UsersType = new GraphQLList(UserType) ;

export const CreateUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        name,
        balance,
    }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: () => ({
        name,
        balance: { type: GraphQLFloat },
    }),
});
