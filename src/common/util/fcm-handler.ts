import { Injectable } from '@nestjs/common';
import * as firebaseConfig from './firebase-admin.json';
import * as firebase from 'firebase-admin';

const firebase_params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

@Injectable()
export class FirebaseCloudMessagingHandler {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }
  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    };
    return await firebase
      .messaging()
      .send(message)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}
