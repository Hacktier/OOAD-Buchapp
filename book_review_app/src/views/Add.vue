<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Add Book</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-item>
        <ion-label position="floating">Title</ion-label>
        <ion-input inputmode="text" id="title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Rating</ion-label>
        <ion-input inputmode="numberic" id="rating"></ion-input>
      </ion-item>
    </ion-content>

    <ion-button expand="block" color="success" v-on:click="save" router-link='/show'>Save</ion-button>

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
} from '@ionic/vue';

import {defineComponent} from 'vue';
import Book from "@/model/Book";

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
  },

  methods: {
    save: function () {
      // new Book(
      //     document.getElementById('title').value,
      //     document.getElementById('rating').value
      // );
    }
  }
});
</script>

<style scoped>

</style>