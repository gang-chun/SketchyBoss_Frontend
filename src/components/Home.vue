 <template>
  <v-main class="page">
    <v-container fluid>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em>&mdash; Every creeper knows a good window when they see (through) one. - Anonymous</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
            sm="10"
            md="8"
        >
          <v-card class="elevation-9" id="mainCard">
            <v-container
              fluid
              grid-list-md
            >
              <v-row>
                <v-col cols="6">
                  <v-card flat color="#401a19" class="d-flex justify-center">
                    <v-img
                      :src="require('@/assets/images/SBLogoRedWhite.jpg')" height="320px" width="300px">
                    </v-img>
                  </v-card>
                </v-col>
                <v-col colors="6">
                    <v-card-text id="intro">Hello creeper . . . </v-card-text>
                </v-col>

              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  import router from '../router';

  export default {
    name: 'Home',
    data: () => ({
      validUserName: "Guest"
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      viewMovies() {
        router.push('/movie-list');
      },
      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.page {
  background-color: #4b3a41;
}
#mainCard {
  background-color: #401a19;
  opacity: 100%;
  color: white;
}

#intro {
  font-weight: bolder;
  font-size: 18px;
}
</style>
