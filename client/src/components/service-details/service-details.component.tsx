import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ServiceDetailsPageProps } from "./service-details.types";
import ServiceItemComponent from '../services-page/service-item.component';
import { ServiceItem } from "../services-page/my-services.types";
import { StoreState } from "../../redux/root-reducer";
import { selectServiceItem } from "../../redux/service-details/service-details.selectors";
import { connect } from 'react-redux';
import ReviewsComponent from './service-reviews.component';

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({ ...props }) => {
    const { serviceItem, routeParams } = props;

    return (
        <Box sx={{
            width: '1500px',
            backgroundColor: '#FFFFFF',
            opacity: 1,
            margin: '2%',
            border: '3px solid #F5F8FD',
        }}>
            <ServiceItemComponent serviceItem={serviceItem!} isInDetails={true}/>
            <ReviewsComponent/>
        </Box>
    )
};


const mapStateToProps = (state: StoreState): { serviceItem: ServiceItem | null} => {
    return {
        serviceItem: selectServiceItem(state)
    }
}

export default connect(mapStateToProps, null)(ServiceDetailsPage);
