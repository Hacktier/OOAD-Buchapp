<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
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
          <ion-label class="ion-text-wrap" v-if="book.title" v-text="book.title"/>
        </ion-item>
        <ion-item v-if="book.subtitle">
          <ion-label class="ion-text-wrap" v-text="book.subtitle"/>
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
  IonBackButton,
  IonButtons,
  IonImg,
  IonThumbnail,
  IonInput
} from '@ionic/vue';
import {defineComponent} from 'vue';
import BookStorage from "@/service/BookStorage"
import Book from "@/model/Book";

export default defineComponent({

  ionViewWillLeave() {
    if (!this.storage || !this.book) {
      return;
    }

    this.storage.updateSingle("user", this.book)
  },

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
    IonBackButton,
    IonButtons,
    IonImg,
    IonThumbnail,
    IonInput
  },

  data: () => ({
    book: null as Book | null,
    storage: null as BookStorage | null
  }),


  async created() {
    const id = this.$route.params["id"] as string;
    this.storage = new BookStorage()

    this.book = await this.storage.getSingle("user", id);
  },

  methods: {
    deleteBook() {
      if (!this.storage || !this.book) {
        return;
      }

      this.storage.deleteSingle("user", this.book.id);
    },

    changeState() {
      if (!this.storage || !this.book) {
        return;
      }

      this.book.finished = !this.book.finished;
      this.storage.updateSingle("user", this.book)
    }
  }
});
</script>