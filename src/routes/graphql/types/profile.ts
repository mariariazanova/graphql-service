import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Profile } from "@prisma/client";
import { UUIDType } from "./uuid.js";
import { Context } from '../get-gql-context.js';

const id = { type: new GraphQLNonNull(UUIDType) };
const isMale = { type: GraphQLBoolean };
const yearOfBirth = { type: GraphQLInt };
const userId = { type: UUIDType };

export const ProfileType = new GraphQLObjectType<Profile, Context>({
    name: 'Profile',
    fields: () => ({
        id,
        isMale,
        yearOfBirth,
        userId,
    }),
});

export const ProfilesType = new GraphQLList(ProfileType);
