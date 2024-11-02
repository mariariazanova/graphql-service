import { GraphQLObjectType } from 'graphql/type/index.js';
import { GraphQLNonNull } from 'graphql';
import { ProfilesType, ProfileType } from './types/profile.js';
import profileResolvers from './resolvers/profile-resolvers.js';
import { UUIDType } from './types/uuid.js';
import { MemberType, MemberTypeId, MemberTypesType } from './types/member.js';
import memberResolvers from './resolvers/member-resolvers.js';
import { PostsType, PostType } from "./types/post.js";
import postResolvers from './resolvers/post-resolvers.js';
import { UsersType, UserType } from './types/user.js';
import userResolvers from './resolvers/user-resolvers.js';

const id = { type: new GraphQLNonNull(UUIDType) };

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        profile: {
            type: ProfileType,
            args: {
                id,
            },
            resolve: profileResolvers.profileById,
        },
        profiles: {
            type: ProfilesType,
            resolve: profileResolvers.profilesAll,
        },
        memberType: {
            type: MemberType,
            args: {
                id: {
                    type: MemberTypeId,
                },
            },
            resolve: memberResolvers.memberTypeById,
        },
        memberTypes: {
            type: MemberTypesType,
            resolve: memberResolvers.memberTypesAll,
        },
        post: {
            type: PostType,
            args: {
                id,
            },
            resolve: postResolvers.postById,
        },
        posts: {
            type: PostsType,
            resolve: postResolvers.postsAll,
        },
        users: {
            type: UsersType,
            resolve: userResolvers.usersAll,
        },
        user: {
            type: UserType,
            args: {
                id,
            },
            resolve: userResolvers.userById,
        },
    },
});

export default rootQuery;
