interface BookInterface {
    id: string;
    title: string;
    author: string;
    subtitle: string | null;
    description: string;
    finished: bigint | boolean;
    rating: number | null;

    publishedDate?: string;
    thumbnailUrl?: string;
    pageCount?: bigint;

}

export {BookInterface};

export default class Book implements BookInterface {
    public id: string;
    public title: string;
    public author: string;
    public subtitle: string | null;
    public description: string;
    public finished: bigint | boolean;
    public rating: number | null;

    public publishedDate?: string;
    public thumbnailUrl?: string;
    public pageCount?: bigint;

    constructor(id: string, title: string, author: string, subtitle: string | null, description: string, finished: bigint | boolean, rating: number | null,  publishedDate?: string, thumbnailUrl?: string, pageCount?: bigint) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.subtitle = subtitle;
        this.description = description;
        this.finished = finished;
        this.rating = rating;

        this.publishedDate = publishedDate;
        this.thumbnailUrl = thumbnailUrl;
        this.pageCount = pageCount;

    }

    get finishedReading(): string {
        if (this.finished==this.pageCount) {
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
