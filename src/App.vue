<template>
  <v-app>
    <v-app-bar app hide-on-scroll dense flat>
      <v-tooltip
        bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-app-bar-nav-icon
          v-bind="attrs"
          v-on="on"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
        <span>Menu</span>
      </v-tooltip>

      <v-toolbar-title @click="goIndex" role="button">Shyamkumar Yadav</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip
        left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            @click="changeTheme"
          >
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
          
        </template>
        <span>Light/Dark Theme</span>
      </v-tooltip>
      
      
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed app temporary>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              src="@/assets/educator_oxfm.svg"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              >Shyamkumar Yadav</v-list-item-title
            >
            <v-list-item-subtitle
              >admin ji</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item :to="{path: '/'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{path: '/about'}">
            <v-list-item-icon>
              <v-icon>mdi-decagram</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About us</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{path: '/terms'}">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Terms</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

     <v-footer absolute app >
      <v-col
        flat
        tile
        filled
        class="text-center pa-0"
      >
        <v-card-text class="pt-0">
          <v-tooltip
            v-for="icon in icons"
            :key="icon.id"
            bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="mx-2"
                :href="icon.link"
                small
                target="_blank"
                icon
              >
                <v-icon
                :color="icon.color"
                v-bind="attrs"
                v-on="on"
              >
                {{icon.name}}
              </v-icon>
              </v-btn>
              
            </template>
            <span>{{icon.title}}</span>
          </v-tooltip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
          <v-icon>mdi-copyright</v-icon> All right Reversed by — <strong>Shyamkumar Yadav</strong> {{ new Date().getFullYear() }} 
        </v-card-text>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },
  created(){
    const theme = localStorage.getItem('elibrary-theme') === "true"
    this.$vuetify.theme.dark = theme
  },
  methods:{
    changeTheme(){
      localStorage.setItem('elibrary-theme', !this.$vuetify.theme.dark)
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    goIndex(){
      this.$router.push({ name: 'Home' })
      .catch(() => {})
    }
  },

  data: () => ({
    drawer: false,
    icons: [
        {id:0, name:'mdi-github',title:'Github', link:'//github.com/shyamkumaryadav', color:'grey'},
        {id:1, name:'mdi-twitter',title:'Twitter', link:'//twitter.com/shyamkumaryada', color:'light-blue'},
        {id:2, name:'mdi-youtube', title:'YouTube', link:'//youtube.com/channel/UCr2eV9fZwyGTQEGfCWyGCFg', color:'red darken-1'},
        {id:3, name:'mdi-patreon',title:'Patreon', link:'//patreon.com/shyamkumaryadav', color:'#f16551'},
        {id:4, name:'mdi-reddit',title:'Reddit', link:'//reddit.com/u/shyamkumaryadav', color:'deep-orange'},
      ],
  }),
};
</script>
