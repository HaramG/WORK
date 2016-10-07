import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FirebaseModule } from './firebase/firebase.module';
import { AngularFireModule } from 'angularfire2';

const config = {
    apiKey: "AIzaSyAjAL5_T2KG0UR73n7Mx--rXKg5XvlA-JM",
    authDomain: "see-me-1d3bf.firebaseapp.com",
    databaseURL: "https://see-me-1d3bf.firebaseio.com",
    storageBucket: "see-me-1d3bf.appspot.com"
};
const routes: Routes = [
  {}
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    FirebaseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
