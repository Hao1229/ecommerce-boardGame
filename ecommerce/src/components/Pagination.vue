<template>
     <div class="d-flex justify-content-end">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li class="page-item" :class="{'disabled':!newPagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePagination(newPagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item" :class="{'active':newPagination.current_page === page}" v-for="page in newPagination.total_pages" :key="page">
                        <a class="page-link" href="#" @click.prevent="changePagination(page)">{{page}}</a>
                    </li>
                    <li class="page-item" :class="{'disabled':!newPagination.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="changePagination(newPagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
           </nav>
        </div>
</template>

<script>
export default {
  props: ['getPagination'],
  data () {
    return {}
  },
  computed: {
    newPagination () {
      return this.getPagination
    }
  },
  methods: {
    changePagination (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
