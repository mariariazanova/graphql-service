import DataLoader from 'dataloader';
import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';

export function buildDataloaders(prisma: PrismaClient): DataloadersInterface {
    async function userBatch(ids: readonly string[]): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: ids as string[],
                },
            },
            include: {
                subscribedToUser: true,
                userSubscribedTo: true,
            },
        });
        const usersMap = new Map<string, User[]>();

        users.forEach((user) => (usersMap[user.id] = user));

        return ids.map((id) => <User>usersMap[id]);
    }
    async function postBatch(userIds: readonly string[]): Promise<Post[][]> {
        const postsOfUser = await prisma.post.findMany({
            where: {
                authorId: {
                    in: userIds as string[],
                },
            },
        });
        const postsMap = new Map<string, Post[]>();

        postsOfUser.forEach((post) => {
            const postsByAuthor = postsMap.get(post.authorId);

            postsByAuthor ? postsByAuthor.push(post) : (postsMap[post.authorId] = [post]);

        });

        return userIds.map((id) => <Post[]>postsMap[id] || []);
    }

    async function memberTypeBatch(memberTypeId: readonly string[]): Promise<MemberType[]> {
        const memberTypes = await prisma.memberType.findMany({
            where: {
                id: {
                    in: memberTypeId as string[],
                },
            },
        });
        const memberTypeMap = new Map<string, MemberType>();

        memberTypes.forEach((memberType) => (memberTypeMap[memberType.id] = memberType));

        return memberTypeId.map((id) => <MemberType>memberTypeMap[id]);
    }

    async function profileBatch(userIds: readonly string[]): Promise<Profile[]> {
        const profilesOfUsers = await prisma.profile.findMany({
            where: {
                userId: {
                    in: userIds as string[],
                },
            },
        });
        const profilesMap = new Map<string, Profile>();

        profilesOfUsers.forEach((profile) => (profilesMap[profile.userId] = profile));

        return userIds.map((id) => <Profile>profilesMap[id]);
    }

    return {
        usersDataloader: new DataLoader<string, User>(userBatch),
        postsOfUserDataloader: new DataLoader<string, Post[]>(postBatch),
        memberTypeDataloader: new DataLoader<string, MemberType>(memberTypeBatch),
        profileDataloader: new DataLoader<string, Profile>(profileBatch),
    };
}
export interface DataloadersInterface {
    usersDataloader: DataLoader<string, User>;
    profileDataloader: DataLoader<string, Profile>;
    postsOfUserDataloader: DataLoader<string, Post[]>;
    memberTypeDataloader: DataLoader<string, MemberType>;
}
