import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// ─────────────────────────────────────────────────────────────────────────────
// 🔨 TRAMO 8.3 · Acá va la configuración de Amplify, y va **antes** de
//    arrancar la aplicación. Si la pones después, el primer componente que
//    pregunte por la sesión lo va a hacer sobre un Amplify sin configurar.
//
//    Descomenta el bloque y reemplaza los cuatro valores por los de tu
//    `ficha.txt`. No hay ninguno nuevo: los cuatro los conseguiste en los
//    tramos 1 al 4.
//
//    Los tres detalles que cuestan tiempo si no los ves venir:
//
//      1. `domain` va **sin** `https://`. Es solo el host. Si le pones el
//         esquema, Amplify arma `https://https://` y el navegador no va a
//         ninguna parte.
//      2. `redirectSignIn` y `redirectSignOut` son **arreglos**, aunque tengas
//         una sola URL. Un string suelto no es lo que espera.
//      3. `scopes` lleva el scope **largo**: `biblioteca/libros.leer`, con el
//         prefijo del resource server. Sin el prefijo, Cognito responde
//         `invalid_scope`.
// ─────────────────────────────────────────────────────────────────────────────

import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId:       'us-east-1_2ainfnzar',
      userPoolClientId: 'ifg6i2bilchroql1l1ps6r346',
      loginWith: {
        oauth: {
          domain:          'us-east-12ainfnzar.auth.us-east-1.amazoncognito.com',
          scopes:          ['openid', 'profile', 'biblioteca/libros.leer'],
          redirectSignIn:  ['http://localhost:4200/callback'],
          redirectSignOut: ['http://localhost:4200'],
          responseType:    'code',
        },
      },
    },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// 🔨 Y esta línea, que es la que se olvida. Es lo que hace que Amplify
//    **escuche la vuelta del login** y canjee el código solo. Sin ella vuelves
//    de Cognito con un `?code=` en la barra de direcciones y no pasa
//    absolutamente nada — el síntoma que te describe `/callback`.
// ─────────────────────────────────────────────────────────────────────────────

import 'aws-amplify/auth/enable-oauth-listener';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
