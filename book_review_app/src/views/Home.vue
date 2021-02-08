<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Book Review</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item :router-link="book.showRoute" v-for="book in books" :key="book.title">
          <ion-label>
            <h2 v-text="book.title"></h2>
            <ion-note>ISBN: 9780439554930</ion-note>
          </ion-label>
          <ion-badge :color="book.labelColor" slot="end">
            {{ book.rating }}/10
          </ion-badge>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed" router-link='/add'>
        <ion-fab-button>
<!--          <ion-icon name="add"></ion-icon>-->
          +
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
  IonNote,
  IonBadge,
  IonList,
  // IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/vue';

import {defineComponent} from 'vue';
import Book from "@/model/Book";

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonNote,
    IonBadge,
    IonList,
    // IonIcon,
    IonFab,
    IonFabButton
  },

  data: () => ({
    books: [
      new Book('Buch 1', 2),
      new Book('Another Book', 8),
      new Book('Another Book 2', 6),
      new Book('Harry Potter', 9),
      new Book('Harry Potter', 9),
    ]
  })
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