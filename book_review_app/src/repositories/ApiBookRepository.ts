// Verantwortlich: Jonas Nelson
// Mitwirkend: Markus Kapp

import Book from "@/model/Book";
import axios from "axios";
import BookRepositoryInterface from "@/repositories/BookRepositoryInterface";
import {v4 as uuidv4} from "uuid";

interface ApiBookInterface {
    id: string;
    volumeInfo: {
        title: string;
        authors: { toString: () => string };
        subtitle: string;
        description: string;
        published_date: number;
        imageLinks: { smallThumbnail: string};
        pageCount: number;
    };
    thumbnail_url: string;
}

export {ApiBookInterface};

export class ApiBookRepository implements BookRepositoryInterface {
    private static instance: ApiBookRepository;

    private constructor() {
        ApiBookRepository.instance = this;
    }

    public static getInstance(): ApiBookRepository {
        return ApiBookRepository.instance ?? new ApiBookRepository();
    }

    async search(term: string): Promise<Array<Book>> {
        if (term.length < 3) {
            return [];
        }

        const matchingBooks: Book[] = [];

        return axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${term}&key=AIzaSyAjaGcNFIrzyDnJ1NxqfyUPjwqQ07QTr-A`)
            .then(response => {
                if (response.status !== 200 || response.data.totalItems == 0) {
                    return [];
                }

                const foundBooks = response.data.items;
                foundBooks.forEach(
                    (book: ApiBookInterface) => {
                        matchingBooks.push(
                            new Book(
                                uuidv4(),
                                book.volumeInfo.title,
                                book.volumeInfo?.authors?.toString(),
                                book.volumeInfo.subtitle,
                                book.volumeInfo.description,
                                false,
                                0,
                                book.volumeInfo.published_date,
                                book.volumeInfo.imageLinks?.smallThumbnail,
                                book.volumeInfo.pageCount
                            ))
                    });

                return matchingBooks;
            });
    }
}