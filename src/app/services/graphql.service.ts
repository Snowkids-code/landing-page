import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getRickAndMortyData(): Observable<any> {
    const GET_RICK_AND_MORTY_DATA = gql`
      query Query {
        characters(page: 2, filter: { name: "Rick" }) {
          info {
            count
          }
          results {
            name
          }
        }
        location(id: 1) {
          id
        }
        episodesByIds(ids: [1, 2]) {
          id
        }
      }
    `;

    return this.apollo
      .watchQuery<any>({
        query: GET_RICK_AND_MORTY_DATA,
      })
      .valueChanges.pipe(map((result) => result.data));
  }
}
