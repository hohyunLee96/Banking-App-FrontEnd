<template>
  <section>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">THE BANKING API</h2>
      <h3>{{ msg }}</h3>
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