import { GraphQLFieldResolver } from 'graphql';
import { User, SubscribersOnAuthors } from '@prisma/client';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType} from 'graphql-parse-resolve-info';
import { Context } from '../get-gql-context.js';
import { ChangeArgs, CreateArgs, IdArgs } from '../interfaces/args.js';
import { UsersType } from '../types/user.js';

const userResolvers: { [key: string]: GraphQLFieldResolver<User, Context> } = {
    usersAll: async function (_source, _args, context, info): Promise<User[]> {
        // const users = await context.prisma.user.findMany();
        const parsedResolveInfo = parseResolveInfo(info);
        const { fields } = simplifyParsedResolveInfoFragmentWithType(
            <ResolveTree>parsedResolveInfo,
            UsersType,
        );
        const users = await context.prisma.user.findMany({
            include: {
                userSubscribedTo: 'userSubscribedTo' in fields,
                subscribedToUser: 'subscribedToUser' in fields,
            },
        });

        users.forEach((user) => context.loaders.usersDataloader.prime(user.id, user));

        return users;
    },
    userById: async function (_source, args: IdArgs<User>, context): Promise<User | null> {
        const { id } = args;
        // const user = await context.prisma.user.findUnique({
        //     where: { id },
        // });
        const user = await context.loaders.usersDataloader.load(id);

        return user;
    },
    createUser: async function (_source, args: CreateArgs<User>, context): Promise<User | null> {
        const newUser = await context.prisma.user.create({
            data: args.dto,
        });

        return newUser;
    },
    changeUser: async function (_source, args: ChangeArgs<User>, context): Promise<User> {
        const { id, dto } = args;
        const changedUser = await context.prisma.user.update({
            where: { id },
            data: dto,
        })

        return changedUser;
    },
    deleteUser: async function (_source, args: IdArgs<User>, context): Promise<boolean> {
        const { id } = args;

        try {
            await context.prisma.user.delete({
                where: { id },
            });

            return true;
        } catch (e) {
            return false;
        }
    },
    userSubscribedTo: async function (source: User, _args, context): Promise<(User | Error)[] | null> {
        let subscribers: null | SubscribersOnAuthors[];

        if (
            typeof source === 'object' &&
            source &&
            'userSubscribedTo' in source &&
            Array.isArray(source.userSubscribedTo)
        ) {
            subscribers = source.userSubscribedTo;
        } else {
            subscribers = null;
        }

        return subscribers
            ? await context.loaders.usersDataloader.loadMany(
                subscribers.map((subscriber) => subscriber.authorId),
            )
            : null;

        // const userSubscriptions = await context.prisma.user.findMany({
        //     where: {
        //         subscribedToUser: {
        //             some: {
        //                 subscriberId: source.id,
        //             },
        //         },
        //     },
        // });
        //
        // return userSubscriptions;
    },
    subscribedToUser: async function (source: User, _args, context): Promise<(User | Error)[] | null> {
        let subscribers: null | SubscribersOnAuthors[];

        if (
            typeof source === 'object' &&
            source &&
            'subscribedToUser' in source &&
            Array.isArray(source.subscribedToUser)
        ) {
            subscribers = source.subscribedToUser;
        } else {
            subscribers = null;
        }

        return subscribers
            ? await context.loaders.usersDataloader.loadMany(
                subscribers.map((subscriber) => subscriber.subscriberId),
            )
            : null;

        // const userFans = await context.prisma.user.findMany({
        //     where: {
        //         userSubscribedTo: {
        //             some: {
        //                 authorId: source.id,
        //             },
        //         },
        //     },
        // });
        //
        // return userFans;
    },
};

export default userResolvers;
