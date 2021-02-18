// Verantwortlich: Jonas Nelson
// Mitwirkend: Markus Kapp

import BookRepositoryInterface from "@/repositories/BookRepositoryInterface";
import LocalBookRepository from "@/repositories/LocalBookRepository";
import {ApiBookRepository} from "@/repositories/ApiBookRepository";

export default class BookRepositoryFactory {
    create(): BookRepositoryInterface {
        return LocalBookRepository.getInstance(ApiBookRepository.getInstance());
    }
}