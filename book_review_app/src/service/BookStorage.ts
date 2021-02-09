import Book from "@/model/Book";
import {Plugins} from "@capacitor/core";

const { Storage } = Plugins

export default class BookStorage {
    async setData(key: string, value: Book) {
        const res = await Storage.set({
            key,
            value: JSON.stringify(value)
        });
    }

    async getData(key: string) {
        return await Storage.get({key});
    }

    async getKeys() {
        return await Storage.keys();
    }

    async deleteData(key: string) {
        await Storage.remove({key});
    }

    async deleteAll() {
        await Storage.clear();
    }
}