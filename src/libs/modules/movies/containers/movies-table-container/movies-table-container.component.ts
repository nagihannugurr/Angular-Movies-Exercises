import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, of, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { IMovie } from '../../models/movie-models';
import { MoviesHttpService } from '../../services/movies-http.service';

@Component({
  selector: 'app-movies-table-container',
  templateUrl: './movies-table-container.component.html',
  styleUrls: ['./movies-table-container.component.scss']
})
export class MoviesTableContainerComponent implements OnInit, OnDestroy {

  movies: IMovie[];
  movies2 : IMovie[];
  subscriptions: Subscription = new Subscription();
  filterText = new FormControl("")

  constructor(private moviesHttpService: MoviesHttpService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.moviesHttpService.getTop100Movies().subscribe((movies) => {
      this.movies = movies;
      this.movies2 = movies;
      })
      
    )
   
    }

    ngAfterViewInit() {

      this.filterText.valueChanges.subscribe(value => {

        this.movies = this.movies2.filter(p => {

          return p.name.toLocaleLowerCase().indexOf(value)!==-1
         // return p.name.toLocaleLowerCase().match(value.toLocaleLowerCase());
        })
      })
    }
  

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  /*
    of([
        {
          "index": 16,
          "name": "The Matrix",
          "year": "1999",
          "rating": "8.6",
          "poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg"
        },
        {
          "index": 29,
          "name": "Interstellar",
          "year": "2014",
          "rating": "8.5",
          "poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg"
        },
        {
          "index": 34,
          "name": "The Lion King",
          "year": "1994",
          "rating": "8.5",
          "poster": "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_UY67_CR0,0,45,67_AL_.jpg"
        }
      ])*/ 

}
