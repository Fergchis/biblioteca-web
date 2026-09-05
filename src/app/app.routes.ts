import { Routes } from '@angular/router';
import { Libros } from './libros/libros';
import { Prestamos } from './prestamos/prestamos';
import { Callback } from './callback/callback';
import { sesionGuard } from './auth/sesion.guard';

/**
 * Las rutas de la aplicación.
 *
 * 🔨 **Tramo 8.6 · lo que te falta acá.** Ninguna de estas rutas está
 *    protegida: cualquiera las abre sin haber hecho login. Hoy eso «funciona»
 *    porque el gateway responde 401 y la página lo muestra — pero la
 *    experiencia es mala: el usuario llega a una pantalla de error en vez de a
 *    una de login.
 *
 *    Cuando escribas `auth/sesion.guard.ts`, esto se convierte en:
 *
 *        import { sesionGuard } from './auth/sesion.guard';
 *
 *        { path: 'libros', component: Libros, canActivate: [sesionGuard] },
 *
 *    Y ojo con lo que un guard es y no es: **mejora la experiencia, no la
 *    seguridad.** El guard corre en el computador del usuario. Lo único que
 *    protege de verdad es el 401 y el 403 del tramo 7, que corren en tu
 *    servidor. Tramo 8.10.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
  { path: 'libros', component: Libros, canActivate: [sesionGuard] },
  { path: 'prestamos', component: Prestamos, canActivate: [sesionGuard]},
  { path: 'callback', component: Callback },
];
