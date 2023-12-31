export interface Film {
    id?: string;
    _id?: string;
    nome?: string;
    formato?: string;
    categoria?: string[];
    linguaAudio?: string[];
    linguaSottotitoli?: string[];
    anno?: number;
    trama?: string;
    locandina?: string;
    dataCreazione?: string;
}

export interface FilteredFilmBodyRequest {
    categorieFilm: string[];
    formatoFilm: string;
    annoFilm: number;
    nomeFilm: string;
}