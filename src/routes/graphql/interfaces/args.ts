export interface IdArgs<T extends { id: string }> extends Pick<T, 'id'> {}
