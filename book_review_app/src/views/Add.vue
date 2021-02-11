<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Buch hinzufügen</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content>
      <ion-searchbar v-model="enteredBook" @ionChange="resolveBook()" id="title"></ion-searchbar>

      <ion-list>
        <ion-item v-if="!books">Kein Buch gefunden!</ion-item>
        <ion-item v-for="book in books" :key="book.id" :router-link="/detail/ + id"
                  v-on:click="save(book.title, book.subtitle, book.author, book.description)">
          <ion-thumbnail slot="start">
            <ion-img
                :src="book.thumbnail"
                :alt="book.title">
            </ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <p>{{ book.description }}</p>
          </ion-label>
          <ion-label></ion-label>
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
  IonButtons,
} from '@ionic/vue';

import {defineComponent} from 'vue';
import Book from "@/model/Book";
import BookStorage from "@/service/BookStorage";
import BookRepository from "@/repository/BookRepository";
import {v4 as uuidv4} from "uuid";

export default defineComponent({
  name: 'Add',
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
    IonButtons,
  },
  data() {
    return {
      enteredBook: "",
      books: '',
      id: '',
      repository: null as BookRepository | null
    };
  },
  created() {
    this.id = uuidv4();
  },

  methods: {
    save(title: string, subtitle: string, author: string, description: string) {

      this.repository = new BookRepository();
      if (!this.id) {
        return;
      }

      this.repository.storeBook(this.id, new Book(this.id, title, subtitle, author, description, false, null));
    },
    resolveBook() {
      this.repository = new BookRepository();
      this.books=this.repository.fetchBooks(this.enteredBook)
    },
  }
});
</script>

<style scoped>

</style>