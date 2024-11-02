import {
    GraphQLFloat, GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql/type/index.js';
import { Context} from '../get-gql-context.js';
import { UUIDType} from './uuid.js';
import {GraphQLList} from 'graphql';
import { User } from '@prisma/client';
import userResolvers from "../resolvers/user-resolvers.js";
import {ProfileType} from "./profile.js";
import {PostsType} from "./post.js";
import profileResolvers from "../resolvers/profile-resolvers.js";
import postResolvers from "../resolvers/post-resolvers.js";

const id = { type: new GraphQLNonNull(UUIDType) };
const name = { type: new GraphQLNonNull(GraphQLString) };
const balance = { type: new GraphQLNonNull(GraphQLFloat) };

export const UserType = new GraphQLObjectType<User, Context>({
    name: 'User',
    fields: () => ({
        id,
        name,
        balance,
        profile: {
            type: ProfileType,
            resolve: profileResolvers.getByUserId,
        },
        posts: {
            type: PostsType,
            resolve: postResolvers.postByUserId,
        },
        userSubscribedTo: {
            type: <GraphQLList<typeof UserType>>UsersType,
            resolve: userResolvers.userSubscribedTo,
        },
        subscribedToUser: {
            type: <GraphQLList<typeof UserType>>UsersType,
            resolve: userResolvers.subscribedToUser,
        },
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
