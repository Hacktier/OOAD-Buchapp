import Book from "@/model/Book";

export default interface BookRepository {
    search(term: string): Promise<Array<Book>>;
}
