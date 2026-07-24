import admin from "firebase-admin";

class FirebaseProvider {
  private initialized = false;

  constructor() {
    try {
      const {
        FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY,
      } = process.env;

      if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY
      ) {
        console.warn("Firebase is disabled.");
        return;
      }

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          }),
        });
      }

      this.initialized = true;
    } catch (error) {
      console.warn("Firebase initialization skipped:", error);
      this.initialized = false;
    }
  }

  async sendNotification({
    token,
    title,
    body,
    data = {},
  }: {
    token: string;
    title: string;
    body: string;
    data?: Record<string, string>;
  }) {
    if (!this.initialized) {
      return null;
    }

    return admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
      data,
    });
  }
}

export default new FirebaseProvider();