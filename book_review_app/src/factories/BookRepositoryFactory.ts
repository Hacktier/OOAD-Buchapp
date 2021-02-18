// Copyright 2021 Markus Kapp & Jonas Nelson
// BookRepositoryFactory.ts
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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