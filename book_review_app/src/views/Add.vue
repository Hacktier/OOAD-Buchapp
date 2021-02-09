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
                  v-on:click="save(book.volumeInfo.title, book.volumeInfo.subtitle, book.volumeInfo.description)">
          <ion-thumbnail slot="start">
            <ion-img
                :src="book.volumeInfo.imageLinks.thumbnail"
                :alt="book.volumeInfo.title">
            </ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2>{{ book.volumeInfo.title }}</h2>
            <h3>{{ book.volumeInfo.subtitle }}</h3>
            <p>{{ book.volumeInfo.description }}</p>
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
  IonButtons
} from '@ionic/vue';
import axios from 'axios';

import {defineComponent} from 'vue';
import Book from "@/model/Book";
import BookStorage from "@/service/BookStorage";
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
    IonButtons
  },
  data() {
    return {
      enteredBook: "",
      books: null,
      id: ''
    };
  },
  created() {
    this.id = uuidv4();
  },

  methods: {
    save(title: string, subtitle: string, description: string) {

      const storage = new BookStorage();
      if (!this.id) {
        return;
      }

      storage.setData(this.id, new Book(this.id, title, subtitle, description, null, false));
    },
    resolveBook() {
      if (this.enteredBook.length < 3) {
        this.books = null
        return
      }
      axios
          .get('https://www.googleapis.com/books/v1/volumes' + '?q=' + this.enteredBook)
          .then(response => {
            if (response.status != 200 || response.data.totalItems == 0) {
              this.books = null
            } else
              console.log(response.data.items.volumeInfo)
            this.books = response.data.items
          })
          .catch(error => console.log(error))
    },
  }
});
</script>

<style scoped>

</style>