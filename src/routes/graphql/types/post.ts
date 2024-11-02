import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLInputObjectType } from 'graphql/type/index.js';
import { Post } from '@prisma/client';
import { UUIDType } from './uuid.js';
import { Context} from '../get-gql-context.js';

const id = { type: new GraphQLNonNull(UUIDType) };
const title = { type: new GraphQLNonNull(GraphQLString) };
const content = { type: GraphQLString };

export const PostType = new GraphQLObjectType<Post, Context>({
    name: 'Post',
    fields: () => ({
        id,
        title,
        content,
    }),
});

export const PostsType = new GraphQLList(PostType);

export const CreatePostInputType = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: () => ({
        title,
        content,
        authorId: id,
    }),
});

export const ChangePostInputType = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: () => ({
        title,
        content,
    }),
});
