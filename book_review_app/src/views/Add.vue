// Copyright 2021 Markus Kapp & Jonas Nelson
// Add.vue
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

// Verantwortlich: Markus Kapp
// Mitwirkend: Jonas Nelson

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-button fill="clear" router-link='/home' slot="start">
          <ion-icon name="chevron-back"/>
          Back
        </ion-button>
        <ion-title>Add Book</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-searchbar v-model="enteredBook" @ionChange="getBooks()" id="title"/>

      <ion-list>
        <ion-item v-if="!books">No books found!</ion-item>
        <ion-item v-for="book in books"
                  :key="book.id"
                  :router-link="`/detail/${id}`"
                  @click="save(book.title, book.author, book.subtitle,book.description, book.publishedDate, book.thumbnailUrl,book.pageCount)"
        >
          <ion-thumbnail slot="start" v-if="book.thumbnailUrl">
            <ion-img
                :src="book.thumbnailUrl"
                :alt="book.title">
            </ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2 v-text="book.title"/>
            <h3 v-text="book.subtitle"/>
            <p v-text="book.description"/>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonImg,
  IonList,
  IonThumbnail,
  IonIcon,
  IonButton

} from '@ionic/vue';
import {defineComponent} from 'vue';
import Book from "@/model/Book";
import BookStorage from "@/service/BookStorage";
import {v4 as uuidv4} from "uuid";
import BookRepositoryInterface from "@/repositories/BookRepositoryInterface";
import BookRepositoryFactory from "@/factories/BookRepositoryFactory";
import {cartOutline, chevronBack} from 'ionicons/icons';
import {addIcons} from "ionicons";

addIcons({chevronBack, "cart-outline": cartOutline})

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonImg,
    IonList,
    IonThumbnail,
    IonIcon,
    IonButton
  },

  data: () => ({
    enteredBook: '',
    books: [] as Book[] | null,
    id: '',
    repository: null as BookRepositoryInterface | null
  }),

  ionViewWillEnter() {
    this.enteredBook = '';
    this.id = uuidv4();
  },

  methods: {
    save(
        title: string,
        author: string,
        subtitle: string,
        description: string,
        publishedDate: number,
        thumbnailUrl: string,
        pageCount: number
    ): void {
      const storage = new BookStorage();
      storage.set(
          "user",
          new Book(
              this.id,
              title,
              author,
              subtitle,
              description,
              false,
              null,
              publishedDate,
              thumbnailUrl,
              pageCount
          )
      );
    },

    async getBooks(): Promise<void> {
      this.repository = new BookRepositoryFactory().create();
      this.books = await this.repository.search(this.enteredBook);
    }
  }
});
</script>