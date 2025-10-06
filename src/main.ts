import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter([]),
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.error(err));
