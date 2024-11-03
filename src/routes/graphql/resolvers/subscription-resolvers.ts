import { GraphQLFieldResolver } from 'graphql';
import { Context} from '../get-gql-context.js';
import { SubscribeArgs } from '../interfaces/args.js';

const subscriptionResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
    subscribeTo: async function (_source, args: SubscribeArgs, context): Promise<any> {
        const { userId, authorId } = args;
        const result = await context.prisma.subscribersOnAuthors.create({
            data: {
                subscriberId: userId,
                authorId: authorId,
            },
        });

        return authorId;
    },

    unsubscribeFrom: async function (_source, args: SubscribeArgs, context): Promise<boolean> {
        const { userId, authorId } = args;

        try {
            await context.prisma.subscribersOnAuthors.delete({
                where: {
                    subscriberId_authorId: {
                        subscriberId: userId,
                        authorId: authorId,
                    },
                },
            });

            return true;
        } catch (e) {
            return false;
        }
    },
};

export default subscriptionResolvers;
