import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { GraphqlService } from './graphql.service';

describe('GraphqlService', () => {
  let service: GraphqlService;
  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    // Create a mock apollo client
    const apolloMock = jasmine.createSpyObj('Apollo', ['watchQuery']);

    TestBed.configureTestingModule({
      providers: [GraphqlService, { provide: Apollo, useValue: apolloMock }],
    });
    service = TestBed.inject(GraphqlService);
    apolloSpy = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Rick and Morty data', (done) => {
    const mockResponse = {
      data: {
        characters: {
          info: { count: 107 },
          results: [{ name: 'Pickle Rick' }, { name: 'Rick Sanchez' }],
        },
        location: { id: '1' },
        episodesByIds: [{ id: '1' }, { id: '2' }],
      },
    };

    // Mock the Apollo watchQuery response
    apolloSpy.watchQuery.and.returnValue({
      valueChanges: of(mockResponse),
    } as any);

    service.getRickAndMortyData().subscribe((result) => {
      expect(result.characters.info.count).toBe(107);
      expect(result.characters.results.length).toBe(20);
      expect(result.location.id).toBe('1');
      expect(result.episodesByIds[0].id).toBe('1');
      done();
    });
  });
});
