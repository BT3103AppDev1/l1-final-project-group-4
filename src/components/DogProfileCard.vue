<script>
import app from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { useStore } from 'vuex';
import AddDogPopUp from '@/components/AddDogPopUp.vue';

export default {
  components: {
    AddDogPopUp
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showAddDogPopUp() {
      this.show = true;
    }
  },
  setup() {
    const db = getFirestore(app);
    const store = useStore();

    const userEmail = store.state.userEmail;
    async function display() {
      const docRef = doc(db, 'customers', userEmail);
      const querySnapshot = await getDocs(collection(docRef, 'dogs'));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
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
        img.id = 'card-profile-img';
        img.src = 'src/assets/dog1.png'; // change this
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
    }
    display();

    async function deleteDog(dogId, dogName) {
      alert('You are going to delete ' + dogName);
      const docRef = doc(db, 'customers/' + userEmail + '/dogs', dogId);
      await deleteDoc(docRef);
      console.log('Document successfully deleted!', dogName);
      let tb = document.getElementById('table');
      while (tb.rows.length > 0) {
        tb.deleteRow(0);
      }
      display();
    }

    return { userEmail, display };
  }
};
</script>

<template>
  <div class="container">
    <div id="dog-profile-cards">
      <table id="table" class="auto-index"></table>
    </div>
    <button class="bwt" @click="showAddDogPopUp">Add Dog</button>
    <AddDogPopUp v-model="show" @update:modelValue="display"></AddDogPopUp>
  </div>
</template>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 22px;
}

#dog-profile-cards {
  width: 90%;
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
#card-profile-img {
  flex-grow: 3;
  width: 70px;
  height: 200px;
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
  margin-left: 30px;
  margin-top: 15px;
  margin-bottom: 40px;
  width: 90%;
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
