<template>
  <div class="about">
    <b-button @click="login" variant="info" class="m-1">Login</b-button>

    <div class="row justify-content-center mt-3" v-show="token">
      <div class="col-md-8">
        <code>{{ user }}</code>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import axios from "axios";
import { setTimeout } from 'timers';
// import FormCreatePost from "@/components/FormCreatePost.vue";

export default {
  data: () => ({
    items: [],
    token: "",
    user: {}
  }),
  methods: {
    // login() {
    // },
    login() {
      window.location = 'http://api.localhost/oauth/authorize?client_id=6&redirect_uri=http://localhost:8080/about&response_type=code&scope=';
    },
    headParams() {
      var vars = [],
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    getToken(code) {
      this.$axios
        .post("http://api.localhost/oauth/token", {
          // "Content-Type": "application/json",
          grant_type: "authorization_code",
          client_id: 6, // from admin panel above
          client_secret: "oAlh4UG0CayG2OsIUUU3ZrYP3721J3woGQBC9AWo", // from admin panel above
          redirect_uri: "http://localhost:8080/about",
          code: code // Get code from the callback
        })
        .then(res => {
          let data = res.data;
          console.log(data)
          this.token = data.access_token;
        });
    },
    getUser() {
      console.log("passow " + this.token);
      if (!this.token) {
        return;
      }
      this.$axios.get("http://api.localhost/api/usuarioLogado", {
          headers: {
            "Authorization": "Bearer " + this.token,
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          // this.items.push({ code: params.code })
          let data = res.data;

          this.user = data;
        });
    }
  },
  mounted() {
    let params = this.headParams();

    if (params.code) {
      this.getToken(params.code);
      setTimeout(() => {
        this.getUser();
      }, 500);
    }
  }
};
</script>
