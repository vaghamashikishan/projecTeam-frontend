import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  supabase?: SupabaseClient;

  constructor(private _router: Router) {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Event: ${event}`);
      console.log(session);

      localStorage.setItem('session', JSON.stringify(session?.user));
    });
  }

  get isUserLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string;
    if (user === 'undefined')
      return false;
    return true;
  }

  async signInWithGoogle() {
    await this.supabase?.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  async signUpWithEmailPassword(email: string, password: any) {
    await this.supabase?.auth.signUp({
      email: email,
      password: password
    })
  }

  async signInWithEmailPassword(email: string, password: any) {
    await this.supabase?.auth.signInWithPassword({
      email: email,
      password: password
    })
  }

  async singOut() {
    await this.supabase?.auth.signOut();
  }

  async getUserInfo() {
    const { data: { user } }: any = await this.supabase?.auth.getUser();
    console.log(user);
    return { data: { user } };
  }
}
