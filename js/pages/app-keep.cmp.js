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
            <note-preview class='' @duplicate="duplicate" @pinNote="pinNote"  @updateColor="getNotes" @updateInput="updateNote"  @removeNote="removeNote" :notes="notesToShow"/>
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
    duplicate(note) {
      notesService.onDuplicate(note).then(note => {
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
      if (
        !this.filterBy ||
        (this.filterBy.title === '' && this.filterBy.selectOpt === 'All')
      )
        return this.notes
      const searchStr = this.filterBy.title.toLowerCase()
      return this.notes.filter(note => {
        if (
          note.type === 'note-txt' &&
          (this.filterBy.selectOpt === note.type ||
            this.filterBy.selectOpt === 'All') &&
          note.info.txt.toLowerCase().includes(searchStr)
        ) {
          return note
        } else if (
          note.type === 'note-todos' &&
          (this.filterBy.selectOpt === note.type ||
            this.filterBy.selectOpt === 'All') &&
          note.info.label.toLowerCase().includes(searchStr)
        ) {
          return note
        } else if (
          note.type === 'note-img' &&
          (this.filterBy.selectOpt === note.type ||
            this.filterBy.selectOpt === 'All') &&
          note.info.title.toLowerCase().includes(searchStr)
        ) {
          return note
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
