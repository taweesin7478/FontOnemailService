<template>
  <v-app class="app">
    <div>
      <v-row class="top-bar">
        <v-app-bar style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);" app elevate-on-scroll>
          <img
          width="150"
          height="40"
          style="margin-top:1px;"
          :src="require('../assets/Group-659.png')"
          />
        </v-app-bar>
      </v-row>
      <v-main>
        <v-container fluid class="content">
          <v-flex>
            <v-card
              height="90%"
              width="90%"
              class="table-content pa-2 pl-2 pr-2 mt-5"
            >
              <v-col cols="12">
                <v-card-title class="pa-0 pb-1 pr-1">
                  <v-col cols="12">
                    <v-toolbar-title align="left">OnemailSystem</v-toolbar-title>
                  </v-col>
                </v-card-title>
                <v-card
                  height="100%"
                  width="100%"
                  class="table-content pa-2 pl-2 pr-2"
                  v-for="item in items" :key="item"
                >
                    <v-alert
                      class="pl-3 pb-1 pt-1 tile"
                      :color="getColor(item.status)"
                      style="white-space:pre-wrap; font-size: 17px;"
                    >System Status: {{ item.status }}</v-alert>
                    <p align="left" style="white-space:pre-wrap;" v-html="item.note"></p>
                    <p align="left" style="white-space:pre-wrap;" v-html="item.alert"></p>
                    <p align="left" style="white-space:pre-wrap;" v-html="item.detail"></p>
                </v-card>
              </v-col>
            </v-card>
          </v-flex>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    items: []
  }),
  mounted() {
  },
  components: {
  },
  created() {
    this.Data()
  },
  computed: {
  },
  methods: {
    getColor (status) {
      if (status === 'Operational') return 'green accent-3'
      else if (status === 'Alert') return 'yellow'
      else if (status === 'Unavailable') return 'red darken-1'
      else return 'background-color: limegreen'
    },
    ColorStyle (status) {
      if (status === 'Operational') return 'white-space:pre-wrap; font-size: 14px; color: green'
      else if (status === 'Alert') return 'white-space:pre-wrap; font-size: 14px; color: gold'
      else if (status === 'Unavailable') return 'white-space:pre-wrap; font-size: 14px; color: firebrick'
      else return 'green'
    },
    async Data () {
      console.log(process.env.VUE_APP_API)
      var apiData = await axios.get(
        process.env.VUE_APP_API + '/api/v1/private/OnemailStatus'
      )
      this.items = apiData.data.data
    },
  },
  watch: {
  }
}
</script>
