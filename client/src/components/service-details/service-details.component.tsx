import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Review, ServiceDetailsPageProps } from "./service-details.types";
import ServiceItemComponent from '../services-page/service-item.component';
import { ServiceItem } from "../services-page/my-services.types";
import { StoreState } from "../../redux/root-reducer";
import { selectServiceItem } from "../../redux/service-details/service-details.selectors";
import { connect } from 'react-redux';
import ReviewsComponent from './service-reviews.component';
import AddReviewComponent from "./add-review.component";
import { headers } from "../register/register-modal.types";

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({ ...props }) => {
    const { serviceItem, routeParams } = props;

    const [reviews, setReviews] = useState<Review[]>([])

    const getAllReviews = () => {
        return axios
            .post(`http://localhost:3001/service/allReviews`, {
                service_id: serviceItem!.service_id
            }, { headers: headers })
            .then((response: any) => {
                console.log(response.data);
                setReviews(response.data);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getAllReviews();
    }, []);

    return (
        <Box sx={{
            width: '1800px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            <ServiceItemComponent serviceItem={serviceItem!} isInDetails={true}/>
            <ReviewsComponent reviews={reviews}/>
            <AddReviewComponent getAllReviews={getAllReviews}/>
        </Box>
    )
};


const mapStateToProps = (state: StoreState): { serviceItem: ServiceItem | null} => {
    return {
        serviceItem: selectServiceItem(state)
    }
}

export default connect(mapStateToProps, null)(ServiceDetailsPage);
