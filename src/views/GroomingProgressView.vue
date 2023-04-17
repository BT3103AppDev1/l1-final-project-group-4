<script>
import app from '../firebase.js';
import TheHeader from '@/components/TheHeader.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref as storageref, getDownloadURL } from 'firebase/storage';

export default {
  components: {
    TheHeader
  },
  setup() {
    const route = useRoute();

    const db = getFirestore(app);
    const myDocID = computed(() => route.query.myDocID);
    const myDate = computed(() => route.query.myDate);
    const mySlot = computed(() => route.query.mySlot);
    const info = ref('');

    const isBathing = ref(null);
    const isCutting = ref(null);
    const isGrooming = ref(null);
    const haventBath = ref(null);
    const haventCut = ref(null);
    const haventGroom = ref(null);

    const storage = getStorage(app); // Create a storage instance using the 'getStorage' function from Firebase, passing in the 'app' instance

    // function fetches video/image of the dog that is in the midst of their service.
    // attaches the multimedia to the div if found. If not use default image.
    async function test(myDocID, myDate, mySlot) {
      const docRef = doc(db, 'new-appointments', myDate);
      const subCollectionRef = collection(docRef, mySlot);
      const document1 = doc(subCollectionRef, myDocID);
      const documentSnapshot = await getDoc(document1);
      const documentData = documentSnapshot.data();
      const info = [documentData.status_bath, documentData.status_cut, documentData.status_groom];

      const states = ['Bath', 'Cut', 'Groom'];
      for (let i = 0; i < states.length; i++) {
        const state = states[i];
        await getDownloadURL(storageref(storage, documentData.appt_id + '-' + state + '.png'))
          .then((url) => {
            // Retrieve the image
            document.getElementById(state).style.backgroundImage = `url(${url})`;
          })
          .catch(async (error) => {
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                await getDownloadURL(storageref(storage, 'Dog' + state + '.png')).then((url) => {
                  // Retrieve the image
                  document.getElementById(state).style.backgroundImage = `url(${url})`;
                });
            }
          });
      }

      return info;
    }
    test(myDocID.value, myDate.value, mySlot.value).then((result) => {
      info.value = result;

      isBathing.value = computed(() => info.value && info.value[0] == 1);
      isCutting.value = computed(() => info.value && info.value[1] == 1);
      isGrooming.value = computed(() => info.value && info.value[2] == 1);
      haventBath.value = computed(() => info.value && info.value[0] == 0);
      haventCut.value = computed(() => info.value && info.value[1] == 0);
      haventGroom.value = computed(() => info.value && info.value[2] == 0);

      console.log(groomClass.value);
      console.log(cutClass.value);
      console.log(bathClass.value);
    });
    const bathClass = computed(() => {
      if (isBathing.value === null || haventBath.value === null) {
        return '';
      }
      if (isBathing.value.value) {
        return 'in-progress';
      } else if (haventBath.value.value) {
        return 'not-started';
      } else {
        return 'done';
      }
    });

    const cutClass = computed(() => {
      if (isCutting.value === null || haventCut.value === null) {
        return '';
      }
      if (isCutting.value.value) {
        return 'in-progress';
      } else if (haventCut.value.value) {
        return 'not-started';
      } else {
        return 'done';
      }
    });

    const groomClass = computed(() => {
      if (isGrooming.value === null || haventGroom.value === null) {
        return '';
      }
      if (isGrooming.value.value) {
        return 'in-progress';
      } else if (haventGroom.value.value) {
        return 'not-started';
      } else {
        return 'done';
      }
    });

    return {
      myDocID,
      myDate,
      mySlot,
      isBathing,
      isCutting,
      isGrooming,
      haventBath,
      haventCut,
      haventGroom,
      cutClass,
      bathClass,
      groomClass
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  <main>
    <TheHeader />

    <div class="GroomingProgress">
      <h1 id="grooming-prog-h1">Track your pet's grooming progress!</h1>
      <br />

      <div class="grooming-prog-columns">
        <div id="Bath" :class="bathClass">
          <h2 class="grooming-prog-h2">Bath</h2>
        </div>

        <div id="Cut" :class="cutClass">
          <h2 class="grooming-prog-h2">Cut</h2>
        </div>

        <div id="Groom" :class="groomClass">
          <h2 class="grooming-prog-h2">Groom</h2>
        </div>
      </div>
      <button id="grooming-prog-back" @click="goBack">Back</button>
    </div>
  </main>
</template>

<style scoped>
.GroomingProgress {
  height: calc(100vh - 125px);
  background-color: #d4e5f3;
}

#grooming-prog-h1 {
  font-size: 3em;
  font-weight: bold;
  margin-left: 20px;
  color: #193a6a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-left: 1.5em;
  margin-top: 1em;
}

.grooming-prog-h2 {
  font-size: 2em;
  font-weight: bold;
  margin-left: 20px;
  color: white;
}

.grooming-prog-columns {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#Bath {
  flex: 20%;
  height: 400px;
  padding: 10px;
  margin: 50px;
  background-color: white;
  border-radius: 25px;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  background-color: #193a6a;
  opacity: 60%;
}
#Cut {
  flex: 20%;
  height: 400px;
  padding: 10px;
  margin: 50px;
  background-color: white;
  border-radius: 25px;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  background-color: #193a6a;
  opacity: 60%;
}
#Groom {
  flex: 20%;
  height: 400px;
  padding: 10px;
  margin: 50px;
  background-color: white;
  border-radius: 25px;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  background-color: #193a6a;
  opacity: 60%;
}

.in-progress {
  box-shadow: 0 0 70px #3679a8;
  opacity: 100% !important;
}
.done {
  opacity: 100% !important;
}

#grooming-prog-back {
  background-color: #193a6a;
  color: white;
  margin-left: 3em;
  font-size: 20px;
  padding: 0.7em 1.3em 0.7em 1.3em;
  border-radius: 20px;
  border: none;
  box-shadow: 0 4px 8px #656e7c;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
