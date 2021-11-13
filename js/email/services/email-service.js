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

// function addReviewToEmail(emailId, review) {
//     return getById(emailId)
//         .then(email => {
//             if (!email.reviews) email.reviews = []
//             email.reviews.push(review)
//             return save(email)
//         })

// }

// function deleteReviewFromEmail(emailId, reviewIdx) {
//     return getById(emailId)
//         .then(email => {
//             (email.reviews).splice(reviewIdx, 1)
//             return save(email)
//         })

// }

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

    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        // console.log('here');
        emails = [{
                id: utilService.makeId(),
                subject: 'Message 1',
                body: 'Skims is the best',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: otherUser1,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Message 2',
                body: 'Of course you do because you get 10%. That is sick.',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                from: otherUser2,
                to: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Message 3',
                body: 'You\'re doing amazing sweetie',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: otherUser4,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Message 4',
                body: 'Kim, would you stop taking pictures of yourself? Your sister’s going to jail',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: otherUser4,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Message 5',
                body: 'Kim, there’s people that are dying',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: otherUser3,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Message 6',
                body: 'You know, I’ve realized that I’m probably just perfect and it’s everybody else around me that’s got issues',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: otherUser5,
                from: loggedinUser
            },
            {
                id: utilService.makeId(),
                subject: 'Message 7',
                body: 'Aunty Kris, it’s me, Todd Kraines',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: loggedinUser,
                from: otherUser5,
            },
            {
                id: utilService.makeId(),
                subject: 'Message 8',
                body: 'When my kids are happy, I am happy',
                isRead: false,
                isStarred: false,
                lables: ['important', 'romantic'],
                sentAt: 1551133930594,
                to: loggedinUser,
                from: otherUser4
            },

        ]

        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}