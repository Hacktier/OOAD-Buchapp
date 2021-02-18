// Verantwortlich: Markus Kapp
// Mitwirkend: Jonas Nelson

import Book from "@/model/Book";
export default interface BookRepositoryInterface {
    search(term: string): Promise<Array<Book>>;
}
