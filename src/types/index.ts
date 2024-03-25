export interface CartList {
    id: number,
    title: string,
    uri: string,
    items: CartListItem[]
};

export interface CartListItem {
    id: number,
    title: string
};