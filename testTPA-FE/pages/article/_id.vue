<template>
  <div class="container-fluid">
    <div class="row justify-content-center py-5">
      <div class="col-md-8 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div v-if="article">
              <h1 v-html="article.title"></h1>
              <div v-html="article.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: null
    }
  },
  mounted() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      try {
        const http = await this.$axios.$get('/article/' + this.$route.params.id)
        if (Object.keys(http).length !== 0 && http.status == 'publish') this.article = http
        else this.$router.replace({name: 'error'})
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>