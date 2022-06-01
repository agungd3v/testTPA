<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title"><nuxt-link to="/posts/create" class="btn btn-primary">Add New</nuxt-link></h4>
        </div>
        <div class="card-body">
          <ul class="nav nav-tabs" role="tablist">
            <li v-for="(tab, index) in post" :key="index" class="nav-item">
              <a
                class="nav-link"
                :class="tab.active ? 'active' : ''"
                :id="tab.key" data-bs-toggle="tab"
                :href="'#' + tab.key"
                :aria-controls="tab.key"
                role="tab"
                aria-selected="true"
                @click="activePanel(tab)"
              >
                {{ tab.title }}
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" :id="activeTab.key" :key="activeTab.key" role="tabpanel">
              <table-post :status="activeTab.key" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TablePost from '../../components/tablePost.vue'

export default {
  layout: 'main',
  components: {
    TablePost
  },
  data() {
    return {
      post: [
        {
          key: 'publish',
          title: 'Published',
          active: true
        },
        {
          key: 'draft',
          title: 'Drafts',
          active: false
        },
        {
          key: 'trash',
          title: 'Trashed',
          active: false
        }
      ],
      activeTab: null,
    }
  },
  created() {
    this.activeTab = this.post.filter(data => data.active)[0]
  },
  methods: {
    activePanel(tab) {
      this.post.map(data => data.key === tab.key ? data.active = true : data.active = false)
      return this.activeTab = tab
    },
  }
}
</script>
