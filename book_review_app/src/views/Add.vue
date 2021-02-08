<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Buch hinzufügen</ion-title>
      </ion-toolbar>
    </ion-header>


    <ion-content>
      <ion-searchbar v-model="enteredBook" @ionChange="resolveBook()" id="title"></ion-searchbar>

      <ion-list>
        <ion-item v-if="books==null">Kein Buch gefunden!</ion-item>
        <ion-item

        v-for="book in books"
        :key="book.id"
        >
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

    <ion-button expand="block" color="success" router-link='/show'>Save</ion-button>

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
  IonButton,
  IonSearchbar,
  IonImg,
  IonList,
  IonThumbnail,
} from '@ionic/vue';
import axios from 'axios';

import {defineComponent} from 'vue';

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
    IonButton,
    IonSearchbar,
    IonImg,
    IonList,
    IonThumbnail,
  },
  data() {
    return {
      enteredBook:"",
      books: null
    };
  },

  methods: {
  //  save: function () {
      // new Book(
      //     document.getElementById('title').value,
      //     document.getElementById('rating').value
      // );
  //  }
    resolveBook() {
      if(this.enteredBook.length<3) {
        console.log("didn't")
        this.books = null
        return
      }
        axios
            .get('https://www.googleapis.com/books/v1/volumes' + '?q=' + this.enteredBook)
            .then(response => {
              if(response.status!=200 || response.data.totalItems == 0) {
                this.books=null
              } else
                  this.books = response.data.items
            })
            .catch(error => console.log(error))
    },
  }
});
</script>

<style scoped>

</style>