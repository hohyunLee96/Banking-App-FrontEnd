<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      <div class="card-body">
        <div class="float-start">
          <p>{{ "user ID " + account.userId }}</p>
          <!-- <p>{{ account.user.firstName + " " + account.user.lastName}}</p> -->
          <p>
            {{ account.IBAN }}
          </p>
          <p>
            <small>{{ account.accountType }}</small>
          </p>
          <p>
            <small :class="{ 'text-success': account.isActive, 'text-danger': !account.isActive }">
              {{ "activation " + account.isActive }}
            </small>
          </p>
        </div>
        <span class="price float-end">{{ account.absoluteLimit }}</span>
      </div>
      <div class="card-footer">
        <!-- <button class="btn btn-warning" @click="editAccount(account.id)">Edit</button>&nbsp;&nbsp; -->
        <button class="btn btn-danger" @click="deactivateAccount(account.accountId)">Deactivate</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "AccountListItem",
  props: {
    account: Object,
  },
  methods: {
    deactivateAccount(id) {
      const token = this.token;

            // Include the token in the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
      axios
        .put("http://localhost:8080/accounts/" + id, { isActive: false },{
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkYXZpZEBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTY4NTk2NjU2NCwiZXhwIjoxNjg1OTcwMTY0fQ.BTxTz9Kb7051SQ9-dPhim3AIp_kpTrTwwYuRYx3N0lEwNsv7xZo-KG6Yk-1h2tA05t0rTZi--2q-RKhLf-JgjSRXquzZ05NBXe5ve4ON43-ocDlbuMw9k5tvpyP7XuGQsac70IALJcQhUVlcX84_u1IhoWj8Gqyr_mdu7by8L_dO4MxU-8L6mbNZUzveQ7gOgrIlUGpvMnAJBlg20xyVvv-ekEWNuBwyMG7T3MfXY8W2qrrFDvHCE71NDm1-O0UCi3v9GYqtOOjEvGgJdcrUOANkA3XFsQ1_AC8LfywawbN9kK4HZVW0ExJ_chmdpc2MZjvGwD1jQtZtZw11T8Fukg"}`,
          },
        }) // Pass isActive as false in the request body
        .then((result) => {
          console.log(result);
          this.account.isActive = false; // Update isActive property of the account object locally
          this.$emit('update');
        })
        .catch((error) => console.log(error));
    },
  }
};
</script>
  
<style></style>