import { eventBus } from '../services/event-bus-service.js'
import { notesService } from '../keep/services/note-service.js'
import noteList from '../keep/cmps/note-list.cmp.js'
import notePreview from '../keep/cmps/note-preview.cmp.js'

export default {
  template: `
       <section class="app-main">
           <h1>app-keep</h1>
           <!-- <header></header> -->
           <!-- search with filter -->
            <!-- <book-filter @filtered="setFilter"/> -->
            <!-- <book-add @bookAdded="addBook" /> -->
            <note-preview  @removeNote="removeNote" :notes="notesToShow"/>
        </section>
    `,
  data() {
    return {
      notes: null,
    }
  },
  created() {
    this.getNotes()
  },
  methods: {
    getNotes() {
      notesService.query().then(notes => {
        this.notes = notes
        console.log(this.notes)
      })
    },
    removeNote(id) {
      notesService.remove(id).then(notes => {
        this.getNotes()
      })
    },
  },
  computed: {
    notesToShow() {
      return this.notes
    },
  },
  components: {
    noteList,
    notePreview,
  },
}
