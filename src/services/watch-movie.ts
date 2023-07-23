import { IMovie } from "./movie";

export interface IWatchMovie extends IMovie {
	runtime: number;
	imdbRating: number;
	userRating: number;
}
