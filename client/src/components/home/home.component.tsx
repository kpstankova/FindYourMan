import React, { useEffect, useState } from 'react';
import backgroundImage from '../../assets/home.png';
import { Button } from '@mui/material'
import './home.styles.scss';
import { useHistory } from 'react-router-dom';
import { HomeComponentProps } from './home.types';
import { push, CallHistoryMethodAction } from "connected-react-router";
import { Dispatch } from "redux";
import { connect } from 'react-redux';

const HomeComponent: React.FC<HomeComponentProps> = ({ ...props }) => {
    const { redirectToLearnMore } = props;
    const headingMessage = "Find the perfect man for anything!";
    const contexMessage = "With our site you can find yourself a person to fix your, or someone to built your home, or anyone you need!";
    const learnMoreText = "The company FINDYOURMAN was made in 2021 year due to the Covid-19 crashes. All happen when Ralitsa Apostolova and Daniel Radev got the amazing idea to build a platform where you can find yourself someone to help who can repair your problem. They got the idea because they needed someone to come and fix their sink but it was hopeless. That`s how everything happened."

    const [openLearnMore, setOpenLearnMore] = useState<boolean>(false);

    const history = useHistory();

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP') {
                setOpenLearnMore(false);
            }
        })
    }, [])

    const handleLearnMore = () => {
        setOpenLearnMore(true);
        redirectToLearnMore();
    }

    return (
        <React.Fragment>
            <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="home-info-container">
                    {
                        openLearnMore ?
                            <div className="home-learn-more-message">{learnMoreText}</div>
                            :
                            <React.Fragment>
                                <div className="home-heading-message">{headingMessage}</div>
                                <div className="home-contex-message">{contexMessage}</div>

                                <div className="home-button-container">
                                    <Button size='large' variant='contained' className='learn-more-button' style={{ borderRadius: 50 }} onClick={handleLearnMore} >Learn more</Button>
                                    <Button style={{ borderRadius: 50 }} className='contact-us-button' >Contact us</Button>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<CallHistoryMethodAction>) => {
    return {
        redirectToLearnMore: () => dispatch(push('/learn-more')),
    }
}

export default connect(null, mapDispatchToProps)(HomeComponent);