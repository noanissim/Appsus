import { eventBus } from '../services/event-bus-service.js'
import { notesService } from '../keep/services/note-service.js'
import noteList from '../keep/cmps/note-list.cmp.js'
import notePreview from '../keep/cmps/note-preview.cmp.js'
import noteFilter from '../keep/cmps/note-filter.cmp.js'
import newNote from '../keep/cmps/new-note.cmp.js'

export default {
  template: `
       <section class="app-main main-keeper">
           <h1>app-keep</h1>
           <!-- <header></header> -->
           <!-- search with filter -->
            <!-- <note-filter @filtered="setFilter"/> -->
          <new-note @noteAdded="getNotes"/>
            <!-- <book-add @bookAdded="addBook" /> -->

            <note-preview  @removeNote="removeNote" :notes="notesToShow"/>
        </section>
    `,
  data() {
    return {
      notes: null,
      filterBy: null,
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
    setFilter(filterBy) {
      this.filterBy = filterBy
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
    noteFilter,
    newNote,
  },
}
