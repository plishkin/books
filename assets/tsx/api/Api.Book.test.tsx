import {api} from "./Api";
import {IBook} from "../Models/IBook";

const env = require('dotenv').config().parsed;
api.host = `${env.APP_URL}:${env.APP_PORT}`;

const book: IBook = {
    title: 'api test title',
    publisher: 'publisher',
    genre: 'genre',
    published_at: 780000,
    author: 'author',
    words_amount: 40000,
    price: 23.15,
};

test('api books read', async () => {
    await api.getCollection('Book', {perPage: 1, pageNo: 1})
        .then(resp => {
            expect(resp).toHaveProperty('success');
            expect(resp.success).toBe(true);
            expect(resp).toHaveProperty('items');
            expect(resp.items).toBeInstanceOf(Array);
        });
});

test('api books crud', async () => {
    const b = {...book};
    await api.create('Book', b)
        .then(resp => {
            expect(resp).toHaveProperty('success');
            expect(resp.success).toBe(true);
            expect(resp).toHaveProperty('item');
            expect(resp.item).toBeInstanceOf(Object);
            expect(resp.item).toHaveProperty('id');
            expect(resp.item.id).toBeGreaterThan(0);
            b.id = resp.item.id;
        });
    await api.read('Book', b.id)
        .then(resp => {
            expect(resp).toHaveProperty('success');
            expect(resp.success).toBe(true);
            expect(resp).toHaveProperty('item');
            expect(resp.item).toBeInstanceOf(Object);
        });
    b.words_amount = 123456;
    await api.update('Book', b)
        .then(resp => {
            expect(resp).toHaveProperty('success');
            expect(resp.success).toBe(true);
            expect(resp).toHaveProperty('item');
            expect(resp.item).toBeInstanceOf(Object);
            expect(resp.item).toHaveProperty('words_amount');
            expect(resp.item.words_amount).toBe(b.words_amount);
        });
    await api.delete('Book', b.id)
        .then(resp => {
            expect(resp).toHaveProperty('success');
            expect(resp.success).toBe(true);
            expect(resp).toHaveProperty('item');
            expect(resp.item).toHaveProperty('id');
        });
});