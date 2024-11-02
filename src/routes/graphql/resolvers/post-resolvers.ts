import { GraphQLFieldResolver } from 'graphql';
import {Post} from '@prisma/client';
import { Context } from '../get-gql-context.js';
import { IdArgs} from '../interfaces/args.js';

const postResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
    postsAll: async function (_source, _args, context): Promise<Post[]> {
        const posts = await context.prisma.post.findMany();
        console.log("posts", posts);

        return posts;
    },
    postById: async function (_source, args: IdArgs<Post>, context): Promise<Post | null> {
        const { id } = args;
        console.log('args', args, id);
        const post = await context.prisma.post.findUnique({
            where: { id },
        });

        console.log('post by id', args.id, post);

        return post ?? null;
    },
    createPost: async function (_source, args: Post, context): Promise<Post> {
        const newPost = await context.prisma.post.create({
            data: args,
        });
        console.log('new post', args, newPost);

        return newPost;
    },
};

export default postResolvers;