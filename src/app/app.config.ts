import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './auth/token.interceptor';
import { routes } from './app.routes';

/**
 * La configuración de la aplicación: qué servicios existen y cómo se arman.
 *
 * 🔨 **Tramo 8.7 · lo que te falta acá.** El `provideHttpClient()` de abajo
 *    está desnudo: manda las peticiones tal cual, sin token. Cuando escribas
 *    `auth/token.interceptor.ts`, esta línea pasa a ser:
 *
 *        import { withInterceptors } from '@angular/common/http';
 *        import { tokenInterceptor } from './auth/token.interceptor';
 *
 *        provideHttpClient(withInterceptors([tokenInterceptor])),
 *
 *    Un interceptor se registra **una vez**, acá, y aplica a todas las
 *    peticiones. Por eso `biblioteca.ts` no tiene un solo `Authorization`
 *    adentro.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
