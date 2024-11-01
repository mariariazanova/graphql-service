import { GraphQLFieldResolver } from 'graphql';
import {MemberType} from '@prisma/client';
import { Context } from '../get-gql-context.js';

const memberResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
    memberTypesAll: async function (_source, _args, context: Context): Promise<MemberType[]> {
        const members = await context.prisma.memberType.findMany();
        console.log('members', members);

        return members;
    },

    memberTypeById: async function (
        _source,
        args: MemberType,
        context: Context,
    ): Promise<MemberType | null> {
        const { id } = args;
        const memberType = await context.prisma.memberType.findUnique({
            where: { id },
        });

        console.log(memberType);

        return memberType;
    },
};

export default memberResolvers;
