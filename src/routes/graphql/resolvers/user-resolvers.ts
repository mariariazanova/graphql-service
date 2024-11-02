import { GraphQLFieldResolver } from 'graphql';
import { User } from '@prisma/client';
import { Context } from '../get-gql-context.js';
import { ChangeArgs, CreateArgs, IdArgs } from '../interfaces/args.js';

const userResolvers: { [key: string]: GraphQLFieldResolver<User, Context> } = {
    usersAll: async function (_source, _args, context): Promise<User[]> {
        const users = await context.prisma.user.findMany();
        console.log('users', users);

        return users;
    },
    userById: async function (_source, args: IdArgs<User>, context): Promise<User | null> {
        const { id } = args;
        const user = await context.prisma.user.findUnique({
            where: { id },
        });

        console.log('user with id', _source, args.id, user);

        return user;
    },
    createUser: async function (_source, args: CreateArgs<User>, context): Promise<User | null> {
        const newUser = await context.prisma.user.create({
            data: args.dto,
        });
        console.log('newUser', args, newUser);

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
        const userSubscriptions = await context.prisma.user.findMany({
            where: {
                subscribedToUser: {
                    some: {
                        subscriberId: source.id,
                    },
                },
            },
        });

        return userSubscriptions;
    },
    subscribedToUser: async function (source: User, _args, context): Promise<(User | Error)[] | null> {
        const userFans = await context.prisma.user.findMany({
            where: {
                userSubscribedTo: {
                    some: {
                        authorId: source.id,
                    },
                },
            },
        });

        return userFans;
    },
};

export default userResolvers;
