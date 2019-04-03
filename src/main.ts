import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { webcomponentsReady } from '@codebakery/origami/polyfills';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

webcomponentsReady().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule) 
    .catch(err => console.log(err));
});

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
