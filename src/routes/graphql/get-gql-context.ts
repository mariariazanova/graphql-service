import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Context {
    prisma: PrismaClient;
    loaders: Map<string, DataLoader<any, any>>;
}

export const getGqlContext = (prisma: PrismaClient): Context => {
    return { loaders: new Map(), prisma };
};
