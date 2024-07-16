// FirebaseModule.js

import { ref, set, update, remove, onValue } from 'firebase/database';

export const doLogin = async (username, database, handleUpdate) => {
  try {
    await remove(ref(database, '/notifs/' + username));

    onValue(ref(database, '/notifs/' + username), snapshot => {
      if (snapshot.exists()) {
        handleUpdate(snapshot.val(), username);
      }
    });
  } catch (exception) {
    console.error(exception);
  }
};

export const doOffer = async (to, offer, database, username) => {
  try {
    await set(ref(database, '/notifs/' + to), {
      type: 'offer',
      from: username,
      offer: JSON.stringify(offer),
    });
  } catch (exception) {
    console.error(exception);
  }
};

export const doAnswer = async (to, answer, database, username) => {
  try {
    await update(ref(database, '/notifs/' + to), {
      type: 'answer',
      from: username,
      answer: JSON.stringify(answer),
    });
  } catch (exception) {
    console.error(exception);
  }
};

export const doCandidate = async (to, candidate, database, username) => {
  try {
    await update(ref(database, '/notifs/' + to), {
      type: 'candidate',
      from: username,
      candidate: JSON.stringify(candidate),
    });
  } catch (exception) {
    console.error(exception);
  }
};
