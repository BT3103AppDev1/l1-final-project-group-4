<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { ref as vueRef, onMounted } from 'vue';
import { useStore } from 'vuex';
import AddDogPopUp from '@/components/AddDogPopUp.vue';
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import LoadingPopUp from '@/components/LoadingPopUp.vue';
import loadingAudio from '../assets/loadingAudio.mp3';
import DeletePopUp from '@/components/DeletePopUp.vue';

const storage = getStorage(app);

export default {
  components: {
    AddDogPopUp,
    LoadingPopUp,
    DeletePopUp
  },
  setup() {
    const show = vueRef(false);
    const showDelete = vueRef(false);
    const deleteMessage = vueRef('');

    // The showAddDogPopUp() and showDeletePopUp() functions are called to set the values of show and showDelete variables to true,
    // respectively, which triggers the display of pop-up windows in the UI.
    function showAddDogPopUp() {
      show.value = true;
    }
    function showDeletePopUp() {
      showDelete.value = true;
    }

    const db = getFirestore(app);
    const store = useStore();

    // loading popup
    const isLoading = vueRef(false);
    const audio = vueRef(null);
    const playAudio = () => {
      audio.value.play();
    };
    const pauseAudio = () => {
      audio.value.pause();
    };

    const userEmail = store.state.userEmail;

    // The display() function retrieves dog data from Firestore the user's email address, and creates and
    // appends elements to a table to display the retrieved dog data.
    async function display() {
      isLoading.value = true;
      playAudio();

      const docRef = doc(db, 'customers', userEmail);
      const querySnapshot = await getDocs(collection(docRef, 'dogs'));

      querySnapshot.forEach(async function readDoc(doc) {
        let documentData = doc.data();
        let dogId = doc.id;
        let dogName = documentData.dog_name;
        let dogSex = documentData.dog_sex;
        let dogDob = documentData.dog_dob;
        let dogBreed = documentData.dog_breed;

        let table = document.getElementById('table');
        let tr = document.createElement('tr');
        table.appendChild(tr);
        let td = document.createElement('td');
        tr.appendChild(td);

        let div1 = document.createElement('div');
        div1.id = 'dog-info';
        td.appendChild(div1);

        let img = document.createElement('img');
        await getDownloadURL(ref(storage, userEmail + '-' + dogName + '.png')).then((url) => {
          img.setAttribute('src', url);
        });
        img.id = 'dog-img';
        div1.appendChild(img);

        let div2 = document.createElement('div');
        div2.id = 'dog-details';
        div1.appendChild(div2);

        let header1 = document.createElement('h3');
        header1.id = 'dog-name';
        div2.appendChild(header1);
        header1.innerHTML = 'Name: ' + dogName;

        let header2 = document.createElement('h3');
        header2.id = 'dog-sex';
        div2.appendChild(header2);
        header2.innerHTML = 'Sex: ' + dogSex;

        let header3 = document.createElement('h3');
        header3.id = 'dog-dob';
        div2.appendChild(header3);
        header3.innerHTML = 'DOB: ' + dogDob;

        let header4 = document.createElement('h3');
        header4.id = 'dog-breed';
        div2.appendChild(header4);
        header4.innerHTML = 'Breed: ' + dogBreed;

        let deleteButton = document.createElement('button');
        deleteButton.id = String(dogId);
        deleteButton.className = 'bwt-small';
        deleteButton.innerHTML = 'x';
        div1.appendChild(deleteButton);
        deleteButton.onclick = function () {
          deleteDog(String(dogId), String(dogName));
        };
      });
      isLoading.value = false;
      pauseAudio();
    }

    // The handleDeleteDog() function is called when a user
    // confirms deletion of a dog. It deletes the corresponding document
    // from Firestore and the corresponding image from a Firebase storage.
    async function handleDeleteDog() {
      const dogId = toDeleteDogId.value;
      const dogName = toDeleteDogName.value;

      const docRef = doc(db, 'customers/' + userEmail + '/dogs', dogId);
      await deleteDoc(docRef);
      const imgRef = ref(storage, userEmail + '-' + dogName + '.png');
      // Delete the file
      await deleteObject(imgRef);

      console.log('Document successfully deleted!', dogName);
      let tb = document.getElementById('table');
      while (tb.rows.length > 0) {
        tb.deleteRow(0);
      }
      display();
    }

    const toDeleteDogId = vueRef('');
    const toDeleteDogName = vueRef('');

    // The deleteDog() function is called when a user clicks the delete button
    // for a dog. It sets the values of deleteMessage, toDeleteDogId,
    // and toDeleteDogName variables, and calls the showDeletePopUp() function to display a confirmation pop-up window.
    function deleteDog(dogId, dogName) {
      deleteMessage.value = 'You are going to delete ' + dogName;
      toDeleteDogId.value = dogId;
      toDeleteDogName.value = dogName;
      showDeletePopUp();
    }

    async function refresh() {
      let tb = document.getElementById('table');
      while (tb.rows.length > 0) {
        tb.deleteRow(0);
      }
      display();
    }

    onMounted(() => {
      audio.value = new Audio(loadingAudio);
      audio.value.loop = true;
      display();
    });
    return {
      userEmail,
      display,
      refresh,
      show,
      showDelete,
      deleteMessage,
      showAddDogPopUp,
      showDeletePopUp,
      handleDeleteDog,
      isLoading
    };
  }
};
</script>

<template>
  <div class="dogprofilecard-container">
    <div id="dog-profile-cards">
      <table id="table" class="auto-index"></table>
      <button class="bwt" @click="showAddDogPopUp">Add Dog</button>
      <AddDogPopUp v-model="show" @update:modelValue="refresh"></AddDogPopUp>
      <LoadingPopUp v-model="isLoading" />
    </div>
    <DeletePopUp id="error-popup" v-model="showDelete" :onSubmit="handleDeleteDog">
      <h3>{{ deleteMessage }}</h3>
    </DeletePopUp>
  </div>
</template>

<style>
.dogprofilecard-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 22px;
}

#dog-profile-cards {
  width: 90%;
  height: 70%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 100%));
  grid-gap: 20px; /* adjust this value for spacing between cards */
}

#dog-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: rgb(215, 229, 243);
  border-radius: 20px;
}

#dog-details {
  flex-grow: 4;
}

#dog-img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  margin: 10px;
  margin-right: 20px;
}

#dog-sex,
#dog-dob,
#dog-breed {
  margin-bottom: 10px;
  color: #2c5b94;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#dog-name {
  padding-top: 10px;
  margin-bottom: 10px;
  color: #2c5b94;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.bwt {
  background-color: rgb(215, 229, 243);
  color: #2c5b94;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2em;
  font-weight: bold;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease-in-out;
}

.bwt:hover {
  opacity: 0.9;
}

.bwt-small {
  position: absolute;
  right: -10px;
  top: -5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: red;
  color: white;
  font-size: 16px;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
}
</style>
