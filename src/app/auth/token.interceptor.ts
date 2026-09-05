import { HttpInterceptorFn } from '@angular/common/http';
import { fetchAuthSession } from 'aws-amplify/auth';
import { from, switchMap } from 'rxjs';

// Lista blanca: a quién se le manda el token. Nada más.
const PERMITIDOS = ['http://localhost:8080'];   // solo tu gateway

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (!PERMITIDOS.some((base) => req.url.startsWith(base))) {
    return next(req);
  }

  return from(fetchAuthSession()).pipe(
    switchMap(({ tokens }) => {
      const jwt = tokens?.accessToken?.toString();
      return next(
        jwt ? req.clone({ setHeaders: { Authorization: `Bearer ${jwt}` } }) : req,
      );
    }),
  );
};