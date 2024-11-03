import { GraphQLFieldResolver } from 'graphql';
import { Post, User } from '@prisma/client';
import { Context } from '../get-gql-context.js';
import { ChangeArgs, CreateArgs, IdArgs } from '../interfaces/args.js';

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
    createPost: async function (_source, args: CreateArgs<Post>, context): Promise<Post> {
        const newPost = await context.prisma.post.create({
            data: args.dto,
        });
        console.log('new post', args, newPost);

        return newPost;
    },
    changePost: async function (_source, args: ChangeArgs<Post>, context): Promise<Post> {
        const { id, dto } = args;
        const changedPost = await context.prisma.post.update({
            where: { id },
            data: dto,
        });

        return changedPost;
    },
    deletePost: async function (_source, args: IdArgs<Post>, context): Promise<boolean> {
        const { id } = args;
        try {
            await context.prisma.post.delete({
                where: { id },
            });

            return true;
        } catch (e) {
            return false;
        }
    },
    postByUserId: async function (source, _args, context): Promise<Post[] | null> {
        const { id } = <User>source;
        // const posts = await context.prisma.post.findMany({
        //     where: { authorId: id },
        // });
        const posts = await context.loaders.postsOfUserDataloader.load(id);

        return posts;
    },
};

export default postResolvers;