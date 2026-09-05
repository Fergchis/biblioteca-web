import { CanActivateFn } from '@angular/router';
import { fetchAuthSession, signInWithRedirect } from 'aws-amplify/auth';

export const sesionGuard: CanActivateFn = async () => {
  const { tokens } = await fetchAuthSession();
  if (tokens?.accessToken) return true;

  await signInWithRedirect();   // no hay sesión: al login
  return false;
};