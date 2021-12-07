<template>
  <v-container>
      <v-row align="center" justify="center">
        <v-col class="align-center">
          <v-card elevation="6" class="contentCard">
           <v-card-title class="headline">
                Register for a New Account
              </v-card-title>
              <v-form lazy-validation>
                <v-container class="pa-6">
                  <v-text-field
                    v-model="userData.username"
                    color="#401a19"
                    label="Username"
                    required
                    type="text"
                    id="username_ID"
                  />
                  <v-text-field
                    v-model="userData.account_emailaddress"
                    label="Email"
                    color="#401a19"
                    required
                    type="email"
                    id="email_ID"
                  />
                  <v-text-field
                    v-model="userData.password1"
                    label="Password"
                    color="#401a19"
                    required
                    type="password"
                    id="password1_ID"
                  />
                  <v-text-field
                    v-model="userData.password2"
                    label="Confirm password"
                    required
                    color="#401a19"
                    type="password"
                    id="password2_ID"
                  />

                  <v-row>
                    <v-col cols="6">
                      <v-btn
                        :disabled="!valid"
                        color="#401a19"
                        class="white--text"
                        @click="createUser"
                        block
                      >
                        Register
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        :disabled="!valid"
                        color="#401a19"
                        outlined
                        block
                        @click="cancelOperation"
                      >
                        Log in
                      </v-btn>
                    </v-col>
                  </v-row>
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
    cancelOperation(){
      router.push("/auth");
    },
    createUser() {
       apiService.registerUser(this.userData).then(response => {
         if (response.status === 204) {
           console.log(response)
         }
       })
      .then(response => {
        this.$alert('Account created successfully! You will now' +
          ' be taken to the previous page to log in with your new credentials.')
        router.push('/auth')
      })
      .catch(response => {
        console.log(response.status)
        this.$alert('There was a problem with your registration. Please check all fields ' +
          'and try again.')
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
</style>
