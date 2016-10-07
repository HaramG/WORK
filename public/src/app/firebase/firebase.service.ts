import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService {
    facebook = AuthProviders.Facebook;
    google = AuthProviders.Google;
    github = AuthProviders.Github;
    twitter = AuthProviders.Twitter;
    anonymous = AuthProviders.Anonymous;
    anonmethod = AuthMethods.Anonymous;
    redirectmethod = AuthMethods.Redirect

loggedIn = false;
anonymously = false;

    items: FirebaseListObservable<any>;
    login(pro) {
        if( pro === "google" ) {
            this.af.auth.login({
                provider:AuthProviders.Google,
                method:AuthMethods.Redirect
            })
        };
        if (pro === "facebook" ) {
            this.af.auth.login({
                provider:AuthProviders.Facebook,
                method:AuthMethods.Redirect
            })
        };
        if (pro === "twitter" ) {
            this.af.auth.login({
                provider:AuthProviders.Twitter,
                method:AuthMethods.Redirect
            })
        };
        if (pro === "github" ) {
            this.af.auth.login({
                provider:AuthProviders.Github,
                method:AuthMethods.Redirect
            })
        };
        if (pro === "anonymous" ) {
            this.af.auth.login({
                provider:AuthProviders.Anonymous,
                method:AuthMethods.Anonymous
            })
        };

    }
    logout() {
        this.af.auth.logout();
        this.loggedIn = false;
    }
here() {
    console.log("here")
}
    constructor(public af: AngularFire) {
        this.items = af.database.list('/items')
    }
}