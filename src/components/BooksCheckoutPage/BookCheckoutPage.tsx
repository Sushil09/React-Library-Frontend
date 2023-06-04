import { useEffect, useState } from "react";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { StarsReview } from "./StarsReview";
import BookModel from "../../model/BookModel";
import { LatestReviews } from "../utils/LatestReview";
import ReviewModel from "../../model/ReviewModel";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review Stae
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.image,
            };

            setBook(loadedBook);
            console.log(book);
            
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchReview = async () => {
            const baseUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded?.reviews;

           const reviewsLoaded: ReviewModel[] =  [];

           let weightedStarReviews:number = 0;

           for(const i in responseData){
            reviewsLoaded.push({
                id:responseData[i].id,
                email:responseData[i].userEmail,
                date:responseData[i].date,
                rating:responseData[i].rating,
                bookId:responseData[i].bookId,
                reviewDescription:responseData[i].reviewText
            });
            weightedStarReviews = weightedStarReviews + responseData[i].rating;
           }
           if(reviewsLoaded){
            const roundedReviews = ((Math.round(weightedStarReviews/reviewsLoaded.length)*2)/2).toFixed(1);
            setTotalStars(Number(roundedReviews));
           }

            setReviews(reviewsLoaded);
            
            setIsLoadingReview(false);
        };
        fetchReview().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, []);

   //Alow books to be loaded

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    //Alow Reviews to be loaded
  
    if (isLoadingReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                height='349' alt='Book' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                        </div>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                            height='349' alt='Book' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={true}/>
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    );
}