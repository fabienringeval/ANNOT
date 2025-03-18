import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';

/**
 * Store
 */

// Reducers
import { reducers } from './app-store.reducer';

// Effects
import { effects } from './app-store.effects';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
})

export class AppStoreModule {}
