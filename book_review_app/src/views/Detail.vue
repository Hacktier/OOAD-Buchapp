<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Detail View</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>
            Title: Harry Potter
          </ion-label>

        </ion-item>
        <ion-item>
          <ion-label>
            ISBN: 9780439554930
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Number of Pages: 336
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Release Date: 26.06.1997
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Rating: 9/10
          </ion-label>
        </ion-item>
        <ion-item>
          Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts.
          Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.
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
  IonLabel,
  IonItem,
  IonList
} from '@ionic/vue';
import {defineComponent} from 'vue';

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
    IonList
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