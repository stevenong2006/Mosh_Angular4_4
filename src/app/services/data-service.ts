import { BadInput } from '../common/bad-input';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: "root",
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url).pipe(
      map(res => JSON.parse(JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  create(resource: any) {
    
    // return throwError(() => new AppError(0) ); // simulating error scenarior

    return this.http.post(this.url, JSON.stringify(resource)).pipe(
        map(res => JSON.parse(JSON.stringify(res))),
        catchError(this.handleError)
    );
  }

  update(resource: any) {
    return this.http
      .put(this.url + "/" + resource.id, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  updateByPatch(resource: any) {
    return this.http
      .patch(this.url + "/" + resource.id, JSON.stringify({ isRead: true }))
      .pipe(catchError(this.handleError));
  }

  delete(id: any) {
    // return throwError(() => new AppError(0) ); // simulating error scenarior
    
    return this.http
      .delete(this.url + "/" + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: Response) {
    if (err.status === 404) {
      console.log("Handling error locally and rethrowing NotFoundError", err);
      return throwError(() => new NotFoundError(err));
    }

    if (err.status === 400) {
      console.log("Handling error locally and rethrowing BadRequestError", err);
      return throwError(() => new BadInput(err.json()));
    }

    console.log("Handling error locally and rethrowing AppError", err);
    return throwError(() => new AppError(err));
  }
}
