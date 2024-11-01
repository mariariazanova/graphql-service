import { GraphQLObjectType } from 'graphql/type/index.js';
import {ProfilesType, ProfileType} from "./types/profile.js";
import profileResolvers from "./resolvers/profile-resolvers.js";
import {GraphQLNonNull} from "graphql";
import {UUIDType} from "./types/uuid.js";

const id = { type: new GraphQLNonNull(UUIDType) };

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        profile: {
            type: ProfileType,
            args: {
                id,
            },
            resolve: profileResolvers.profileByID,
        },

        profiles: {
            type: ProfilesType,
            resolve: profileResolvers.profilesAll,
        },
    },
});

export default rootQuery;
