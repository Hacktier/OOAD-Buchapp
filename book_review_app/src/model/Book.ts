interface BookInterface {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    rating: number | null;
    finished: boolean;
}

export {BookInterface};

export default class Book implements BookInterface {
    public id: string;
    public title: string;
    public subtitle: string;
    public description: string;
    public rating: number | null;
    public finished: boolean;

    constructor(id: string, title: string, subtitle: string, description: string, rating: number | null, finished: boolean) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
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
