import { notesService } from '../services/note-service.js'
import noteDynamic from './note-dynamic.cmp.js'

export default {
  props: ['notes'],
  template: `
          <section>
            
        <ul class="note-list" >
              <li  v-for="note in notes" class="note-preview-container":style="note.style" >
                  <note-dynamic class="note-dynamic"   @setInput="setInput" :note="note"/>
                  <div class="preview-btns">
                      <img src="img/notes/trashcan.png" @click.stop="remove(note.id)"/>
                      <div>
                        <!-- <img @click="openColor" src="img/notes/color.png"> -->
                        <input  @change="openColor($event,note.id)" type="color"/>
                      </div>
                      <img src="img/notes/mail.png"/>
                      <img src="img/notes/pin.png"/>
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
    remove(noteId) {
      this.$emit('removeNote', noteId)
    },
    openColor(ev, noteId) {
      console.log('COLOR', noteId, ev.target.value)
      notesService.changeBgcColor(noteId, ev.target.value).then(note => {
        this.$emit('updateColor', noteId)
      })
    },
    setInput(newNote) {
      console.log(newNote)
      this.$emit('updateInput', newNote)
    },
  },

  computed: {
    getNoteType() {},
  },
  components: { noteDynamic },
}
