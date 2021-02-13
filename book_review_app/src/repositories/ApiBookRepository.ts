import Book from "@/model/Book";
import axios from "axios";
import BookRepository from "@/repositories/BookRepository";
import {v4 as uuidv4} from "uuid";

interface ApiBooksInterface {
    id: string;
    volumeInfo: {
        title: string;
        authors: { toString: () => string };
        subtitle: string | null;
        description: string;
        // TODO: Prüfen ob das wirklich undefined ist oder null. Normalerweise geben
        // APIS immer das gleiche Schema zurück und es ist schwer zu glauben, dass die
        // Google API einfach Einträge weglässt
        published_date: number | undefined;
        // TODO: Siehe oben
        imageLinks: { smallThumbnail: string | undefined };
        // TODO: Siehe oben
        pageCount: number | undefined;
        // TODO: any NIEMALS nutzen. Bitte genauen Typ definieren /!\
        // TODO: Thumbnail_url eine Zeile tiefer
    };
    thumbnail_url: any;
}

export {ApiBooksInterface};

export class ApiBookRepository implements BookRepository {
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
            // TODO: Template Lirerual verwenden: `https://…………${term}`
            .get('https://www.googleapis.com/books/v1/volumes?q=' + term)
            .then(response => {
                if (response.status !== 200 || response.data.totalItems == 0) {
                    return [];
                }

                const foundBooks = response.data.items;
                foundBooks.forEach(
                    (book: ApiBooksInterface) => {
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