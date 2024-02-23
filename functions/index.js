const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

initializeApp();

exports.createBoardData = onDocumentCreated(
  'users/{uid}/boards/{boardId}',
  async (event) => {
    const { uid, boardId } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
      tabs: {
        todos: [],
        inProgress: [],
        completed: [],
      },
      lastUpdated: FieldValue.serverTimestamp(),
    });
  }
);
