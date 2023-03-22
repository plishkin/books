import axios from "axios";
import {IResponse} from "../Models/IResponse";
import {IEntity} from "../Models/IEntity";
import {ICollectionParams} from "../Models/ICollectionParams";
import {ICollectionResponse} from "../Models/ICollectionResponse";

const url = (entityName: string, id?: number) =>
    `${api.host}/api/restful/${entityName}` + (id ? `/${id}` : ``);

export const api = {
    host: '',
    create: (entityName: string, entity: IEntity) => axios({
            method: 'post',
            url: url(entityName),
            data: entity,
            responseType: "json"
        }).then(resp => resp.data) as Promise<IResponse>,

    read: (entityName: string, id: number) => axios({
        method: 'get',
        url: url(entityName, id),
        responseType: "json"
    }).then(resp => resp.data) as Promise<IResponse>,

    update: (entityName: string, entity: IEntity) => axios({
        method: 'put',
        url: url(entityName, entity.id),
        data: entity,
        responseType: "json"
    }).then(resp => resp.data) as Promise<IResponse>,

    delete: (entityName: string, id: number) => axios({
        method: 'delete',
        url: url(entityName, id),
        responseType: "json"
    }).then(resp => resp.data) as Promise<IResponse>,

    getCollection: (entityName: string, collectionParams: ICollectionParams) => axios({
        method: 'get',
        url: url(entityName) + '?' + (new URLSearchParams(collectionParams as any)),
        responseType: "json"
    }).then(resp => resp.data) as Promise<ICollectionResponse>
}
