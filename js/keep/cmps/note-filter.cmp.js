export default {
  template: `
          <div class="note-search-filter">
               <input class="note-search-filter" @input="filter" v-model="filterBy.title" type="text" placeholder="Search Notes">
          </div>
      `,
  data() {
    return {
      filterBy: {
        title: '',
      },
    }
  },

  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
