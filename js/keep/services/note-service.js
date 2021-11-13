import { storageService } from '../../services/async-storage-service.js'

export const notesService = {
  query,
  remove,
  save,
  addNewNote,
  updateNote,
  getById,
  changeBgcColor,
  onPinNote,
  onDuplicate,
  getTxtNoteFromEmail,
}

const NOTES_KEY = 'notesDB'

const notes = _createNotes()

function _createNotes() {
  let notes = loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Water Your Plants Boy!',
        },
        style: {
          backgroundColor: '#ffffff',
        },
      },
      {
        id: 'n107',
        type: 'note-video',
        style: {
          backgroundColor: '#9b59b6',
        },
        info: {
          label: `Class = "0 Maamatz"`,
          url: 'https://www.youtube.com/embed/ejNF1Vtupgs',
        },
      },
      {
        id: 'n113',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: '“99 little bugs in the code. 99 little bugs in the code. Take one down, patch it around. 127 little bugs in the code …”!',
        },
        style: {
          backgroundColor: '#81ecec',
        },
      },
      {
        id: 'n102',
        type: 'note-img',
        info: {
          url: './img/notes/user2.png',
          title: 'My Elegant Panda',
        },
        style: {
          backgroundColor: '#a29bfe',
        },
      },

      {
        id: 'n103',
        type: 'note-todos',
        style: {
          backgroundColor: '#81ecec',
        },
        info: {
          label: 'Finish Sprint Features',
          todos: [
            {
              txt: 'Filtering by type',
              doneAt: null,
            },
            {
              txt: 'Add Color feature',
              doneAt: 187111111,
            },
            {
              txt: 'Design Break !!',
              doneAt: 187111111,
            },
            {
              txt: 'You forgot to eat',
              doneAt: 187111111,
            },
            {
              txt: 'Apps integrations',
              doneAt: 187111111,
            },
          ],
        },
      },
      {
        id: 'n104',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: `Noa's Wedding at 27.2!`,
        },
        style: {
          backgroundColor: '#f1c40f',
        },
      },
      {
        id: 'n105',
        type: 'note-img',
        info: {
          url: './img/notes/sky.jpg',
          title: 'Sky after the sprint',
        },
        style: {
          backgroundColor: '#2ecc71',
        },
      },
      {
        id: 'n1014',
        type: 'note-img',
        info: {
          url: './img/notes/smile-sky.jpg',
          title: 'Sky before the sprint',
        },
        style: {
          backgroundColor: '#2ecc71',
        },
      },
      {
        id: 'n106',
        type: 'note-todos',
        style: {
          backgroundColor: '#ffffff',
        },
        info: {
          label: 'Super-market list',
          todos: [
            {
              txt: 'Milk',
              doneAt: null,
            },
            {
              txt: 'Coffe',
              doneAt: 18712432,
            },
            {
              txt: 'Bananas',
              doneAt: 18712432,
            },
            {
              txt: 'Beers',
              doneAt: 18712432,
            },
            {
              txt: 'Bread',
              doneAt: 18712432,
            },
            {
              txt: 'TimTam',
              doneAt: 18712432,
            },
            {
              txt: 'Cheese',
              doneAt: 18712432,
            },
            {
              txt: 'Vegetables',
              doneAt: 18712432,
            },
          ],
        },
      },

      {
        id: 'n108',
        type: 'note-img',
        info: {
          url: './img/notes/trip.png',
          title: 'Trip to america',
        },
        style: {
          backgroundColor: '#fab1a0',
        },
      },
      {
        id: 'n117',
        type: 'note-video',
        style: {
          backgroundColor: '#9b59b6',
        },
        info: {
          label: 'Amnon the Butcher',
          url: 'https://www.youtube.com/embed/1fYmmie3lag',
        },
      },
      {
        id: 'n109',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: `   Roses are red,
                 Violetts are blue
                 Theres an unexpected token ':'
                 at line 32 `,
        },
        style: {
          backgroundColor: '#81ecec',
        },
      },
      {
        id: 'n110',
        type: 'note-todos',
        style: {
          backgroundColor: '#ffeaa7',
        },
        info: {
          label: 'Cremeschnitte Cake Recipe',
          todos: [
            {
              txt: '3 egg yolks',
              doneAt: 18712432,
            },
            {
              txt: '1 (14 ounce) can sweetened condensed milk',
              doneAt: 18712432,
            },
            {
              txt: '1 pack of puff pastry',
              doneAt: 18712432,
            },
            {
              txt: '1 l milk',
              doneAt: 18712432,
            },
            {
              txt: '100 g cornflour',
              doneAt: 18712432,
            },
            {
              txt: '200 g icing sugar',
              doneAt: 18712432,
            },
            {
              txt: '25 g icing sugar with 1 vanilla pod',
              doneAt: 18712432,
            },
            {
              txt: '3 eggs',
              doneAt: 18712432,
            },
          ],
        },
      },
      {
        id: 'n111',
        type: 'note-video',
        style: {
          backgroundColor: '#9b59b6',
        },
        info: {
          label: 'Liverpool Kickin Ass',
          url: 'https://www.youtube.com/embed/FonkUc371uI',
        },
      },
    ]
    saveToStorage(NOTES_KEY, notes)
  }
  return notes
}

function getImgNote(url) {
  return {
    type: 'note-img',
    info: {
      url,
    },
    style: {
      backgroundColor: '#9b59b6',
    },
    isPinned: true,
  }
}

function getTxtNote(txt) {
  return {
    type: 'note-txt',
    isPinned: true,
    info: {
      txt,
    },
    style: {
      backgroundColor: '#a29bfe',
    },
  }
}

function getTxtNoteFromEmail(txt) {
  let note = {
    type: 'note-txt',
    isPinned: true,
    info: {
      txt,
    },
    style: {
      backgroundColor: '#a29bfe',
    },
  }
  return storageService.postUnshift(NOTES_KEY, note)
}

function getTodosNote(label) {
  return {
    type: 'note-todos',
    info: {
      label,
      todos: [
        {
          txt: 'Change me',
          doneAt: Date.now(),
        },
      ],
    },
    style: {
      backgroundColor: '#a29bfe',
    },
  }
}

function getVideoNote(url) {
  return {
    type: 'note-video',
    style: {
      backgroundColor: '#9b59b6',
    },
    info: {
      label: 'Im a Video',
      url,
    },
  }
}

function addNewNote(type, value) {
  if (!value) return
  let note = null
  if (type === 'txt') note = getTxtNote(value)
  if (type === 'img') note = getImgNote(value)
  if (type === 'todo') note = getTodosNote(value)
  if (type === 'video') note = getVideoNote(value)
  return storageService.postUnshift(NOTES_KEY, note)
}

function changeBgcColor(noteId, color) {
  return getById(noteId).then(note => {
    // console.log(note)
    note.style.backgroundColor = color
    storageService.put(NOTES_KEY, note)
  })
}

function query() {
  return storageService.query(NOTES_KEY)
}

function remove(id) {
  return storageService.remove(NOTES_KEY, id)
}

function updateNote(id) {
  return storageService.put(NOTES_KEY, id)
}

function onPinNote(note) {
  return remove(note.id).then(res => {
    // console.log('REMOVE FROM SERVICE', res)
    return storageService.postUnshift(NOTES_KEY, note)
  })
}

function onDuplicate(note) {
  return storageService.postUnshift(NOTES_KEY, note)
}

function getById(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note)
  else return storageService.postUnshift(NOTES_KEY, note)
}
