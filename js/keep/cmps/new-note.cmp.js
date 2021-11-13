import {
  notesService
} from '../services/note-service.js'
export default {
  props: ['emailNote'],
  template: `
            <div class="note-filter">
                <input class="search-notes-input" v-model="value" @keyup.enter="addNote"  type="text" :placeholder="placeHolder">
                <div class="add-buttons-container">
                    <button @click="onChangeType($event,'txt')" ><img src="./img/notes/txt.png"/></button>
                    <button @click="onChangeType($event,'img')"><img src="./img/notes/gallery.png"/></button>
                    <button @click="onChangeType($event,'video')"><img src="./img/notes/video.png"/></button>
                    <button @click="onChangeType($event,'todo')"><img src="./img/notes/list.png"/></button>
                    

                </div>
            </div>
        `,
  data() {
    return {
      type: 'txt',
      value: '',
      placeHolder: 'Whats on your mind?',
    }
  },
  created() {
    if (this.emailNote) {
      notesService.getTxtNoteFromEmail(this.emailNote.txt).then(res => {
        this.$emit('noteAdded')
        this.$router.push('/keep')
      })
    }
  },
  methods: {
    newNote() {
      this.$emit('newNote', {
        ...this.type
      })
    },
    onChangeType(ev, type) {
      this.type = type
      if (type === 'img') this.placeHolder = 'Please enter URL...'
      else if (type === 'video') this.placeHolder = 'Please enter video URL...'
      else if (type === 'todo') this.placeHolder = 'Make yourself a list!'
      else this.placeHolder = 'Whats on your mind?'
    },
    addNote() {
      let val = this.value
      if (this.type === 'video') {
        val = val.replace('watch?v=', 'embed/')
      }
      this.$emit('noteAdded', this.type, val)
      this.value = ''

    },
  },
}