import {ApplicationConfig, isDevMode, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideStore} from '@ngrx/store'
import {userReducer} from './store/store.reducer';
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {i18nAppInit} from '../i18next.config';
import {provideI18Next, StrictErrorHandlingStrategy, withCustomErrorHandlingStrategy} from 'angular-i18next';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({user: userReducer}),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideAppInitializer(i18nAppInit()),
    provideI18Next(
      withCustomErrorHandlingStrategy(StrictErrorHandlingStrategy)
    )
  ]
};
