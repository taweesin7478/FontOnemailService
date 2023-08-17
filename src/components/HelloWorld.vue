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
              height="100%"
              width="100%"
              class="table-content pa-2 pl-2 pr-2"
            >
              <v-col cols="12">
                <v-card-title class="pa-0 pb-1 pr-1">
                  <v-col cols="12">
                  <v-toolbar-title >Add/Edit OnemailSystem</v-toolbar-title>
                  </v-col>
                </v-card-title>
                <v-card
                  height="100%"
                  width="100%"
                  class="table-content pa-2 pl-2 pr-2"
                >
                  <v-row>
                    <v-col cols="12" sm="6">
                    <v-select
                      v-model="status"
                      label="System Status"
                      :items="select"
                      variant="solo"
                    ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12">
                    <v-textarea v-model="note" label="Note" variant="solo" rows="3"></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12">
                    <v-textarea v-model="alert" label="Alert" variant="solo" rows="2"></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-textarea v-model="detail" label="Detail" variant="solo" rows="6"></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" align="right">
                      <v-btn
                        color="success"
                        class="mx-2"
                        dark
                        @click="save_Edit()"
                        >Save</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>
          </v-flex>
        </v-container>
      </v-main>
      <v-dialog v-model="dialogSave" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">ตัวอย่างแสดงผล</span>
          </v-card-title>
          <v-col cols="12" sm="12" align="center">
            <v-card
              height="95%"
              width="95%"
              class="table-content pa-2 pl-2 pr-2"
            >
                <v-alert
                  class="pl-3 pb-1 pt-1 tile"
                  :color="getColor(status)"
                  style="white-space:pre-wrap; font-size: 17px;"
                >System Status: {{ status }}</v-alert>
                <p align="left" style="white-space:pre-wrap;" v-html="note"></p>
                <p align="left" style="white-space:pre-wrap;" v-html="alert"></p>
                <p align="left" style="white-space:pre-wrap;" v-html="detail"></p>
            </v-card>
          </v-col>
          <v-card-title>
          <v-col cols="12" sm="12" align="right">
            <v-btn
              color="error"
              class="mx-2"
              dark
              @click="dialogSave=false"
              >Cancle</v-btn
            >
            <v-btn
              color="success"
              class="mx-2"
              dark
              @click="Confirm()"
              >Save</v-btn
            >
          </v-col>
          </v-card-title>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    select: [
      'Operational',
      'Alert',
      'Unavailable'
    ],
    detail: '',
    alert: '',
    note: '',
    status: 'Operational',
    dialogSave: false
  }),
  mounted() {
  },
  components: {
  },
  created() {
    this.api()
  },
  computed: {
  },
  methods: {
    save_Edit() {
      this.dialogSave = true
    },
    async api() {
      console.log(process.env.VUE_APP_API)
      var apiData = await this.axios.get(
        process.env.VUE_APP_API + '/api/v1/private/OnemailStatus'
      )
      var data = apiData.data.data[0]
      this.status = data.status
      this.note = data.note
      this.alert = data.alert
      this.detail = data.detail
    },
    async Confirm() {
      await this.axios.post(
        process.env.VUE_APP_API + '/api/v1/private/UpdateStatus', {
          status: this.status,
          alert: this.alert,
          note: this.note,
          detail: this.detail
        }
      )
      this.dialogSave = false
      this.api()
    },
    getColor (status) {
      if (status === 'Operational') return 'green accent-3'
      else if (status === 'Alert') return 'yellow'
      else if (status === 'Unavailable') return 'red darken-1'
      else return 'background-color: limegreen'
    }
  },
  watch: {
  }
}
</script>
