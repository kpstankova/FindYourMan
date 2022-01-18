import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { StoreState } from '../../redux/root-reducer';
import { selectServiceItem } from '../../redux/service-details/service-details.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { User } from '../../redux/user/user.types';
import { ServiceItem } from '../services-page/my-services.types';
import './review.styles.scss';
import { AddReviewProps } from './service-details.types';
import { connect } from 'react-redux';

const AddReviewComponent: React.FC<AddReviewProps> = ({ ...props }) => {
    const { currentUser, serviceItem, getAllReviews } = props;
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const token = localStorage.getItem('accessToken');

    const handleChange = (event: any) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        return axios
            .post(`http://localhost:3001/service/review`, {
                service_id: serviceItem!.service_id,
                user_id: currentUser!.id,
                comment: comment,
                rating: rating,
                publish_date: new Date()
            }, { headers: { Authorization: 'Bearer ' + token }})
            .then((response: any) => {
                getAllReviews();
                setComment("");
                setRating(0);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    return (
        <div className="add-comment-box">
            <div className="add-comment-form">
                <TextField
                    id="standard-basic"
                    onChange={handleChange}
                    value={comment}
                    multiline
                    maxRows={10}
                    variant="standard"
                    label="Write your comment..."
                />
                <Rating ratingValue={rating} onClick={handleRating} />
                <button onClick={handleSubmit} className="post-comment">
                    Add review
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: StoreState): { serviceItem: ServiceItem | null, currentUser: User } => {
    return {
        serviceItem: selectServiceItem(state),
        currentUser: selectCurrentUser(state),
    }
}

export default connect(mapStateToProps, null)(AddReviewComponent);