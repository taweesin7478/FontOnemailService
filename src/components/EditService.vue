<template>
  <v-app class="app">
    <div>
      <v-row class="top-bar">
        <v-app-bar style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);" app elevate-on-scroll>
          <img
          width="150px"
          height="40px"
          style="margin-top:1px;"
          src='..\assets\Group-659.png'
          @click="path()"
          />
        </v-app-bar>
      </v-row>
      <v-content >
        <v-container fluid class="content">
          <v-layout wrap>
            <v-flex xs12>
              <v-row justify="center">
                <v-container fluid grid-list-lg class="pa-0 pl-0 pr-0">
                  <v-row justify="center">
                    <v-card
                    height="90%"
                    width="90%"
                    class="table-content pa-2 pl-2 pr-2"
                    >
                      <v-layout class="ma-0" wrap>
                        <v-flex lg12 xs12 >
                          <v-card-title class="pa-0 pb-1 pr-1">
                            <v-col cols="12" sm="4" md="4">
                            <v-toolbar-title >Add/Edit Onemail System Status</v-toolbar-title>
                            </v-col>
                          </v-card-title>
                        </v-flex>
                        <v-flex lg12>
                          <v-card
                            height="100%"
                            width="100%"
                            class="table-content pa-2 pl-2 pr-2"
                          >
                            <v-flex lg6 xs6>
                              <v-row lg3 class="d-flex">
                                System Status :
                                <v-select
                                  v-model="status"
                                  :items="select"
                                  label="field"
                                  solo
                                  class="ml-3 pb-2 d-flex"
                                ></v-select>
                              </v-row>
                            </v-flex>
                            <v-flex lg12 xs12>
                              <v-row lg3 class="d-flex">
                                Note :
                                <v-textarea
                                  v-model="note"
                                  solo
                                  label="Note"
                                  rows="3"
                                  class="ml-3 pb-2 d-flex"
                                ></v-textarea>
                              </v-row>
                            </v-flex>
                            <v-flex lg12 xs12>
                              <v-row lg3 class="d-flex">
                                Alert :
                                <v-textarea
                                  v-model="alert"
                                  solo
                                  label="Alert"
                                  rows="2"
                                  class="ml-3 pb-2 d-flex"
                                ></v-textarea>
                              </v-row>
                            </v-flex>
                            <v-flex lg12 xs12>
                                <v-row lg3 class="d-flex">
                                  Detail :
                                  <v-textarea
                                    v-model="detail"
                                    solo
                                    label="Detail"
                                    rows="6"
                                    class="ml-3 pb-2 d-flex"
                                  ></v-textarea>
                                </v-row>
                            </v-flex>
                            <v-flex lg12 xs12>
                              <v-row lg3 class="d-flex">
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="success"
                                  class="mx-2"
                                  dark
                                  @click="save_Edit()"
                                  >Save</v-btn
                                >
                              </v-row>
                            </v-flex>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-row>
                </v-container>
              </v-row>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-dialog v-model="dialogSave" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">ตัวอย่างแสดงผล</span>
          </v-card-title>
          <v-card-text>
            <v-flex lg6 xs6>
              <v-alert
                class="pl-3 pb-1 pt-1 tile"
                :color="getColor(status)"
                style="white-space:pre-wrap; font-size: 17px;"
              >System Status: {{ status }}</v-alert>
            </v-flex>
            <v-flex lg12 xs12>
              <p style="white-space:pre-wrap;" v-html="note"></p>
            </v-flex>
            <v-flex lg12 xs12>
              <p style="white-space:pre-wrap;" v-html="alert"></p>
            </v-flex>
            <v-flex lg12 xs12>
              <p style="white-space:pre-wrap;" v-html="detail"></p>
            </v-flex>
          </v-card-text>
          <v-card-title>
            <v-spacer></v-spacer>
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
    },
    path () {
      this.$router.push({ path: '/' })
    }
  },
  watch: {
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Sarabun&display=swap");

.app-plain {
  overflow: hidden;
  width: 100%;
}

.web-name {
  margin-left: 1%;
}

.business-title {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
  color: black !important;
  margin-top: 0%;
}

.business-box {
  margin-top: 0% !important;
  width: 230px;
}

.v-select.v-text-field--outlined.business-box-inside:not(.v-text-field--single-line)
  .v-select__selections {
  padding-left: 3% !important;
}

.v-text-field.v-text-field--enclosed.icon-select .v-input__append-inner {
  margin-top: 7px !important;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 64px;
  z-index: 18;
  width: 100%;
  margin-left: 0%;
}

.sub-bar {
  width: 100% !important;
  margin-top: 64px;
}

.left-bar {
  position: relative;
  top: 68px;
  left: 0;
  z-index: 17;
}

.content {
  margin-top: 10px;
  /* overflow: auto; */
  /* position: fixed; */
  /* top: 100px; */
  width: 100%;
  height: calc(100%);
  padding-left: 1%;
}

.username-block {
  font-family: "Sarabun", sans-serif;
  font-size: 18px;
}

.account-icon {
  color: gray;
  margin-right: 5%;
  font-size: 35px;
}

.menu-dropdown :hover {
  background-color: #f5f5f5;
}

.logout {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
}

.logout-icon {
  color: grey;
  margin-right: 5%;
  font-size: 25px;
}

.Admin {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
}

.Admin-icon {
  color: grey;
  margin-right: 5%;
  font-size: 25px;
}

.Service {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
}

.Service-icon {
  color: grey;
  margin-right: 5%;
  font-size: 25px;
}

.Release {
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
}

.Release-icon {
  color: grey;
  margin-right: 5%;
  font-size: 25px;
}

.menu-block:hover {
  background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E); height: 100%; width: 100%; opacity: 0.9;
}

/*.v-list-item--active.menu-green {
  background-color: #53ba47;
  color: white;
}*/

.side-menu {
  font-family: "Sarabun", sans-serif;
  font-size: 18px !important;
  line-height: 27px !important;
  top: 50px !important;
}

/*.side-menu:hover {
  color: white;
}*/

/*========================================*/

@media only screen and (max-width: 600px) {
  /*css for mobile screen*/
  .toolbar-mobile {
    padding-right: 0% !important;
    padding-left: 2%;
  }

  .v-toolbar__content,
  .v-toolbar__extension.toolbar-mobile {
    padding-left: 0% !important;
  }

  .business-box {
    width: 200px;
  }

  .v-toolbar__content,
  .v-toolbar__extension.toolbar-mobile {
    padding-right: 0% !important;
  }

  .web-name {
    margin-left: 0%;
  }

  .hidden-sm-and-down {
    display: none !important;
  }

  .username-block {
    padding-left: 0% !important;
    padding-right: 0% !important;
  }

  .menu-dropdown {
    width: 154px;
  }

  .content {
    padding-right: 0%;
  }
}

/*==========================================*/

@media only screen and (min-width: 960px) {
  /*css for pc screen*/
  .hidden-md-and-up {
    display: none !important;
  }
}
.tile {
  margin: 8px;
  border-radius: 8px;
  background: #EEEEEE;
}
.tile:hover {
  background: #BBDEFB;
}
</style>
