import {I18NEXT_SERVICE} from 'angular-i18next';
import {inject} from '@angular/core';
import LanguageDetector from 'i18next-browser-languagedetector';

export function i18nAppInit() {
  return function () {
    const config = {
      fallbackLng: 'en',
      debug: true,
      supportedLngs: ['en', 'pl'],
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
      },
      resources: {
        en: {
          translation: {
            userName: 'Username',
            synchronize: 'Synchronise',
            removeFromFavorites: 'Remove from favorites',
            addToFavorites: 'Add to favorites',
            goBackToList: 'Go back to list',
            search: 'Search',
            searchPlaceholder: 'eg. User',
            sortByName: 'Sort by name',
            nameColumn: 'Name',
            sortByRole: 'Sort by role',
            role: 'Role',
            sortByProtectedProjects: 'Sort by protected projects',
            protectedProjects: 'Protected projects',
            isUserFavorite: 'Is user Favorite',
            close: "close"
          }
        },
        pl: {
          translation: {
            userName: 'Nazwa użytkownika',
            synchronize: 'Synchronizuj',
            removeFromFavorites: 'Usuń z ulubionych',
            addToFavorites: 'Dodaj do ulubionych',
            goBackToList: 'Wróć do listy',
            search: 'Szukaj',
            searchPlaceholder: 'np. Użytkownik',
            sortByName: 'Sortuj po nazwie',
            nameColumn: 'Nazwa',
            sortByRole: 'Sortuj po roli',
            role: 'Rola',
            sortByProtectedProjects: 'Sortuj po chronionych projektach',
            protectedProjects: 'Chronione projekty',
            isUserFavorite: 'Czy użytkownik jest w ulubionych',
            close: "zamknij"
          }
        }
      }
    }


    const i18next = inject(I18NEXT_SERVICE);
    i18next.use(LanguageDetector);
    return i18next.init(config);
  }
}
