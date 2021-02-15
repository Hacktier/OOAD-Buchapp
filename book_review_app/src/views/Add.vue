<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button/>
        </ion-buttons>
        <ion-title>Add Book</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-searchbar v-model="enteredBook" @ionChange="getBooks()" id="title"/>

      <ion-list>
        <ion-item v-if="!books">No books found!</ion-item>
        <!-- TODO: Bitte bei router-link um das "/detail/" noch Anführungszeichen. Das ist ein bisschen Hacky so. Oder gleich Template Literals: `/detail/${id}` -->

        <ion-item v-for="book in books"
                  :key="book.id"
                  :router-link="/detail/ + id"
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
  IonBackButton,
  IonButtons
} from '@ionic/vue';
import {defineComponent} from 'vue';
import Book from "@/model/Book";
import BookStorage from "@/service/BookStorage";
import {v4 as uuidv4} from "uuid";
import BookRepositoryInterface from "@/repositories/BookRepositoryInterface";
import BookRepositoryFactory from "@/factories/BookRepositoryFactory";

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
    IonBackButton,
    IonButtons
  },

  data: () => ({
    enteredBook: '',
    books: [] as Book[] | null,
    id: '',
    repository: null as BookRepositoryInterface | null
  }),

  created() {
    this.id = uuidv4();
  },

  methods: {
    // TODO Typehint vergessen
    save(
        title: string,
        author: string,
        subtitle: string,
        description: string,
        publishedDate: number,
        thumbnailUrl: string,
        pageCount: number
    ) {
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

    // TODO: Promise<Array<Book>>  return type
    async getBooks(){
      if (this.enteredBook.length < 3) {
        this.books = null;
        return;
      }

      this.repository = new BookRepositoryFactory().create();
      this.books = await this.repository.search(this.enteredBook);
    }
  }
});
</script>