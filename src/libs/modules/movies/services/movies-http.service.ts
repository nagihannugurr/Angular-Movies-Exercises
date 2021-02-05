import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, pluck, take } from 'rxjs/operators';
import { IMovie } from '../models/movie-models';
import { Observable } from 'rxjs';
import { MoviesTableContainerComponent } from '../containers/movies-table-container/movies-table-container.component';







@Injectable({
  providedIn: 'root'
})
export class MoviesHttpService {

  constructor(private http: HttpClient) { }

  getTop100Movies() {
    // TODO:
    // There are 250 movies in the dataset (top250movies.json)
    // This method should return an Observable that emits the first 100 movies (indexes from 1 to 100)
   let data =  this.http.get<any>('/assets/top250movies.json').pipe(
    
     map(arr => arr.slice(0,100))
    //return arr.filter(movie=> return movie.indx <=100)
   )

   return data;
  }
}
