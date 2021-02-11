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
        <ion-item>
          <ion-label>
            {{ book.title }}
          </ion-label>

        </ion-item>
        <ion-item v-if="book.subtitle">
          <ion-label>
            {{ book.subtitle }}
          </ion-label>
        </ion-item>
        <ion-item v-if="book.description">
          {{ book.description }}
        </ion-item>
        <ion-item>
          <ion-label>
            Rating:
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer v-if="book">
      <ion-button expand="block" :color="book.labelColor" v-on:click="changeState">{{ book.finishedReading }}
      </ion-button>
      <ion-button expand="block" color="danger" v-on:click="deleteBook" router-link='/home'>Delete</ion-button>
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
  IonButtons
} from '@ionic/vue';
import {defineComponent} from 'vue';
import BookStorage from "@/service/BookStorage"
import Book from "@/model/Book";
import BookFactory from "@/factories/BookFactory";
import BookRepository from "@/repository/BookRepository";

export default defineComponent({
  name: 'Detail',
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
    IonButtons
  },

  data: () => ({
    book: null as Book | null,
    storage: null as BookStorage | null,
    repository: null as BookRepository | null
  }),


  async created() {
    const id = this.$route.params['id'] as string;
  this.repository = new BookRepository();
    this.storage = new BookStorage()
    const bookRaw = await this.repository.getBook(id);

    const bookFactory = new BookFactory();

    this.book = bookFactory.createFromJson(JSON.parse(bookRaw.value ?? ''));
  },

  methods: {

    deleteBook() {
      this.repository = new BookRepository();
      BookRepository
      if (!this.book) {
        return
      }

      this.repository?.deleteStoredBook(this.book.id);
    },

    changeState() {
      this.repository = new BookRepository();
      if (!this.book) {
        return
      }

      this.book.finished = !this.book.finished;
      this.repository.storeBook(this.book.id, this.book)
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>