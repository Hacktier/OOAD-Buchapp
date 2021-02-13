import BookRepository from "@/repositories/BookRepository";
import LocalBookRepository from "@/repositories/LocalBookRepository";
import {ApiBookRepository} from "@/repositories/ApiBookRepository";

export default class BookRepositoryFactory {
    create(): BookRepository {
        return LocalBookRepository.getInstance(ApiBookRepository.getInstance());
    }
}