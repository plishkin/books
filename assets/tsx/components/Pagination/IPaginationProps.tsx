import {ICollection} from "../../Models/ICollection";

export interface IPaginationProps extends ICollection {
    pageChange(page: number): void,
    paginationCount: number,
}