import Book, {BookInterface} from "@/model/Book";

export default class BookFactory {
    public createFromJson(json: BookInterface): Book {
        return new Book(
            json['id'],
            json['title'],
            json['author'],
            json['subtitle'],
            json['description'],
            json['finished'],
            json['rating'],
            json['publishedDate'],
            json['thumbnailUrl'],
            json['pageCount'],

        );
    }
}