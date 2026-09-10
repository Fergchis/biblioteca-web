import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';
import 'aws-amplify/auth/enable-oauth-listener';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_2ainfnzar',
      userPoolClientId: 'ifg6i2bilchroql1l1ps6r346',
      loginWith: {
        oauth: {
          domain: 'us-east-12ainfnzar.auth.us-east-1.amazoncognito.com',
          scopes: ['openid', 'profile', 'biblioteca/libros.leer'],
          redirectSignIn: ['http://localhost:4200/callback'],
          redirectSignOut: ['http://localhost:4200'],
          responseType: 'code',
        },
      },
    },
  },
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));