import Book from "@/model/Book";
import {Plugins} from "@capacitor/core";
import BookFactory from "@/factories/BookFactory";

const { Storage } = Plugins

export default class BookStorage {
    async setData(key: string, value: Book) {
        const rawExisting = await this.getData(key);

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

    async getData(key: string) {
        return await Storage.get({key});
    }

    async getSingle(key: string, id: string) {
        const factory = new BookFactory();
        const rawBooks = await this.getData("user");

        if (!rawBooks.value) {
            return null;
        }

        const book = JSON.parse(rawBooks.value).filter((rawBook: Book) => rawBook.id === id);

        if (!book) {
            return null;
        }

        return factory.createFromJson(book[0]);
    }

    async getKeys() {
        return await Storage.keys();
    }

    async deleteSingle(key: string, id: string) {
        const booksRaw = await this.getData(key);

        if (!booksRaw.value) {
            return null;
        }

        const existing = JSON.parse(booksRaw.value);

        existing.splice(existing.findIndex((item: Book) => item.id === id), 1)

        await Storage.set({
            key,
            value: JSON.stringify(existing)
        });
    }

    async updateData(key: string, book: Book) {
        const booksRaw = await this.getData(key);

        if (!booksRaw.value) {
            return null;
        }

        const existing = JSON.parse(booksRaw.value);

        existing[existing.findIndex((item: Book) => item.id === book.id)] = book;

        await Storage.set({
            key,
            value: JSON.stringify(existing)
        });
    }

    async deleteData(key: string) {
        await Storage.remove({key});
    }
}