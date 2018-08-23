import { inject, TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MoviesService]
        });
    });

    it('should be created', inject([MoviesService], (service: MoviesService) => {
        expect(service).toBeTruthy();
    }));
});
