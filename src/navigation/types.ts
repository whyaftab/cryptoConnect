/**
 * Routes
 */

export enum NavigationRoutes {
  // Authenticated
  home = 'home',

  // Public
  auth = 'auth',
}

/**
 * Routes's params
 * TODO: put the right parameters for each route
 */

export type RootStackParamList = {
  // Authenticated
  [NavigationRoutes.home]: undefined;

  // Public
  [NavigationRoutes.auth]: undefined;
};
