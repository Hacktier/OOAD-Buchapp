// Verantwortlich: Markus Kapp
// Mitwirkend: Jonas Nelson

import Book from "@/model/Book";
import {Plugins} from "@capacitor/core";
import BookFactory from "@/factories/BookFactory";

const { Storage } = Plugins

export default class BookStorage {
    async set(key: string, value: Book): Promise<void> {
        const rawExisting = await this.getAllByKey(key);

        if (!rawExisting.value) {
            await Storage.set({
                key,
                value: JSON.stringify([value])
            });

            return;
        }

        const existing = JSON.parse(rawExisting.value);
        existing.push(value);

        await Storage.set({
            key,
            value: JSON.stringify(existing)
        });

    }

    async getAllByKey(key: string): Promise<{ value: string | null }> {
        return await Storage.get({key});
    }

    async getSingle(key: string, id: string): Promise<Book | null>{
        const rawBooks = await this.getAllByKey(key);

        if (!rawBooks.value) {
            return null;
        }

        const book = JSON.parse(rawBooks.value).filter((rawBook: Book) => rawBook.id === id);
        const factory = new BookFactory();

        return book ? factory.createFromJson(book[0]) : null;
    }

    async getKeys(): Promise<{ keys: string[] }> {
        return await Storage.keys();
    }

    async deleteSingle(key: string, id: string): Promise<void> {
        const booksRaw = await this.getAllByKey(key);

        if (!booksRaw.value) {
            return;
        }

        const existing = JSON.parse(booksRaw.value);

        existing.splice(existing.findIndex((item: Book) => item.id === id), 1)

        await Storage.set({
            key,
            value: JSON.stringify(existing)
        });
    }

    async updateSingle(key: string, book: Book): Promise<void> {
        const booksRaw = await this.getAllByKey(key);

        if (!booksRaw.value) {
            return;
        }

        const existing = JSON.parse(booksRaw.value);

        existing[existing.findIndex((item: Book) => item.id === book.id)] = book;

        await Storage.set({
            key,
            value: JSON.stringify(existing)
        });
    }

    async deleteAll(): Promise<void> {
        await Storage.clear();
    }
}