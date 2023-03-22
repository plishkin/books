import {IResponse} from "./IResponse";
import {IBook} from "./IBook";

export interface IBookResponse extends IResponse {
    item?: IBook,
}
