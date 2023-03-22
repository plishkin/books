import {IEntity} from "./IEntity";
import {ICollectionParams} from "./ICollectionParams";

export interface ICollection extends ICollectionParams {
    totalCount: number,
    itemsCount: number,
    items: IEntity[],
}
