import {IBook} from "./IBook";
import {ICollection} from "./ICollection";

export interface IBookCollection extends ICollection{
    items: IBook[],
}
