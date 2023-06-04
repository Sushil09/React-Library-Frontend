class ReviewModel {
    id: number;
    email : string;
    date: string;
    rating: number;
    bookId: number;
    reviewDescription: string;

    constructor( id: number,
        email : string,
        date: string,
        rating: number,
        bookId: number,
        reviewDescription: string){
            this.id=id;
            this.email=email;
            this.date=date;
            this.rating=rating;
            this.bookId=bookId;
            this.reviewDescription=reviewDescription;
        }

}

export default ReviewModel;