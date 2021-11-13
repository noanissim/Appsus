import {
  notesService
} from '../services/note-service.js'
import noteDynamic from './note-dynamic.cmp.js'

export default {
  props: ['notes'],
  template: `
          <section class="note-list-container">
            
        <ul class="note-list" >
              <li  v-for="(note,idx) in notes" :key="note.id" class="note-preview-container":style="note.style" >
                  <note-dynamic  class="note-dynamic"   @setInput="setInput" :note="note"/>
                  <div class="preview-btns">
                      <img title="Delete" src="./img/notes/trashcan.png" @click.stop="remove(note.id)"/>
                      <div>
                        <input title="Color" class="color-picker" :value="note.style.backgroundColor"  @change="openColor($event,note.id)" type="color"/>
                      </div>
                      <router-link class="clean-btn" :to="'/email/add/'+note.info.txt">
                          <img title="Send as email"   src="img/notes/mail.png"/>
                    </router-link>
                      <img title="Pin note" @click="pinNote(note)" src="img/notes/pin.png"/>
                      <img title="Duplicate" @click="duplicateNote(note)" src="img/notes/pluss.png"/>
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
    sendAsMail(note) {},
    remove(noteId) {
      this.$emit('removeNote', noteId)
    },
    pinNote(note) {
      this.$emit('pinNote', note)
    },
    duplicateNote(note) {
      this.$emit('duplicate', note)
    },
    openColor(ev, noteId) {
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
  components: {
    noteDynamic
  },
}