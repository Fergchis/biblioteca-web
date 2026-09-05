import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { signInWithRedirect, fetchAuthSession } from 'aws-amplify/auth';

/**
 * El cascarón: la barra de navegación y el hueco donde el router pone la
 * página. No sabe nada de autenticación, y en el tramo 8 va a saber lo
 * mínimo.
 *
 * 🔨 **Tramo 8.8 y 8.10 · lo que te falta acá.** Cuando tengas sesión, este
 *    componente es el que lee `cognito:groups` y decide qué mostrar:
 *
 *        const { tokens } = await fetchAuthSession();
 *        const grupos = (tokens?.accessToken?.payload['cognito:groups'] ?? []) as string[];
 *        this.esBibliotecario.set(grupos.includes('bibliotecarios'));
 *
 *    Y con eso escondes el enlace de Préstamos al que no es bibliotecario.
 *
 *    **Hazlo** —al lector no le sirve ver una pantalla que no va a poder
 *    usar— pero que quede claro qué acabas de hacer: mejoraste la
 *    experiencia, **no la seguridad**. Cualquiera abre las herramientas del
 *    navegador y vuelve a mostrar ese enlace en dos segundos, porque ese
 *    código corre en **su** computador. Lo único que protege de verdad es el
 *    403 del tramo 7.4.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  protected esBibliotecario = signal(false);

  constructor() {
    this.cargarRol();
  }

  protected async entrar() {
    await signInWithRedirect();
  }

  private async cargarRol() {
    const { tokens } = await fetchAuthSession();

    const grupos =
      (tokens?.accessToken?.payload['cognito:groups'] ?? []) as string[];

    this.esBibliotecario.set(
      grupos.includes('bibliotecarios')
    );
  }
}
