// import { Injectable } from '@nestjs/common';
// import * as firebase from 'firebase-admin';
// import * as path from 'path';
//
// firebase.initializeApp({
//   credential: firebase.credential.cert(
//     path.join(__dirname, '..', '..', 'firebase-adminsdk.json'),
//   ),
// });
//
// @Injectable()
// export class FirebaseCloudMessagingHandler {
//   acceptPushNotification = async (
//     user: any,
//     notification_dto: NotificationDto,
//   ): Promise<NotificationToken> => {};
//
//   disablePushNotification = async (
//     user: any,
//     update_dto: UpdateNotificationDto,
//   ): Promise<void> => {};
//
//   getNotifications = async (): Promise<any> => {};
//
//   sendPush = async (
//     user: any,
//     title: string,
//     body: string,
//   ): Promise<void> => {};
// }
