export default {
  template: `
          <div class="note-filter">
              <input class="search-input" @input="filter" v-model="filterBy.title" type="text" placeholder="Whats on your mind?">
              <div>
                  <button><img src="../img/notes/txt.png"/></button>
                  <button><img src="../img/notes/gallery.png"/></button>
                  <button><img src="../img/notes/video.png"/></button>
              </div>
          </div>
      `,
  data() {
    return {
      filterBy: {
        txt: '',
        img: '',
        video: '',
      },
    }
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
