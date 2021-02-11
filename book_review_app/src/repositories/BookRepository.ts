import Book from "@/model/Book";
import LocalBookRepository from "@/repositories/LocalBookRepository"

export default interface BookRepository {

    search(term: string): Book;
}
