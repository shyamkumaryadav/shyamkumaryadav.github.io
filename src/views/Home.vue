<template>
  <v-container class="mb-8">
    <v-row v-if="!deta.isload">
      <v-col sm="12" md="6" lg="3" v-for="repo in repos" :key="repo.id">
        <v-card
        >
          <v-img
            @click="imgclick(repo)"
            :src="repo.owner.avatar_url"
            height="200px"
          ></v-img>
          <v-card-title style="font-size:15px;">
            {{ repo.name.split("-").join(" ").toUpperCase() }}
          </v-card-title>
          <v-card-subtitle>
            {{repo.stargazers_count}} <v-icon small>mdi-star</v-icon> {{repo.watchers}} <v-icon small>mdi-watch</v-icon> {{repo.forks_count}} <v-icon small>mdi-source-fork</v-icon>
          </v-card-subtitle>
          <v-card-text>
            <div>{{ parseFloat((repo.size / Math.pow(1000, Math.floor(Math.log(repo.size) / Math.log(1000)))).toFixed(2)) + ' MB' }}</div>

            <div><v-icon small>mdi-update</v-icon> {{ new Date(repo.updated_at).toDateString() }}</div>
          </v-card-text>
          <v-chip class="ma-1" v-for="(tags, tag) in repo.tags" :key="tags"
              >
               {{ tag }}
              </v-chip>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              :href="repo.html_url"
            >
              Explore
            </v-btn>
            <v-btn
              v-show="repo.homepage != '' "
              color="orange lighten-2"
              text
              :href="repo.homepage"
            >
              Site
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-show="repo.description"
              icon
              @click="repo.fork = !repo.fork"
            >
              <v-icon>{{ repo.fork ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>          </v-card-actions>
          <v-expand-transition>
            <div v-show="repo.fork">
              <v-divider></v-divider>
              <v-card-text>
                {{ repo.description }}
              </v-card-text>
              
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
       <v-card
        >
          <v-img
          @click="deta.isload = false"
            :src="deta.repo.owner.avatar_url"
            height="200px"
          ></v-img>
          <v-card-title style="font-size:15px;">
            {{ deta.repo.name.split("-").join(" ").toUpperCase() }}
          </v-card-title>
          <v-card-subtitle>
            {{deta.repo.stargazers_count}} <v-icon small>mdi-star</v-icon> {{deta.repo.watchers}} <v-icon small>mdi-watch</v-icon> {{deta.repo.forks_count}} <v-icon small>mdi-source-fork</v-icon>
          </v-card-subtitle>
          <v-card-text>
            <div>{{ parseFloat((deta.repo.size / Math.pow(1000, Math.floor(Math.log(deta.repo.size) / Math.log(1000)))).toFixed(2)) + ' MB' }}</div>

            <div><v-icon small>mdi-update</v-icon> {{ new Date(deta.repo.updated_at).toDateString() }}</div>
          </v-card-text>
          <v-chip class="ma-1" v-for="(tags, tag) in deta.repo.tags" :key="tags"
              >
               {{ tag }}
              </v-chip>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              :href="deta.repo.html_url"
            >
              Explore
            </v-btn>
            <v-btn
              v-show="deta.repo.homepage != '' "
              color="orange lighten-2"
              text
              :href="deta.repo.homepage"
            >
              Site
            </v-btn>
            </v-card-actions>
          <v-expand-transition>
            <div>
              <v-divider></v-divider>
              <v-card-text>
                {{ deta.repo.description ? deta.repo.description : "NULL" }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
    </v-row>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  created(){
    // lowlighter
    fetch("https://api.github.com/users/shyamkumaryadav/repos")
    .then(res => res.json())
    .then(data => this.repos = data.filter(val => val.fork == false).sort().map(val => {
      fetch(val.languages_url)
      .then(res => res.json())
      .then(data => val.tags = data)
      return val
    }))
    .catch(error => console.error("Error: " + error))

    this.deta.isload = false

  },
  components: {
    // comp
  },
  methods:{
    imgclick(repo){
      this.deta.isload = true
      this.deta.repo = repo
    }
    // getChip(lan_url){
    //   return fetch(lan_url)
    //   .then(res => res.json())
    //   .then(data => data)
    // }
  },
  data(){
    return ({
      show: false,
      repos: null,
      deta: {
        isload: false,
        repo: {}
      }
    })
  },
  // computed:{
  //   getTegs(repo){
  //     fetch(repo.languages_url)
  //     .then(res => res.json())
  //   },
  // },
}
</script>
