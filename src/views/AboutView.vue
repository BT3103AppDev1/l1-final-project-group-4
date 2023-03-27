<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <div class="main">
    <TheHeader />
    <div class="body">
      <div class="aboutUs">
        <div class="titleContainer">
          <h1>ABOUT US</h1>
        </div>
        <div class="desc">
          <h3 id="mainDesc">
            We are a team of dedicated pet lovers who understand the importance of keeping your furry
            family members healthy and well-groomed. At our shop, we believe that every pet deserves to
            look and feel their best, and we make it our mission to provide top-notch grooming services
            that cater to the unique needs of each individual pet. Whether your pet needs a simple nail
            trim or a full spa treatment, we have the skills, experience, and equipment to get the job
            done.
          </h3>
          <div class="white-box">
            <h2>Working Hours</h2>
            <h3>Mon - Fri : 7am - 6pm</h3>
            <h3>Saturday : 9am - 4pm</h3>
            <h3>Sunday: Closed</h3>
          </div>
        </div>
      </div>
      <div class= "whatPeopleSay">
        <h1 id="reviewTitle">What people say</h1>
        <div class= "reviewContainer">
          <div class="comment">
            <div class="circle">
              <img alt="user" src="@/assets/avatar2.png" width="75" height="75" class="avatar"/>
            </div>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div class="star">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
            </div>
            <div class = "description" >
              "As a first time pet parent, I was very clueless about the grooming procedure for my dog.
              The team helped me soothe my nerves by guiding me through the grooming procedure and gave me
              reassurance that my pet was in good hands. Will definitely visit this grooming shop the next
              time!"
            </div>
            <h3 class="reviewer">- Jody Tng</h3>
          </div>
          <div class="comment">
            <div class="circle">
              <img alt="user" src="@/assets/avatar2.png" width="75" height="75" class="avatar"/>
            </div>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div class="star">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
            </div>
            <div class = "description" >
              "I recently had the pleasure of taking my furry friend to this dog grooming website, and I
              must say that I was thoroughly impressed with the level of service they provided. They were
              friendly, knowledgeable, and took the time to listen to my concerns and answer any questions
              I had."
            </div>
            <h3 class="reviewer">- Caleb Low</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  /* min-width: 1240px; */
}

.body {
  display: flex;
  background-color: rgb(215, 229, 243);
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* min-width: 1125px; */
}
.aboutUs {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.titleContainer {
  padding-left: 2vw;
  padding-block: 1em;
}
.desc {
  display: flex;
  flex-direction: row;
}

#mainDesc {
  display: flex;
  width: 80%;
  padding-inline: 2vw;
}
.white-box {
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: white;
  width: 20%;
  flex-direction: column;
  padding: 1em;
  border-radius: 1em;
  margin-right: 3em;
  margin-bottom: 2em;
}
.whatPeopleSay {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#reviewTitle {
  padding-left: 2vw;
}

.reviewContainer {
  display: flex;
  flex-direction: row;
  padding-inline: 2vw;
  padding-top: 3em;
  background-color: #123456;
  height: 100%;
}
.comment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  background-image: url('../assets/QuotationSign.png');
  background-repeat: no-repeat; 
  margin-bottom: 2em;
  margin-inline: 2em;
  border-radius: 1em;
  color: white;
  padding-inline: 2em;
  padding: 1em;
  backdrop-filter: blur(21px);
  text-align: center;
}
.checked {
  color: orange;
}
.circle {
  height: 60px;
  width: 60px;
  background-color: #bbb;
  border-radius: 50%;
  margin-bottom: 10px;
}
.avatar {
  height: 60px;
  width: 60px;
  background-color: #bbb;
  border-radius: 50%;
  margin-bottom: 10px;
}
.star {
  display: flex;
  margin-bottom: 1em;
}
.reviewer {
  align-self: flex-end;
  /* padding-right: 1em; */
}
@media (max-width: 1124px) {
  .reviewContainer {
    flex-direction: column
  }
  .desc {
    flex-direction: column;
    align-items: center;
  }
  .white-box {
    margin-top: 1em;
    margin-right: 0em;
    width: 80%;
  }
}
</style>