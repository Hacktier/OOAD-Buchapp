import Book from "@/model/Book";

export interface BookFetcher {
    bookList: Array<Book>;
    fetchBooks(reqParam: string): Array<Book> | null;
    fetchBookByISBN(isbn: string): Array<Book> | null;
}