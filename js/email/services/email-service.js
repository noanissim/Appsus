import {
    utilService
} from '../../services/util-service';
import {
    storageService
} from '../../services/async-storage-service';

const EMAILS_KEY = 'emails';

_createEmails();

export const emailService = {
    query,
    remove,
    save,
    getEmptyEmail,
    getById,

    getPrevEmailId,
    getNextEmailId

};

function query() {
    return storageService.query(EMAILS_KEY);
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
}

function save(email) {
    if (email.id) return storageService.put(EMAILS_KEY, email);
    else return storageService.post(EMAILS_KEY, email);
}

function saveEmailFromGoogle(email) {
    return storageService.post(EMAILS_KEY, email);
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



function getEmptyEmail() {
    return {

    };
}


function _createEmail() {
    const email = {


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
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        console.log('here');
        emails = []

        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}