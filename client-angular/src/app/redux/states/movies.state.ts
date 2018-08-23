import { AllModel } from '../../movies/models/all.model';
import { BaseModel } from '../../movies/models/base.model';
import { DetailsModel } from '../../movies/models/details.model';

export interface MoviesState {
    allGet: {
        errors: {},
        data: {
            movies: AllModel,
            movieDetails: DetailsModel
        },
        message: string,
        success: boolean,
    };
    createPost: {
        errors: {},
        data: BaseModel,
        message: string,
        success: boolean,
    };
    deleteGet: {
        errors: {},
        data: BaseModel,
        message: string,
        success: boolean,
    };
    deletePost: {
        errors: {},
        data: BaseModel,
        message: string,
        success: boolean,
    };
    detailsGet: {
        errors: {},
        data: {
            movies: AllModel,
            movieDetails: DetailsModel
        },
        message: string,
        success: boolean,
    };
    editGet: {
        errors: {},
        data: BaseModel,
        message: string,
        success: boolean,
    };
    editPost: {
        errors: {},
        data: BaseModel,
        message: string,
        success: boolean,
    };
}
