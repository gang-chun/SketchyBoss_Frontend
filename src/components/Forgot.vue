<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <v-card>
          <v-card-title>Password Reset</v-card-title>
          <v-card-subtitle>Enter the e-mail associated with your account to receive password reset instructions.</v-card-subtitle>

          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                required></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="send_password_reset">
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Forgot",

  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ],
  }),

  methods: {
    async send_password_reset() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/password_reset/', {
          email: this.email
        });

        console.log(response);
      }
      catch (e){
        console.error(e);
      }
    }
  },
}
</script>

<style scoped>

</style>
