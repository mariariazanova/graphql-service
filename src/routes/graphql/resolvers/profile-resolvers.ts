import { GraphQLFieldResolver } from 'graphql';
import { Profile } from '@prisma/client';
import { Context } from '../get-gql-context.js';
import { IdArgs } from '../interfaces/args.js';

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
    createProfile: async function (_source, args: Profile, context): Promise<Profile> {
        const newProfile = await context.prisma.profile.create({
            data: args,
        });
        console.log('new profile', args, newProfile);

        return newProfile;
    },
};

export default profileResolvers;
