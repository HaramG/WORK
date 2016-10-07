import { Component, Inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthMethods, AuthProviders, FirebaseApp } from 'angularfire2';
import { Subject, Observable } from 'rxjs';

@Component({
    selector: 'firebase',
    templateUrl: 'firebase.html'
})
export class FirebaseComponent {
constructor(public af: AngularFire, @Inject(FirebaseApp) firebaseApp:any) {
    this.af.auth.subscribe(
        user => this.pow(user)
    )
    this.firebaseApp = firebaseApp;
    this.af = af
}
firebaseApp:any;
uid:any;
profile:any;
tolog:any;
profileMap:any = {
    'native': {
        'circles': {
            'live': false,
            'open': false,
            'tutorial': true
        },
        'creator': {
            'live': false,
            'open': false,
            'tutorial': true
        },
        'exchange': {
            'live': false,
            'open': false,
            'tutorial': true
        },
        'notifications': {
            'live': true,
            'open': false,
            'creator': {
                'newlove': 0,
                'newview': 0,
                'totalview': 0,
                'totallove': 0,
                'viewmultiplier': '0',
                'lovemultiplier': '0',
                'newlovemultiplier': '0',
                'newviewmultiplier': '0',
                'multipliers': {
                    '0': ' ',
                    '10': 'X',
                    '100': 'C',
                    '1000': 'K',
                    '1000000': 'M',
                    '1000000000': '$'
                },
                'topborders': 10,
                'allowedtypes': {
                    'article': true,
                    'video': true,
                    'widget': true,
                    'image': true,
                    'audio': true,
                    'app': true,
                    'skin': true,
                    'stream': true,
                    'collection': true,
                    'webpage': true,
                    'poll': true,
                    'file': true,
                    'memo': true
                },
                'borders': {}
            },
            'exchange': {

            },
            'circles': {
                'combase': {
                    'limitTo': 1
                },
                'poll': {
                    'limitTo': 1
                },
                'feed': {
                    'limitTo': 1
                },
                'collection': {
                    'limitTo': 1
                }

            }
        },
        'profile': {
            'live': true,
            'open': true,
            'stats': {
                'uses': 0,
                'seconds': 0,
                'age': 0,
                'displayname': 0,
                'flag': 0,
                'paypal': 0,
                'balance': 0,
                'picture': 0,
                'size': 'small',
                'language': 'English',
                'skin': 'default',
                'favoritecolor': 'white'
            },
            'openedThoughts': {},
            'groups': {

            }
        }
    }
}
over: boolean = false;
pow(u) {
      console.log(u);
      this.uid = u.auth.uid;
      console.log(this.uid);
      const profileMap = this.af.database.object('users/'+this.uid+'/profileMap',{ preserveSnapshot: true });
          profileMap.subscribe(snapshot => {
              if(snapshot.val() !== null){
                this.profileMap = snapshot.val();
                console.log(this.profileMap)
              }else{
                this.af.database.object('users/'+this.uid).set({'profileMap': this.profileMap });
                console.log("done");
                console.log(this.profileMap) 
              }
          })
}
files:any;
percent:any;
checkFiles(e) {
    console.log(e);
    this.files = e.srcElement.files;
    console.log(this.files)
}
choosePath(i) {
    console.log(i);
    const filename = this.files[i]['name'];
    this.files[i]['path'] = 'users/'+this.uid+'/files'+filename;
    console.log(this.files)
}
putFile(fil) {
    const user = this.af.database.object('/users/'+this.uid);
    user.update({'files': fil})
}

upload() {
    const putFile = this.putFile;
    for(let file of this.files){
        console.log(file['name']);
        const metadata = {
            'tame me nigga': 'shitttt',
            'contentType': 'test'
        };
        console.log(file['path']);
        const uploadTask = this.firebaseApp.storage().ref(file['path']).put(file, metadata);
        uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  this.percent = progress;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  var downloadURL = uploadTask.snapshot.downloadURL;
  console.log(downloadURL)
});
    }
}
lawd(v) {
    console.log(v)
}
fblogin() {
    this.af.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Redirect
    })
}
googleLogin() {
    this.af.auth.login({
        provider: AuthProviders.Google,
        method: AuthMethods.Redirect
    })
}
githubLogin() {
    this.af.auth.login({
        provider: AuthProviders.Github,
        method: AuthMethods.Redirect
    })
}
twitterLogin() {
    this.af.auth.login({
        provider: AuthProviders.Twitter,
        method: AuthMethods.Redirect
    })
}
anonymousLogin() {
    this.af.auth.login({
        provider: AuthProviders.Anonymous,
        method: AuthMethods.Anonymous
    });
    console.log("something")
}
logout() {
    this.af.auth.logout()
}
}