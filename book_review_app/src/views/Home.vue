// Copyright 2021 Markus Kapp & Jonas Nelson
// Home.vue
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
        <ion-title>Overview</ion-title>
        <ion-button fill="clear" router-link='/home' slot="end" @click="deleteAll">
          <ion-icon name="trash"/>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item :router-link="book.detailRoute"
                  v-for="book in books"
                  :key="book.title">
          <ion-thumbnail slot="start" v-if="book.thumbnailUrl">
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
  IonNote,
  IonButton
} from '@ionic/vue';

import {defineComponent} from 'vue';

import BookStorage from "@/service/BookStorage"
import BookFactory from "@/factories/BookFactory";
import Book from "@/model/Book";
import {addIcons} from "ionicons";
import {cartOutline, trash, add} from "ionicons/icons";

addIcons({trash, add, "cart-outline": cartOutline,})

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
    IonNote,
    IonButton
  },

  data: () => ({
    books: [] as Book[],
  }),

  async ionViewDidEnter() {
    const storage = new BookStorage()
    const factory = new BookFactory();
    const rawBooks = await storage.getAllByKey("user");

    if (rawBooks.value) {
      const books = JSON.parse(rawBooks.value ?? '') as Book[];
      this.books = books.map(book => factory.createFromJson(book));
    }
  },
  methods: {
    async deleteAll(): Promise<void> {
      const storage = new BookStorage()
      await storage.deleteAll();
      window.location.reload();
    }
  }
});
</script>