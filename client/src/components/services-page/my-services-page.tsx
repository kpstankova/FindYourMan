import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../redux/root-reducer';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { User } from '../../redux/user/user.types';
import { MyServicesPageProps, ServiceItem } from './my-services.types';
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "redux";
import { Box } from '@mui/material';
import ServiceItemComponent from './service-item.component';
import axios from 'axios';
import { headers } from '../register/register-modal.types';
import './service-main-page.styles.scss';

const MyServicesPage: React.FC<MyServicesPageProps> = ({ ...props }) => {
    const { currentUser, redirectToAddService } = props;
    const [services, setServices] = useState<ServiceItem[]>([]);

    const getAllServices = () => {
        return axios
            .post(`http://localhost:3001/service/getByUser`, {
                
                    contributor_id: currentUser.id
                }, {headers: headers
            })
            .then((response: any) => {
                console.log(response.data)
                setServices(response.data);
            })
            .catch((error: any) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getAllServices();
    }, []);

    return (
        <React.Fragment>
            {currentUser && currentUser.role !== 'client' ?
                <Button variant='contained' size='medium' onClick={() => redirectToAddService()}>Add service</Button>
                : null
            }

            <Box sx={{
                width: '1300px',
                backgroundColor: '#FFFFFF',
                opacity: 1,
                marginTop: '5%',
                border: '3px solid #F5F8FD',
            }}>
                <h1 className='title'>My services</h1>
                {services && services.length > 0 ?
                    services.map((service: ServiceItem) => {
                        return <ServiceItemComponent serviceItem={service} />
                    })
                    :
                    <div>Nothing to show</div>
                }
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state: StoreState): { currentUser: User } => {
    return {
        currentUser: selectCurrentUser(state),
    }
};

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToAddService: () => dispatch(push('/add-new-service')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyServicesPage);