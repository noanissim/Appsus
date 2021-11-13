import { notesService } from '../services/note-service.js'
import noteDynamic from './note-dynamic.cmp.js'

export default {
  props: ['notes'],
  template: `
          <section class="note-list-container">
            
        <ul class="note-list" >
              <li  v-for="(note,idx) in notes" :key="note.id" class="note-preview-container":style="note.style" >
                  <note-dynamic  class="note-dynamic"   @setInput="setInput" :note="note"/>
                  <div class="preview-btns">
                      <img src="img/notes/trashcan.png" @click.stop="remove(note.id)"/>
                      <div>
                        <input class="color-picker" :value="note.style.backgroundColor"  @change="openColor($event,note.id)" type="color"/>
                      </div>
                      <img @click="sendAsMail(note)"  src="img/notes/mail.png"/>
                      <img @click="pinNote(note)" src="img/notes/pin.png"/>
                      <img @click="duplicateNote(note)" src="img/notes/pluss.png"/>
                  </div>
              </li>
          </ul>
    </section>
      `,
  data() {
    return {
      isTxt: false,
      isImg: false,
      isVideo: false,
    }
  },
  created() {},
  methods: {
    sendAsMail(note) {
      console.log('NOTE', note)
    },
    remove(noteId) {
      this.$emit('removeNote', noteId)
    },
    pinNote(note) {
      console.log(note)
      this.$emit('pinNote', note)
    },
    duplicateNote(note) {
      this.$emit('duplicate', note)
    },
    openColor(ev, noteId) {
      console.log('COLOR', noteId, ev.target.value)
      notesService.changeBgcColor(noteId, ev.target.value).then(note => {
        this.$emit('updateColor', noteId)
      })
    },
    setInput(newNote) {
      this.$emit('updateInput', newNote)
    },
  },

  computed: {
    getNoteType() {},
  },
  components: { noteDynamic },
}
