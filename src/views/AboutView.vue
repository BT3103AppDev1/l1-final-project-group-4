<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <main>
    <TheHeader />

    <div class="about">
      <h1>ABOUT US</h1>
      <h2>
        We are a team of dedicated pet lovers who understand the importance of keeping your furry
        family members healthy and well-groomed. At our shop, we believe that every pet deserves to
        look and feel their best, and we make it our mission to provide top-notch grooming services
        that cater to the unique needs of each individual pet. Whether your pet needs a simple nail
        trim or a full spa treatment, we have the skills, experience, and equipment to get the job
        done.
      </h2>

    <div class="white-box">
      Working Hours <br />
      Mon - Fri : 7am - 6pm <br />
      Saturday : 9am - 4pm <br />
      Sunday: Closed
    </div>

      <h1>What people say</h1>

      <div class="comment1">
        <div class="circle"></div>
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

        "As a first time pet parent, I was very clueless about the grooming procedure for my dog.
        The team helped me soothe my nerves by guiding me through the grooming procedure and gave me
        reassurance that my pet was in good hands. Will definitely visit this grooming shop the next
        time!"
      </div>

      <div class="comment2">
        <div class="circle"></div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class = "star">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          </div>
  
        "I recently had the pleasure of taking my furry friend to this dog grooming website, and I
        must say that I was thoroughly impressed with the level of service they provided. They were
        friendly, knowledgeable, and took the time to listen to my concerns and answer any questions
        I had."
      </div>
    </div>
  </main>
</template>

<style scoped>
.about {
  height: 100vh;
  background: linear-gradient(to top, #193a6a 0%, #193a6a 50%, #d4e5f3 50%, #d4e5f3 100%);
}

h1 {
  font-size: 3em;
  font-weight: bold;
  margin-left: 20px;
}

h2 {
  width: 60%;
  text-align: justify;
  margin-left: 20px;
}

h3 {
  text-align: justify;
  margin-left: 20px;
  color: white;
}
.white-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 180px;
  padding: 20px;
  font-size: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 60px;
  margin-right: 60px;
}
.comment1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: black;
  backdrop-filter: blur(21px);
  border-radius: 25px;
  margin-left: 20px;
  height: 200px;
  width: 48%;
  bottom: 140px;
  text-align: center;
  color: white;
  border-radius: 10px;
  background-image: url('../assets/QuotationSign.png');
  background-repeat: no-repeat;
}
.comment2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: black;
  right: 0;
  height: 200px;
  margin-right: 20px;
  width: 48%;
  text-align: center;
  color: white;
  border-radius: 10px;
  bottom: 140px;
  margin-top: auto;
  margin-bottom: auto;
  background-image: url('../assets/QuotationSign.png');
  background-repeat: no-repeat;
}
.checked {
  color: orange;
}
.comment1 .circle {
  height: 75px;
  width: 75px;
  background-color: #bbb;
  border-radius: 50%;
  margin-bottom: 10px;
}
.comment1 .star {
  display: flex;
  margin-bottom: 10px;
}
.comment2 .circle {
  height: 75px;
  width: 75px;
  background-color: #bbb;
  border-radius: 50%;
  margin-bottom: 10px;
}
.comment2 .star {
  display: flex;
  margin-bottom: 10px;
}
</style>