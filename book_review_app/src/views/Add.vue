<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Add Book</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input inputmode="text" v-model="title"></ion-input>
      </ion-item>
    </ion-content>

    <ion-button expand="block" color="success" v-on:click="save" :router-link="/detail/ + id" v-if="id">Save
    </ion-button>

  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonBackButton,
  IonButtons
} from '@ionic/vue';

import {defineComponent} from 'vue';
import Book from "@/model/Book";
import BookStorage from "@/service/BookStorage"
import {v4 as uuidv4} from "uuid";

export default defineComponent({
  name: 'Add',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonBackButton,
    IonButtons
  },

  data: () => ({
    title: '',
    id: ''
  }),

  created() {
    this.id = uuidv4();
  },

  methods: {
    save() {
      const storage = new BookStorage();

      if (!this.id) {
        return;
      }

      storage.setData(this.id, new Book(this.id, this.title, null, false));
    }
  }
})
;
</script>

<style scoped>

</style>