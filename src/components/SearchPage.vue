<template >
  <v-app class="content">
    <v-card class="pa-12">
    <v-container fluid class="contains">
    <h2>{{ msg }}</h2>
    <br>
    <h2>For {{$route.params.searchField}} named {{$route.params.input}} . . </h2>

    <v-form>
      <v-row>
        <v-col cols="6" md="3">
          <v-select :items="field"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field style="color: white; margin-left: 20px"></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
          <v-btn id='searchBTN' elevation="8">
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

</v-container>
      </v-card>
  </v-app>
  </template>

<script>
export default {
  name: 'searchPage',
  data () {
    return {
      field: ['Person','Company'],
      msg: 'This is the search page',
    }
  },
      methods: {
        showAccountNav() {
          this.$emit('showSearch', this.template)
      },
      }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  background-color: #4e3a43;
}

.contains {
  background-color: white;
}
</style>
