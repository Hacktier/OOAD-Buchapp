import BookStorage from "@/service/BookStorage";
import Book from "@/model/Book";
import {BookApi} from "@/service/BookApi";
import {BookFetcher} from "@/service/BookFetcher";


export default class BookRepository {

    private bookStorage: BookStorage = new BookStorage();
    bookFetcher: BookFetcher = new BookApi();
    storeBook(key: string, value: Book) {
        this.bookStorage.setData(key, value);
    }

    async getBook(key: string) {
        return await this.bookStorage.getData(key);
    }

    async getAllBooks() {
        return await this.bookStorage.getKeys();
    }

    async deleteStoredBook(key: string) {
        this.bookStorage.deleteData(key);
    }

    async deleteStorage() {
        this.bookStorage.deleteAll();
    }

    fetchBooks(key: string) {
        return this.bookFetcher.fetchBooks(key);
    }

}