interface BookInterface {
    id: string;
    title: string | null;
    rating: number | null;
    finished: boolean;
}

export {BookInterface};

export default class Book implements BookInterface {
    public id: string;
    public title: string | null;
    public rating: number | null;
    public finished: boolean;

    constructor(id: string, title: string | null, rating: number | null, finished: boolean) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.finished = finished;
    }

    get finishedReading(): string {
        if (this.finished) {
            return "finished";
        }

        return "unfinished"
    }

    get labelColor(): string {

        if (this.finished) {
            return 'success';
        }

        return 'primary';
    }

    get detailRoute() {
        return '/detail/' + this.id;
    }
}
