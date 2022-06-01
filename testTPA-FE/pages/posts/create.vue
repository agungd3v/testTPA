<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3>Create Article</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit()">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="form-group mb-2">
                  <label for="title">Title</label>
                  <input type="text" class="form-control" v-model="title">
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group mb-2">
                  <label for="category">Category</label>
                  <input type="text" class="form-control" v-model="category">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group mb-2">
                  <label for="content">Content</label>
                  <textarea v-model="content" id="content" class="form-control" rows="5"></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary" @click="type = 'publish'" :disabled="submit">Publish</button>
                  <button type="submit" class="btn btn-warning" @click="type = 'draft'" :disabled="submit">Draft</button>
                  <nuxt-link to="/posts" class="btn btn-danger">Cancel</nuxt-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'main',
  data() {
    return {
      title: null,
      content: null,
      category: null,
      type: null,
      submit: false
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.title) return alert('title required')
      if (!this.content) return alert('content required')
      if (!this.category) return alert('category required')
      this.submit = true
      try {
        const http = await this.$axios.$post('/article', {
          title: this.title,
          content: this.content,
          category: this.category,
          status: this.type
        })
        this.submit = false
        if (Object.keys(http).length > 0) return alert(http.message)
        return this.$router.replace({path: '/posts'})
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>