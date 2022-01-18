import { User } from "../../redux/user/user.types";
import { ServiceItem } from "../services-page/my-services.types";

export interface ServiceDetailsPageProps {
    serviceItem?: ServiceItem;
    routeParams: any;
}

export interface ReviewsProps {
    serviceItem?: ServiceItem;
    reviews: Review[];
}

export interface Review {
    review_id: number;
    service_id: number;
    user_id: number;
    comment: string;
    rating: number;
    publish_date: string;
}

export interface SingleReviewProps {
    review: Review;
}

export interface AddReviewProps {
    currentUser?: User;
    serviceItem?: ServiceItem;
    getAllReviews: () => void;
}