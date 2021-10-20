
<template >
  <v-app class="content">
    <h2>{{ msg }}</h2>
    <v-form>
      <v-row>
        <v-col cols="6" md="3">
          <v-select :items="items"></v-select>
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
  </v-app>
  </template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      items: ['Person\'s Name','Company'],
      msg: 'This is the search component',
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
  display: flex;
  justify-content: flex-start;
  padding: 40px;
}

#searchBTN {
  font-weight: bolder;
  margin-left: 20px;
  padding: 20px;
  color: white;
  background-color: #401a19;
}
</style>
