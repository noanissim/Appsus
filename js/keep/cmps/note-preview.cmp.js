import noteImg from './note-img.cmp.js'
import noteTxt from './note.txt.cmp.js'
import { notesService } from '../services/note-service.js'
import noteSurvey from './note-survey.cmp.js'

export default {
  props: ['notes'],
  template: `
          <section>
          <ul class="note-list">
              <li  v-for="note in notes" class="note-preview-container" >
                  <note-survey :note="note"/>
                  <div>
                      <button @click.stop="remove(note.id)">X</button>
                      <input type="color"/>
                  </div>
              </li>
          </ul>
    </section>
      `,
  data() {
    return {}
  },
  created() {},
  methods: {
    remove(noteId) {
      this.$emit('removeNote', noteId)
    },
  },
  computed: {
    getNoteType() {},
  },
  components: { noteImg, noteTxt, noteSurvey },
}
