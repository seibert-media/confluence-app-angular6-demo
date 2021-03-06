import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {} from 'ajs-type';

if (environment.production) {
  enableProdMode();
}
AJS.toInit(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
