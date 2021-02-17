interface BookInterface {
    id: string;
    title: string;
    author: string | null;
    subtitle: string | null;
    description: string;
    finished: boolean;
    rating: number | null;
    publishedDate: number;
    thumbnailUrl: string | null;
    pageCount: number;
    currentPage: number;
}

export {BookInterface};

export default class Book implements BookInterface {
    public id: string;
    public title: string;
    public author: string | null;
    public subtitle: string | null;
    public description: string;
    public finished: boolean;
    public rating: number | null;
    public publishedDate: number;
    public thumbnailUrl: string | null;
    public pageCount: number;
    public currentPage: number;

    constructor(
        id: string,
        title: string,
        author: string | null,
        subtitle: string | null,
        description: string,
        finished: boolean,
        rating: number | null,
        publishedDate: number,
        thumbnailUrl: string | null,
        pageCount: number,
        currentPage = 0) {
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
        this.currentPage = currentPage;
    }

    get finishedReading(): string {
        if (!this.pageCount) {
            return "unfinished";
        }

        if (this.finished || this.currentPage >= this.pageCount) {
            return "finished";
        }

        if (this.currentPage > 0) {
            return ((this.currentPage * 100) / this.pageCount).toFixed(0).toString().concat(" %");
        }

        return "unfinished"
    }

    get labelColor(): string {
        if (this.finished || (this.pageCount && this.currentPage >= this.pageCount)) {
            return 'success';
        }

        return 'primary';
    }

    get detailRoute(): string {
        return `/detail/${this.id}`;
    }
}