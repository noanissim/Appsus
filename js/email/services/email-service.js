import {
    utilService
} from '../../services/util-service.js';
import {
    storageService
} from '../../services/async-storage-service.js';

const EMAILS_KEY = 'emails';

_createEmails();

export const emailService = {
    query,
    remove,
    save,
    getEmptyEmail,
    getById,
    getPrevEmailId,
    getNextEmailId,
    saveSentEmails

};

function query() {
    return storageService.query(EMAILS_KEY);
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
}

function save(email) {
    if (email.id) return storageService.put(EMAILS_KEY, email);
    else return storageService.postUnshift(EMAILS_KEY, email);
}

function saveSentEmails(email) {
    return storageService.postUnshift(EMAILS_KEY, email);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

let loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function getEmptyEmail() {
    return _createEmail();
}


function _createEmail() {
    let loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Appsus Admin'
    }
    const email = {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        lables: [],
        sentAt: Date.now(),
        to: {
            email: 'user@user.com',
            fullname: ''
        },
        from: {
            email: loggedinUser.email,
            fullname: 'Appsus Admin'
        }

    };
    return email;
}




function getNextEmailId(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(emails => emails.id === emailId);
            return (idx === emails.length - 1) ? emails[0].id : emails[idx + 1].id;
        });
}

function getPrevEmailId(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId);
            return (idx === 0) ? emails[emails.length - 1].id : emails[idx - 1].id;
        });
}

function _createEmails() {
    let loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Appsus Admin'
    }
    let otherUser1 = {
        email: 'kim@gmail.com',
        fullname: 'Kim Kardashian'
    }
    let otherUser2 = {
        email: 'khloe@gmail.com',
        fullname: 'Khloe Kardashian'
    }
    let otherUser3 = {
        email: 'kourtney@gmail.com',
        fullname: 'Kourtney Kardashian'
    }
    let otherUser4 = {
        email: 'kris@gmail.com',
        fullname: 'Kris Jenner'
    }
    let otherUser5 = {
        email: 'scott@gmail.com',
        fullname: 'Scott Disick'
    }
    let otherUser6 = {
        email: 'dropbox@gmail.com',
        fullname: 'Dropbox'
    }
    let otherUser7 = {
        email: 'linkedin@gmail.com',
        fullname: 'LinkedIn'
    }
    let otherUser8 = {
        email: 'github@gmail.com',
        fullname: 'Github'
    }
    let otherUser9 = {
        email: 'spotify@gmail.com',
        fullname: 'Spotify'
    }
    let otherUser10 = {
        email: 'avocode@gmail.com',
        fullname: 'Avocode'
    }
    let otherUser11 = {
        email: 'fontawesome@gmail.com',
        fullname: 'Font Awesome'
    }

    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        // console.log('here');
        emails = [{
                id: utilService.makeId(),
                subject: 'Spotify Premium',
                body: 'Don\'t miss one month free trial!',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133365594,
                to: loggedinUser,
                from: otherUser9
            },
            {
                id: utilService.makeId(),
                subject: 'Your Avocode free trial is over',
                body: 'The free trial for noanissim5\'s team has ended. Please log in and purchase a subscription within 14 days to keep working on your design projects',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930500,
                to: loggedinUser,
                from: otherUser10
            },
            {
                id: utilService.makeId(),
                subject: 'Dropbox is full!',
                body: 'Ziv and 68 others made changes in your shared folders‏‏',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133897494,
                to: loggedinUser,
                from: otherUser6
            },
            {
                id: utilService.makeId(),
                subject: 'Israel just posted',
                body: 'Israel Israeli recently posted‏‏, go check it out!',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: loggedinUser,
                from: otherUser7
            },
            {
                id: utilService.makeId(),
                subject: 'Please verify your device',
                body: 'Hey noanissim! A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133920394,
                to: loggedinUser,
                from: otherUser8
            },
            {
                id: utilService.makeId(),
                subject: 'Noa just posted',
                body: 'Noa  recently posted‏‏, go check it out!',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1557777930594,
                to: loggedinUser,
                from: otherUser7
            },
            {
                id: utilService.makeId(),
                subject: 'Dropbox is full!',
                body: 'Ziv and 68 others made changes in your shared folders‏‏',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551185230114,
                to: loggedinUser,
                from: otherUser6
            },
            {
                id: utilService.makeId(),
                subject: 'Spotify Premium',
                body: 'Don\'t miss one month free trial!',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: loggedinUser,
                from: otherUser9
            },
            {
                id: utilService.makeId(),
                subject: 'Your Avocode free trial is over',
                body: 'The free trial for noanissim5\'s team has ended. Please log in and purchase a subscription within 14 days to keep working on your design projects',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1558893930594,
                to: loggedinUser,
                from: otherUser10
            },
            {
                id: utilService.makeId(),
                subject: 'Confirm Your Font Awesome Account',
                body: 'HEY THERE! You\'re so close to using your first Font Awesome Kit!',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1661133930794,
                to: loggedinUser,
                from: otherUser11
            },
            {
                id: utilService.makeId(),
                subject: 'Yarden just posted',
                body: 'Yarden Mathieson recently posted‏‏, go check it out!',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: loggedinUser,
                from: otherUser7
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser7,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser7,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser6,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser8,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser9,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser10,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Hello!',
                body: 'I\'m using Appsus! The best app ever made',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551700930011,
                to: otherUser11,
                from: loggedinUser
            },

        ]

        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}