import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as process from 'process';
import { InteractionException } from '../exception/interaction.exception';
import { ResponseCode } from '../api';

const firebase_params = {
  type: process.env.FIREBASE_TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER,
  clientC509CertUrl: process.env.CLIENT_CERT,
  universe_domain: process.env.UNIVERSE_DOMAIN,
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
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw new InteractionException(ResponseCode.INTERACTION_SEND_FAIL);
      });
  }
}
