import { eventBus } from '../services/event-bus-service.js'
import { notesService } from '../keep/services/note-service.js'
import noteList from '../keep/cmps/note-list.cmp.js'
import notePreview from '../keep/cmps/note-preview.cmp.js'
import noteFilter from '../keep/cmps/note-filter.cmp.js'
import newNote from '../keep/cmps/new-note.cmp.js'

export default {
  template: `
       <section class="app-main main-keeper">
           <!-- search with filter -->
           <div class="searchBar-container">
             <note-filter @filtered="setFilter"/>
             <new-note  @noteAdded="getNotes"/>
           </div>
            <note-preview @pinNote="pinNote"  @updateColor="getNotes" @updateInput="updateNote"  @removeNote="removeNote" :notes="notesToShow"/>
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
      })
    },
    pinNote(note) {
      notesService.onPinNote(note).then(note => {
        this.getNotes()
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
    updateNote(newNote) {
      notesService.save(newNote).then(note => {
        this.getNotes()
      })
    },
  },
  computed: {
    notesToShow() {
      console.log(this.filterBy, 'Filter')
      if (!this.filterBy || this.filterBy.title === '') return this.notes
      const searchStr = this.filterBy.title.toLowerCase()
      return this.notes.filter((note, idx) => {
        if (note.type === 'note-txt') {
          return note.info.txt.toLowerCase().includes(searchStr)
        } else if (note.type === 'note-todos') {
          return note.info.label.toLowerCase().includes(searchStr)
        } else if (note.type === 'note-img') {
          return note.info.title.toLowerCase().includes(searchStr)
        }
      })
    },
  },
  components: {
    noteList,
    notePreview,
    noteFilter,
    newNote,
  },
}
