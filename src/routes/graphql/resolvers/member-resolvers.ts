import { GraphQLFieldResolver } from 'graphql';
import { MemberType, Profile } from '@prisma/client';
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
        // const memberType = await context.prisma.memberType.findUnique({
        //     where: { id },
        // });
        const memberType = context.loaders.memberTypeDataloader.load(id);

        console.log(memberType);

        return memberType;
    },
    memberTypeByMemberTypeId: async function (source, _args, context) {
        const { memberTypeId } = <Profile>source;
        // const memberType = await context.prisma.memberType.findUnique({
        //     where: { id: memberTypeId },
        // });
        const memberType = context.loaders.memberTypeDataloader.load(memberTypeId);

        return memberType;
    },
};

export default memberResolvers;
