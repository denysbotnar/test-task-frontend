import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

export interface VideoInterface {
  id: string;
  name: string;
  url_240p: string;
  url_480p: string;
  url_1080p: string;
  url_4k: string;
}

const url = 'http://localhost:3030';

export class dataClass {

  list$(): Observable<Array<VideoInterface>> {
    return ajax.getJSON<{data: Array<VideoInterface>}>(`${url}/videos`)
      .pipe(
        map((result: {data: Array<VideoInterface>}) => {
          return result.data || [];
        }),
        catchError(error => of([]))
      );
  }

  one$(id: string): Observable<VideoInterface | null> {
    return ajax.getJSON<{data: VideoInterface}>(`${url}/videos/${id}`)
      .pipe(
        map((result: {data: VideoInterface}) => {
          return result.data || null;
        }),
        catchError(error => of(null))
      );
  }

  save$(name: string): Observable<VideoInterface> {
    return ajax.post(`${url}/videos`, {name}, { 'Content-Type': 'application/json' })
      .pipe(
        map((result: AjaxResponse) => {
          return result.response;
        }),
        catchError(error => of(error))
      );
  }
}