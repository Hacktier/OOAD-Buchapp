// Copyright 2021 Markus Kapp & Jonas Nelson
// Detail.vue
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
        <ion-title>Detail View</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="book">
      <ion-list>
        <ion-item v-if="book.thumbnailUrl || book.title">
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
        </ion-item>
        <ion-item v-if="book.author">
          <ion-label v-text="book.author"/>
        </ion-item>
        <ion-item v-if="book.publishedDate">
          <ion-label>
            Published:
            <span v-text="book.publishedDate"/>
          </ion-label>
        </ion-item>
        <ion-item v-if="book.pageCount">
          <ion-label>
            Page:
          </ion-label>
          <ion-input type="number" :value="book.currentPage" inputmode="decimal" v-model="book.currentPage"></ion-input>
          <p> of &ensp;</p>
          <p v-text="book.pageCount"/>
        </ion-item>
        <ion-item>
          <ion-label>
            Rating:
          </ion-label>
          <ion-input type="number" :value="book.rating" inputmode="decimal" v-model="book.rating"></ion-input>
          of &ensp;10
        </ion-item>
        <ion-item v-if="book.description">
          <ion-label class="ion-text-wrap">
            Summary: <br> <br>
            <span v-text="book.description"/>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer v-if="book">
      <ion-button expand="block" :color="book.labelColor" v-on:click="changeState">
        <span v-text="book.finishedReading"/>
      </ion-button>
      <ion-button expand="block" color="danger" @click="deleteBook" router-link='/home'>Delete</ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFooter,
  IonImg,
  IonThumbnail,
  IonInput,
  IonNote,
  IonIcon

} from '@ionic/vue';
import {defineComponent} from 'vue';
import BookStorage from "@/service/BookStorage"
import Book from "@/model/Book";
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
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonFooter,
    IonImg,
    IonThumbnail,
    IonInput,
    IonNote,
    IonIcon,
  },

  data: () => ({
    book: null as Book | null,
    storage: null as BookStorage | null
  }),

  async ionViewWillEnter() {
    const id = this.$route.params["id"] as string;
    this.storage = new BookStorage()
    this.book = await this.storage.getSingle("user", id);
  },

  ionViewWillLeave() {
    if (!this.storage || !this.book) {
      return;
    }

    this.storage.updateSingle("user", this.book)
  },

  methods: {
    deleteBook(): void {
      if (!this.storage || !this.book) {
        return;
      }

      this.storage.deleteSingle("user", this.book.id);
      this.book = null;
    },

    changeState(): void {
      if (!this.storage || !this.book) {
        return;
      }

      this.book.finished = !this.book.finished;
      this.storage.updateSingle("user", this.book)
    }
  }
});
</script>