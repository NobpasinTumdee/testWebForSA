export interface PackageInterface {
    ID?: number;
    Package_name?: string;
    Price?: number;
    Duration?: number;
}

export interface MovieInterface {
    ID?: number;
    Movie_name?: string;
    Movie_poster?: string;
    Movie_information?: string;
    Movie_video?: string;
    Movie_length?: string;
}

export interface HistoryInterface {
    id?: number;
    date?: Date;
    UserID?: number;
    user_name?: string;
    MovieID?: number;
    movie_name?: string;
    poster?: string;
}
export interface PaymentsInterface {
    id?: number;
    Payment_method?: string;
    Payment_status?: string;
    DateP?: Date;
    //date?: Date;
    UserID?: number;
    username?: string;
    PackageID?: number;
    Package_name?: string;
}

export interface CollectionsInterface {
    ID?: number;
    id?: number; //keyprop from controler
    Collection_name?: string;
    //CollectionName?: string;
    UserID?: number;
    Username?: string;
}

export interface CollectionMovieInterface {
    ID?: number;
    id?: number;
    CollectionID?: number;
    collection_name?: string;
    MovieID?: number;
    movie_name?: string;
    MoviePoster?: string;
    Movie_information?: string;
    Movie_video?: string;
}