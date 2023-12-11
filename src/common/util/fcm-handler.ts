import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as process from 'process';
import { InteractionException } from '../exception/interaction.exception';
import { ResponseCode } from '../api';

const firebase_params = {
  type: 'process.env.FIREBASE_TYPE',
  projectId: ' process.env.PROJECT_ID',
  privateKeyId: 'process.env.PRIVATE_KEY_ID',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdQiE6AJFV238E\nJ67sgP3BsBXJQHtn3MvG8KK3C0A2AxXsb3r6vEwpgINIGeW20eaxN8Suikvw7gV7\nfOTAhpJlod1pEa+OwX9SCjADgPA+xej6GiDEJE5I3xqHw42bwiUD2ZMSQvjAFtRj\nKFgZwSz/DXyo9iEYrjOF+2WZKnvxcgooMF151qqrMjhnRUJ17VdkQpgjPktbOD9N\nIVselesF6HcHyNXWpNw922RQlhOGDkq+3mlIDSbCVHOeYEyVhR1uwMV4cqm5jmoa\nmIswKyDdbV4NrjWIWFiN8sq4yYrZBBufATNIURxOUZkmhlQlC+3ybnU+unJEAinf\nrH5PTXsnAgMBAAECggEAJRYE3vhmTfCrNjAjnQvYjDZ6FNGbqMVV209BmFhTZsl4\ngJ9TydDhR0JS84yD84bx2CZWQHFF8oY3jcVI7yxtVwGCxTYSCGESpSbY5uKgBbXH\nuT+zLX6AZcgTqiPQgASblRpZCEv5/NcFdHL9v+kiMu4b0X7mFDt01CqS7bmqrChB\nl8W3BlaY8vuHJDbUYs2TkVLRhzDxJDOYH2NSVju6AvZu/rTPLvZLyA/DhmNcsGR6\nyr5cSpTutGvAAM4xjPOzW+G7SVm8l9YL1TqiSpvgslDFKdZH9ec+P/dj7VVmJ28w\nFVGSMp05kfZ4UrycvX8aDNMzvoE3/M7SUO1omPdjLQKBgQDOPW5Sghxw1eb6Hol3\nVKmFvWOVNwvXwiuBciEAW1QwjfiBeV6RFewbZ7OiLBIftaAUX5YBOCkpVX+d3tDz\nU2aMv5Hmh6zJSqxzrOSz26nZWGe/eAqF87Y4n7Uzq1jnlkMJLR/LOi0P9Whg6OnC\nYfC4fyhgQ3J0PGjOj4K4gXxM2wKBgQDDM09iVPqcyqTTb6JEZhRRAvvRcEBkhcQH\nq/x90Z/sCD21t7Hu4/YVpRwHpC6QudwVo39ycK9e42UdOln/2nfOHh3qRul5FTRf\nVpz/3Z3J593EgVurmi3DJ2qFU13QNYW9mwWqAj24CPlZFUFYZFs6BehpxqJY6gcb\nCJzU9jl2pQKBgFYPFkEBoAKJj2dhZLVRs6dl/u7d2GhA0syiJhkzAu973m2QiqB6\nCFrrK+8I+ssWi+TUehCqMarYzXa/6msOqyUiLyyGAti/+zQNuiU/DSHvnOMtoR6C\nMtBv/DnCT0fb0L88gB7aeMFHAzYlGp4NJlimXt/EZTcRmh5PjhmVlpuvAoGAUmM8\ntUciw7ywFuG+PlpLZun4eSyEsSjYVVic6Enq0sejrCgNPMQQoJAgpYUBdmpL3wI0\nD4xKKKWXjt+LDvcZq/CANdqaPlXZ1geLml7ic06fBoqGs4YOnJjtV7qZFQESIrXk\njR4HCL8Y5yWWgAVTj8jgkIybByY3u4xGDYijNlUCgYALP9ZudXN8d6KlWlPsH9HV\nD6QiUdUsn+zvwL1VDi20OyNdJ7dw3BktMd58xtNOdNJ69j1aVqshQhwi6hinJlVz\npkG9UNQTQnHP4iwCaRsZnXWQJuT5N5/NLAEah19qcE9SUsTrAhqOmhRjSi6duWAH\nNNtvfc2PzGl7k8J5BZ0amQ==\n-----END PRIVATE KEY-----\n',
  clientEmail: 'process.env.CLIENT_EMAIL',
  clientId: 'process.env.CLIENT_ID',
  authUri: 'process.env.AUTH_URI',
  tokenUri: 'process.env.TOKEN_URI,',
  authProviderX509CertUrl: ' process.env.AUTH_PROVIDER',
  clientC509CertUrl: 'process.env.CLIENT_CERT',
  universe_domain: 'process.env.UNIVERSE_DOMAIN',
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
      .catch(() => {
        throw new InteractionException(ResponseCode.INTERACTION_SEND_FAIL);
      });
  }
}
