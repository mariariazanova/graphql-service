import { PrismaClient } from '@prisma/client';
import { buildDataloaders, DataloadersInterface } from './data-loaders.js';

export interface Context {
    prisma: PrismaClient;
    loaders: DataloadersInterface;
}

export const getGqlContext = (prisma: PrismaClient): Context => {
    return { loaders: buildDataloaders(prisma), prisma };
};
