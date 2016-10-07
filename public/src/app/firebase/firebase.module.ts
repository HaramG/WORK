import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirebaseComponent } from './firebase.component';

@NgModule({
    declarations: [FirebaseComponent],
    exports: [FirebaseComponent],
    imports: [CommonModule]
})
export class FirebaseModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FirebaseModule,
            providers: [  ]
        }
    } 
}