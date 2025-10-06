import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import {
  CreateCheckInResponse,
  DeleteCheckInResponse,
  UpdateCheckInResponse
} from '../../core/interfaces/check-in.interfaces';

export interface CheckIn {
  id?: string;
  name: string;
  date: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  private SCRIPT_URL = environment.SCRIPT_URL;

  constructor(private http: HttpClient) { }

  read(): Observable<CheckIn[]> {
    return this.http.get<CheckIn[]>(this.SCRIPT_URL);
  }

  create(checkIn: CheckIn): Observable<CreateCheckInResponse> {
    const url = `${this.SCRIPT_URL}?action=register`;

    return new Observable<CreateCheckInResponse>(observer => {
      fetch(url, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(checkIn),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  update(checkIn: CheckIn): Observable<UpdateCheckInResponse> {
    const url = `${this.SCRIPT_URL}?action=update`;

    return new Observable<UpdateCheckInResponse>(observer => {
      fetch(url, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(checkIn),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

  delete(id: string): Observable<DeleteCheckInResponse> {
    const url = `${this.SCRIPT_URL}?action=remove`;

    return new Observable<DeleteCheckInResponse>(observer => {
      fetch(url, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      })
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }
}
