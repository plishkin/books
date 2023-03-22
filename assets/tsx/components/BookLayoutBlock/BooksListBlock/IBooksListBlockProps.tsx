import {IBookCollection} from "../../../Models/IBookCollection";

export interface IBooksListBlockProps {
    books: IBookCollection

    updateFromServer(): void
}