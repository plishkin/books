import {IEntity} from "./IEntity";

export interface IBook extends IEntity{
    title?: string
    publisher?: string
    author?: string
    genre?: string
    published_at?: number
    words_amount?: number
    price?: number
}
