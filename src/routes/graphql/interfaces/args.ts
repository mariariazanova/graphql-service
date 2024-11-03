export interface IdArgs<T extends { id: string }> extends Pick<T, 'id'> {}

export interface CreateArgs<T> {
    dto: Omit<T, 'id'>;
}

export interface ChangeArgs<T> {
    id: string;
    dto: Omit<T, 'id'>;
}

export interface SubscribeArgs {
    userId: string;
    authorId: string;
}
