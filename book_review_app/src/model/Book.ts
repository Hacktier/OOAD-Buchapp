export default class Book {
    public id: number;
    public title: string;
    public rating: number;

    constructor(title: string, rating: number) {
        this.id = 1;
        this.title = title;
        this.rating = rating;
    }

    get labelColor(): string {
        if (this.rating > 7) {
            return 'success';
        }

        if (this.rating < 4) {
            return 'danger'
        }

        return 'warning';
    }

    get showRoute() {
        return '/show/' + this.rating;
    }
}