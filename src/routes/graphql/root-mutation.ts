import {GraphQLNonNull, GraphQLObjectType} from 'graphql/type/index.js';
import {UUIDType} from './types/uuid.js';
import {ChangeUserInputType, CreateUserInputType, UserType} from './types/user.js';
import userResolvers from './resolvers/user-resolvers.js';
import {ChangePostInputType, CreatePostInputType, PostType} from './types/post.js';
import postResolvers from './resolvers/post-resolvers.js';
import {ChangeProfileInputType, CreateProfileInputType, ProfileType} from './types/profile.js';
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
        changeUser: {
            type: UserType,
            args: {
                id,
                dto: { type: ChangeUserInputType },
            },
            resolve: userResolvers.changeUser,
        },
        createPost: {
            type: PostType,
            args: {
                dto: { type: CreatePostInputType },
            },
            resolve: postResolvers.createPost,
        },
        changePost: {
            type: PostType,
            args: {
                id,
                dto: { type: ChangePostInputType },
            },
            resolve: postResolvers.changePost,
        },
        createProfile: {
            type: ProfileType,
            args: {
                dto: { type: CreateProfileInputType },
            },
            resolve: profileResolvers.createProfile,
        },
        changeProfile: {
            type: ProfileType,
            args: {
                id,
                dto: { type: ChangeProfileInputType },
            },
            resolve: profileResolvers.changeProfile,
        },
    },
});

export default rootMutation;
