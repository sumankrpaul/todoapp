import type { IUser } from "./IUser.interfaces";

export enum ITodoStatus {
    Draft = "DRAFT", InPogress = "INPOGRESS", OnHold = "HOLD", Compleated = "COMPLETED"
}

export interface ITodo {
    id: number;
    title: string;
    description: string;
    status: ITodoStatus;
    createdAt: string;
    updateAt?: string;
    createdBy: IUser;
    ownerId: number;
    sharedTo?: IUser | null;
    sharedId?: number | null;
    sharedOn?: string;
    complatedOn?: string;
}