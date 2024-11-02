import {GraphQLNonNull, GraphQLObjectType} from 'graphql/type/index.js';
import {UUIDType} from './types/uuid.js';
import {CreateUserInputType, UserType} from './types/user.js';
import userResolvers from './resolvers/user-resolvers.js';
import {CreatePostInputType, PostType} from './types/post.js';
import postResolvers from './resolvers/post-resolvers.js';
import {CreateProfileInputType, ProfileType} from './types/profile.js';
import profileResolvers from './resolvers/profile-resolvers.js';

const id = { type: new GraphQLNonNull(UUIDType) };

const rootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createUser: {
            type: UserType,
            args: {
                dto: { type: CreateUserInputType },
            },
            resolve: userResolvers.createUser,
        },
        createPost: {
            type: PostType,
            args: {
                dto: { type: CreatePostInputType },
            },
            resolve: postResolvers.createPost,
        },
        createProfile: {
            type: ProfileType,
            args: {
                dto: { type: CreateProfileInputType },
            },
            resolve: profileResolvers.createProfile,
        },
    },
});

export default rootMutation;
