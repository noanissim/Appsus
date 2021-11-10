import notePreview from './note-preview.cmp.js'
export default {
  props: ['notes'],
  template: `
  <section>
          <ul class="note-list">
              <li  v-for="note in notes" class="note-preview-container" >
                <note-preview :note="note"/>
              </li>
          </ul>
    </section>
    `,

  methods: {
    remove(bookId) {
      this.$emit('removeBook', bookId)
    },
    openDetails(bookId) {
      this.$router.push(`/book/${bookId}`)
    },
  },
  components: {
    notePreview,
  },
}
