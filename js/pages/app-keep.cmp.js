import {
  notesService
} from '../keep/services/note-service.js'
import notePreview from '../keep/cmps/note-preview.cmp.js'
import noteFilter from '../keep/cmps/note-filter.cmp.js'
import newNote from '../keep/cmps/new-note.cmp.js'

export default {
  template: `
       <section class="app-main main-keeper">
           <div class="searchBar-container">
             <note-filter @filtered="setFilter"/>
             <new-note :emailNote="emailNote" @noteAdded="noteAdded"/>
           </div>
            <note-preview class='' @duplicate="duplicate" @pinNote="pinNote"  @updateColor="getNotes" @updateInput="updateNote"  @removeNote="removeNote" :notes="notesToShow"/>
        </section>
    `,
  data() {
    return {
      notes: null,
      filterBy: null,
      emailNote: null
    }
  },
  created() {
    this.getNotes()
  },
  watch: {
    '$route.params.emailId': {
      handler() {
        const {
          emailId
        } = this.$route.params;
        const {
          subject
        } = this.$route.params;
        const {
          body
        } = this.$route.params;
        const {
          fullname
        } = this.$route.params;
        // console.log('emailId', emailId);
        // console.log('subject', subject);
        // console.log('body', body);
        // console.log('fullname', fullname);
        if (emailId !== undefined) {
          this.emailNote = {
            txt: 'Note recevied from email!!! Id:' + emailId + ', subject: ' + subject + ', body: ' + body + ' ,from: ' + fullname
          }
        }

        // bookService.getById(bookId)
        //     .then(book => this.book = book);
        // bookService.getNextBookId(bookId)
        //     .then(bookId => this.nextBookId = bookId);
        // bookService.getPrevBookId(bookId)
        //     .then(bookId => this.previousBookId = bookId);
      },
      immediate: true
    }
  },
  methods: {
    getNotes() {
      notesService.query().then(notes => {
        this.notes = JSON.parse(JSON.stringify(notes))
      })
    },
    noteAdded(type, val) {
      notesService.addNewNote(type, val).then(res => {
        this.getNotes()
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
    notePreview,
    noteFilter,
    newNote,
  },
}