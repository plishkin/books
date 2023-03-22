import {IEntity} from "./IEntity";

export interface IResponse {
    success: boolean,
    message: string,
    item?: IEntity,
    errors?: string[],
}
