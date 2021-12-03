<template>
  <v-container grid-list-md>
      <v-row align="center" justify="center">
        <v-col class="align-center">
          <v-card elevation="24" class="contentCard">
           <v-card-title>
                <span class="headline">Register for a New Account</span>
              </v-card-title>
              <v-form lazy-validation>
              <v-container>


                 <v-text-field
                      v-model="userData.account_emailaddress"
                      label="email"
                      required
                      type="email"
                      id="email_ID"
                    />
                <v-text-field
                      v-model="userData.username"
                      label="username"
                      required
                      type="text"
                      id="username_ID"
                    />
                <v-text-field
                      v-model="userData.password1"
                      label="password"
                      required
                      type="password"
                      id="password1_ID"
                    />
                <v-text-field
                      v-model="userData.password2"
                      label="retype password"
                      required
                      type="password"
                      id="password2_ID"
                    />

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="CreateUser"
                >
                  Create Account
                </v-btn>

                </v-container>
              </v-form>


          </v-card>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import router from "../router";
import {APIService} from '../http/APIService';
const apiService = new APIService();

export default {
  name: 'Register',
  data() {
    return {
      valid: true,
      userData: {},
      token: '',
    }
  },
  methods: {
    CreateUser() {
       apiService.registerUser(this.userData).then(response => {
         if (response.status === 204) {
           console.log(response)
         }
       })
      .then(response => {
        this.$alert('Login with your new credentials!')
        router.push('/auth')
      })
      .catch(response => {
        console.log(response.status)
        this.$alert('There was a problem with your registration.')
      })
    }
  },
  created() {
    this.token = null
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input {
  border: solid black 1px;
  background-color: white;
}
/*.content {*/
/*  display: block;*/
/*  justify-content: center;*/
/*  align-content: center;*/
/*  padding: 20px;*/
/*}*/
</style>
