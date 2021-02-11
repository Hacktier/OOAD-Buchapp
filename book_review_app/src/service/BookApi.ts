import {BookFetcher} from "@/service/BookFetcher";
import Book from "@/model/Book";
import axios from "axios";
//import resolve from "node-isbn";

export class BookApi implements BookFetcher {
    bookList: Array<Book> = new Array<Book>();

    fetchBookByISBN(isbn: string): Array<Book> | null {
    /*    this.bookList = new Array<Book>();
        resolve(isbn, (err: any, book: any) => {
            if (err) {
                console.log('Book not found', err);
                return null;
            } else {
                console.log('Book found %j', book);
                this.bookList.push(new Book(book.id, book.title, book.authors.toString(), book.subtitle, book.description, false, null, book.published_date, book.imageLinks.smallThumbnail, book.pageCount))

            }
        });*/
    return this.bookList;
    }

    fetchBooks(reqParam: string): Array<Book> | null {
        this.bookList = new Array<Book>();
        if (reqParam.length < 3) {
            return null;
        }
        axios
            .get('https://www.googleapis.com/books/v1/volumes' + '?q=' + reqParam)
            .then(response => {
                if (response.status != 200 || response.data.totalItems == 0) {
                    return null;
                } else {
                    const resItems = response.data.items;
                    resItems.forEach((book: { id: string; volumeInfo: { title: string; authors: { toString: () => string}; subtitle: string | null; description: string; published_date: string | undefined; imageLinks: { smallThumbnail: string | undefined}; pageCount: bigint | undefined}; thumbnail_url: any } ) => {
                        this.bookList.push(new Book(book.id, book.volumeInfo.title, book.volumeInfo.authors.toString(), book.volumeInfo.subtitle, book.volumeInfo.description, false, null, book.volumeInfo.published_date, book.volumeInfo.imageLinks.smallThumbnail, book.volumeInfo.pageCount))
                    });
                    return this.bookList
                }

            })
            .catch(error => console.log(error))
        return null;
    }
}