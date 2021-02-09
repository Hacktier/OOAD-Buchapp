import Book, {BookInterface} from "@/model/Book";

export default class BookFactory {
    public createFromJson(json: BookInterface): Book {
        return new Book(
            json['id'],
            json['title'],
            json['subtitle'],
            json['description'],
            json['rating'],
            json['finished']
        );
    }
}