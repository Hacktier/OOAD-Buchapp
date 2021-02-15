<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Overview</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item :router-link="book.detailRoute"
                  v-for="book in books"
                  :key="book.title">
          <ion-thumbnail slot="start" v-if="book.thumbnailUrl"> <!--//TODO als Template weil selber code in Home und Detail-->
            <ion-img
                :src="book.thumbnailUrl"
                :alt="book.title">
            </ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2 v-text="book.title"></h2>
            <ion-note v-text="book.subtitle"/>
          </ion-label>
          <ion-badge :color="book.labelColor" slot="end" v-text="book.finishedReading"/>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed" router-link='/add'>
        <ion-fab-button>
          <ion-icon icon="add"/>
        </ion-fab-button>
      </ion-fab>
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
  IonLabel,
  IonItem,
  IonBadge,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonImg,
  IonThumbnail,
  IonNote
} from '@ionic/vue';

import {defineComponent} from 'vue';
import {addIcons} from 'ionicons'
import {add, cartOutline} from 'ionicons/icons'
import BookStorage from "@/service/BookStorage"
import BookFactory from "@/factories/BookFactory";
import Book from "@/model/Book";

addIcons({add, "cart-outline": cartOutline})

export default defineComponent({

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonBadge,
    IonList,
    IonIcon,
    IonFab,
    IonFabButton,
    IonImg,
    IonThumbnail,
    IonNote
  },

  data: () => ({
    books: [] as Book[],
  }),

  async ionViewWillEnter() {
    const storage = new BookStorage()
    const factory = new BookFactory();
    const rawBooks = await storage.getAllByKey("user");
    const books = JSON.parse(rawBooks.value ?? '') as Book[];

    this.books = [];
    this.books = books.map(book => factory.createFromJson(book));
  },
});
</script>