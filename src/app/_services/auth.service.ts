import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  supabase?: SupabaseClient;
  ROOT_URL: string = environment.BACK_END_URL;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _toastr: ToastrService,
    private _ngZone: NgZone
  ) {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {

        if (sessionStorage.getItem('isUserCreated') as string === null) {
          this.sendUserToDB();
          localStorage.setItem('isUserCreated', 'true');
          localStorage.setItem('ownerId', `${session.user.id}`);
          localStorage.setItem('ownerName', `${session.user.user_metadata['full_name']}`);
        }
        _ngZone.run(() => {
          this._router.navigate(['/main']);
        })
        //   // console.log(session);
        //   // localStorage.setItem('session', JSON.stringify(session?.user));
      }
    });
  }

  get isUserLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string;
    if (user === 'undefined')
      return false;
    return true;
  }

  signInWithGoogle() {
    this.supabase?.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // This ensures the redirect happens within your app
      }
    });
  }

  async signUpWithEmailPassword(email: string, password: any, name: string) {
    this.supabase?.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          full_name: name
        }
      }
    })
      .then((res) => {
        if (res.error) {
          this._toastr.error(res.error.message, "Error");
        }
      })
      .catch(err => {
        this._toastr.error(err, "Error");
      });
  }

  async signInWithEmailPassword(email: string, password: any) {
    this.supabase?.auth.signInWithPassword({
      email: email,
      password: password
    })
      .then((res) => {
        if (res.error) {
          this._toastr.error(res.error.message, "Error");
        } else if (res.data) {
          this._toastr.success("You're signed in successfully", "Success");
        }
      })
      .catch(err => {
        this._toastr.error(err, "Error");
      });
  }

  async singOut() {
    await this.supabase?.auth.signOut();
    sessionStorage.removeItem('isUserCreated');
    sessionStorage.removeItem('ownerId');
    sessionStorage.removeItem('ownerName');
    this._router.navigate(['login']);
  }

  async sendUserToDB() {
    const { data: { user } }: any = await this.supabase?.auth.getUser();

    if (!!user) {
      const name = user.user_metadata.name || user.user_metadata.full_name;
      this.callCreateUserFunc(name, user.id, user.email);
    }
  }

  callCreateUserFunc(name: string, id: string, email: string) {
    this.createUserToDB(id, name, email).subscribe((res: any) => {
      if (res.msg !== "User already exist") {
        this._toastr.success("Your account has been created.", "Sign up successfull")
      }
    });
  }

  createUserToDB(supabaseID: string, name: string, email: string) {
    const data = {
      supabaseId: supabaseID,
      name: name,
      email: email
    }
    return this._http.post(`${this.ROOT_URL}/auth/add-user`, data);
  }

  getUserID() {
    return localStorage.getItem('ownerId') as string;
  }

  getUserName() {
    return localStorage.getItem('ownerName') as string;
  }
}
