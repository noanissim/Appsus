export default {
  template: `
          <div class="note-search-filter">
               <input class="note-search-filter" @input="filter" v-model="filterBy.title" type="text" placeholder="Search Notes">
               <select v-model="filterBy.selectOpt" @change="filter">
               <option  value="All">All</option>
              <option value="note-txt">Text</option>
              <option value="note-img">Image</option>
              <option value="note-todos">List</option>
              <option value="note-video">Video</option>
               </select>
          </div>
      `,
  data() {
    return {
      filterBy: {
        title: '',
        selectOpt: 'All',
      },
    }
  },
  created() {
    this.$emit('filtered', {
      ...this.filterBy
    })
  },
  methods: {
    filter() {
      // console.log(this.filterBy.selectOpt)
      this.$emit('filtered', {
        ...this.filterBy
      })
    },
  },
}