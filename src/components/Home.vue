<template class="bg-light">
  <section style="width: 100%; height: 100%">
    <div style="width: 100%; height: 35vw; background-image: url('../../../home-page-background-image.jpg'); background-size: cover; background-position: 0px; background-repeat: no-repeat;">
      <div id="title-section" style="margin-left: 3vw;">
        <p style="color: white; font-weight:1500; font-size: 60px; letter-spacing: 4px;">Frank Bank</p>
        <h5 style="color: white; ">Online banking anywhere, anytime.</h5>
        <button class="btn btn-outline-light" style="margin-top: 20px; font-size: large;">Open Account</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    //fetch the message from the spring boot server
    fetch("http://localhost:8080/auth/hello")
        .then((response) => response.text())
        .then((data) => {
          //set this message to what is coming back from the server
          this.msg = data;
        });
  }
};
</script>

<style>
</style>