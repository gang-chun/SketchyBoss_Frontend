
<template >
  <v-app class="content">
    <h2>{{ msg }}</h2>

    <v-form>
      <v-row>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12">
          <v-select :items="fields" v-model="searchField"></v-select>
        </v-col>
        <v-col cols="12" xl="6" lg="6" md="6" sm="12">
          <v-text-field v-model="input" style="color: white; margin-left: 20px"></v-text-field>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="12">
          <v-btn id='searchBTN' elevation="8" :to="'/search/' + searchField + '/' + input">
            Search
          </v-btn>



        </v-col>
      </v-row>
      <v-row>
        {{ searchField }} {{ input }}
      </v-row>
    </v-form>
  </v-app>
  </template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchField: '',
      input: '',
      fields: ['Person', 'Company'],
      msg: 'This is the search component',
    }
  },
      methods: {
        enterSearch() {
          this.$emit('searchEntered', this.searchField, this.input);
        },
      }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: flex;
  justify-content: flex-start;
  padding: 40px;
}

#searchBTN {
  font-weight: bolder;
  margin-left: 10px;
  padding: 10px;
  color: white;
  background-color: #401a19;
}
</style>
