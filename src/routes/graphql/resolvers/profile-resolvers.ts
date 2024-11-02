import { GraphQLFieldResolver } from 'graphql';
import { Profile, User } from '@prisma/client';
import { Context } from '../get-gql-context.js';
import { ChangeArgs, CreateArgs, IdArgs } from '../interfaces/args.js';

const profileResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
    profilesAll: async function (_source, _args, context): Promise<Profile[]> {
        const profiles  = await context.prisma.profile.findMany();
        console.log('profiles', profiles);

        return profiles;
    },
    profileById: async function (_source, args: IdArgs<Profile>, context): Promise<Profile | null> {
        const { id } = args;
        const profile = await context.prisma.profile.findUnique({
            where: { id },
        });

        console.log('profile for id', args.id, profile);

        return profile;
    },
    createProfile: async function (_source, args: CreateArgs<Profile>, context): Promise<Profile> {
        const newProfile = await context.prisma.profile.create({
            data: args.dto,
        });
        console.log('new profile', args, newProfile);

        return newProfile;
    },
    changeProfile: async function (_source, args: ChangeArgs<Profile>, context): Promise<Profile> {
        const { id, dto } = args;
        const changedProfile = await context.prisma.profile.update({
            where: { id },
            data: dto,
        });

        return changedProfile;
    },
    deleteProfile: async function (_source, args: IdArgs<Profile>, context): Promise<boolean> {
        const { id } = args;
        try {
            await context.prisma.profile.delete({
                where: { id },
            });
            return true;
        } catch (e) {
            return false;
        }
    },
    getByUserId: async function (source, _args, context): Promise<Profile | null> {
        const { id } = <User>source;
        const profile = await context.prisma.profile.findUnique({
            where: { userId: id },
        });

        return profile;
    },
};

export default profileResolvers;
