<template>
  <div :key="componentKey">
    <table class="datatables-ajax table" id="posts">
      <thead>
        <tr>
          <th class="text-nowrap">Title</th>
          <th class="text-nowrap w-100">Content</th>
          <th class="text-nowrap">Category</th>
          <th>Action</th>
        </tr>
      </thead>
    </table>
    <div class="modal fade" id="delete" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Move Trash</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            apakah kamu yakin ingin memindahkan article ini ke tempat sampah?
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-danger">Move Trash</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        link: [
          { rel: 'stylesheet', type: 'text/css', href: '/app-assets/vendors/css/tables/datatable/dataTables.bootstrap5.min.css' },
          { rel: 'stylesheet', type: 'text/css', href: '/app-assets/vendors/css/tables/datatable/responsive.bootstrap5.min.css' },
        ],
        script: [
          { src: '/app-assets/vendors/js/tables/datatable/jquery.dataTables.min.js', body: true, defer: true, callback: this.onScriptLoaded },
          { src: '/app-assets/vendors/js/tables/datatable/datatables.bootstrap5.min.js', body: true, defer: true, callback: this.onScriptLoaded },
          { src: '/app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js', body: true, defer: true, callback: this.onScriptLoaded },
          { src: '/app-assets/vendors/js/tables/datatable/responsive.bootstrap5.js', body: true, defer: true, callback: this.onScriptLoaded }
        ]
      }
    },
    data() {
      return {
        table: null,
        componentKey: 0,
        delete: null
      }
    },
    props: ['status'],
    mounted() {
      this.forceRerender()
      // this.table = null
      if (this.table === null) {
        this.onScriptLoaded()
      }
    },
    methods: {
      onScriptLoaded() {
        let chars = 0
        setTimeout(() => {
          this.table = $(`#posts`).DataTable({
            destroy: true,
            processing: true,
            serverSide: true,
            ajax: {
              url: process.env.API_URL + `/article?status=${this.status}`,
              method: 'GET',
              data: function (value) {},
            },
            columns: [
              { data: 'title', name: 'title', render: function(value, param, data) {
                return `<p class="text-nowrap fw-bold mb-0">${value}</p>`
              }},
              { data: 'content', name: 'content', render: function(value, param, data, idx) {
                chars = $(window).width() / 20
                return `<p class="text-nowrap fw-bold mb-0">${value.substring(0, Math.round(chars))}...</p>`
              }},
              { data: 'category', name: 'category', render: function(value, param, data) {
                return `<p class="text-nowrap mb-0">${value}</p>`
              }},
              { data: 'id', name: 'id', render: function(value, param, data) {
                return `
                  <div class="btn-group">
                    <a class="btn btn-icon btn-primary" href="/article/${value}" target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                      </svg>
                    </a>
                    <a class="btn btn-icon btn-success" href="/posts/update/${value}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16">
                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/>
                      </svg>
                    </a>
                    <button class="btn btn-icon btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                  </div>
                `
              }}
            ],
            chaces: true
          })
        }, 0)
      },
      forceRerender() {
        this.componentKey += 1
      },
      async moveTrash() {

      }
    }
  }
</script>