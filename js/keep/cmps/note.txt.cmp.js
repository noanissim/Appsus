export default {
  props: ['note'],
  template: `
            <div class="note-txt">
                <h4>{{note.info.txt}}</h4>
            </div>
        `,
  data() {
    return {}
  },
}
