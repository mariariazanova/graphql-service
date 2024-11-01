import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
} from 'graphql';
import {MemberTypeE} from "../enums/member-type.js";

const discount = { type: GraphQLFloat };
const postsLimitPerMonth = { type: GraphQLInt }

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        [MemberTypeE.BASIC]: {
            value: MemberTypeE.BASIC,
        },
        [MemberTypeE.BUSINESS]: {
            value: MemberTypeE.BUSINESS,
        },
    },
});

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
        id: { type: MemberTypeId },
        discount,
        postsLimitPerMonth,
    }),
});

export const MemberTypesType = new GraphQLList(MemberType);
