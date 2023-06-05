<template lang="">
    <form ref="form">
  <section class="h-100 bg-dark">
      <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col">
                  <div class="card card-registration my-4">
                      <div class="row g-0">
                          <div class="col-xl-6">
                              <div class="card-body p-md-5 text-black">
                                  <h3 class="mb-5 text-uppercase">New Transaction</h3>

                                 <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>

                                  <div class="row">
                                      <div class="form-outline mb-4">
                                          <div class="form-outline">
                                           
                                                <input type="text" id="firstnameInput" v-model="this.fromIban"
                                                      class="form-control form-control-lg" name="toIban"
                                                      required placeholder="Enter sender IBAN" />
                                                      <label class="form-label"  for="firstnameInput"> Sender </label> 
                                          </div>
                                      </div>
                                      <div class="row">
                                          <div class="form-outline mb-4">
                                              <div class="form-outline">
                                                  <input type="text" id="toIban" v-model="this.toIban"
                                                      class="form-control form-control-lg" name="toIban"
                                                      required placeholder="Enter receipient IBAN" />
                                                  <label class="form-label"  for="lastNameInput">Receipient </label>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="form-outline mb-4">
                                          <input type="number" id="amount"
                                          v-model="this.amount" class="form-control form-control-lg"  name="amount"
                                              required placeholder="Enter amount" />
                                          <label class="form-label"  for="postcodeInput">Amount</label>
                                      </div>
                                  </div>

                                  <div class="d-flex justify-content-end pt-3">
                                      <a type="button" class="btn btn-light btn-lg" @click="goBack()">Cancel</a>
                                      <a name="registerBtn" type="submit"
                                          class="btn btn-warning btn-lg ms-2" @click="sendTransaction()">Send</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</form>
</template>
<script>
import axios from 'axios'
export default {
    name: "New Transaction",
    data() {
        return {
            fromIban: '',
            toIban: '',
            type: 0,
            amount: '',
            performingUser: 1,
            errorMessage: "",
            token :"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlbXBsb3llZUBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTY4NTkxMjk4MiwiZXhwIjoxNjg1OTE2NTgyfQ.JENtnki76lAiWqEnB_x-UDle12pyOT2y9UiAyP9KJLRuBomC3lyVPldjphLCiJM0yimmwwdEmUL84O-W05l8wSHttC7th8dzO_tZ_ffQNJaAZ8RLaIl4cLRLSSKFHt5ikZn37mnmdN1vMKaHiLDYWzRt_vtvOfurT42UCyS3c3C0-_EgIM0oCLMPwv63as7oRtLJqHbajQQ-3-ydwQKsgzucTUOIPuZknK433LdjsSQwgJE3E0fFGGEnGO7yFNukX6EHSv8SLQJtv1-eAr2tudlU46nChhoqEug9L_a3IUR99xfOcLtc_nAvIcAMrPs4v97XajlQLliaH43ESt4Qbw"
        }
    },
    methods: {
        sendTransaction() {
            // Get the token from the input field
            const token = this.token;

            // Include the token in the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.post('http://localhost:8080/transactions', {
                transactionId: this.transactionId,
                fromIban: this.fromIban,
                toIban: this.toIban,
                type: this.type,
                amount: this.amount,
            }, config)
                .then(response => {
                    alert("Transaction sent!")
                    console.log(response)
                    this.$router.push('/transactions')
                })
                .catch(error => {
                    if (error) {
                        this.errorMessage = error.response.data.message;
                    }
                    setTimeout(() => {
                        this.errorMessage = ""; 
                    }, 8000);
                    console.log(error);
                });
        },
        goBack() {
            this.$router.push('/transactions')
        }
    },
}
</script>
<style lang="">

</style>