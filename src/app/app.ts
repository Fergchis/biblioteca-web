import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { signInWithRedirect, fetchAuthSession } from 'aws-amplify/auth';

type PrestamoConLibro = {
  id: number;
  desde: string;
  hasta: string;
  devuelto: boolean;
  libro: {
    id: number;
    titulo: string;
    autor: string;
  };
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected esBibliotecario = signal(false);

  private readonly http = inject(HttpClient);
  readonly panel = signal<PrestamoConLibro[]>([]);
  readonly cargando = signal(false);

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

  cargarPanel(): void {
    this.cargando.set(true);

    this.http
      .get<{ prestamos: PrestamoConLibro[] }>(
        'http://localhost:8080/v1/panel'
      )
      .subscribe({
        next: (r) => {
          this.panel.set(r.prestamos);
          this.cargando.set(false);
        },
        error: (e) => {
          console.error('el panel fallo:', e.status, e.error);
          this.cargando.set(false);
        },
      });
  }
}