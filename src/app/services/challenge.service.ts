import { Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { type HttpClient } from '@angular/common/http'
// import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ChallengeService {
  constructor (private readonly http: HttpClient) {}

  getChallengeById (id: string): Observable<Object> {
    // -----TO CHANGE----

    /*        return this.http.get(`${environment.BACKEND_BASE_URL}${environment.BACKEND_ALL_CHALLENGES}`,
                    {
                        headers: {
                            'Content-Type': 'application/dummy'
                        }
                    }); */

    return this.http.get('../assets/dummy/challenge.json',
      {
        headers: {
          'Content-Type': 'application/dummy'
        }
      })
  }
}
