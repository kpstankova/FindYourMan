import { Box, Divider, IconButton, Input } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ServiceItem, useStyles } from './my-services.types';
import ServiceItemComponent from './service-item.component';
import './service-main-page.styles.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@material-ui/icons/Close';

const ServicesMainPage = () => {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const token = localStorage.getItem('accessToken');

    const classes = useStyles();

    const getAllServices = () => {
        return axios
            .get(`http://localhost:3001/service/`, {
                'headers': { 
                    Authorization: 'Bearer ' + token 
                }
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

    const handleChange = (event: any) => {
        event.preventDefault();
        const value = event.target.value;

        setSearchValue(value);
    }

    const onKeyPress = (event: any) => {
        if (event.keyCode === 13) {
            // search(event);
        }
    }

    return (
        <React.Fragment>
            <div className="search-bar-container">
                <Box sx={{
                    width: '818px',
                    backgroundColor: '#FFFFFF',
                    opacity: 1,
                    marginTop: '1%',
                    border: '1px solid #8ABEFF',
                    marginLeft: '2%',
                    height: "60px"
                }}>
                    <Input
                        sx={{
                            paddingTop: "5px",
                            width: '800px',
                        }}
                        value={searchValue}
                        classes={{ underline: classes.inputUnderline }}
                        placeholder="Search..."
                        onKeyDown={onKeyPress}
                        onChange={handleChange}
                        startAdornment={
                            searchValue === "" ?
                                <React.Fragment>
                                    <IconButton type="button" sx={{ p: '4px' }} aria-label="search" size="large">
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </React.Fragment>
                                : null
                        }
                        endAdornment={
                            searchValue !== "" ?
                                <React.Fragment>
                                    <IconButton type="reset" onClick={() => setSearchValue("")}
                                        sx={{ p: '10px' }} aria-label="reset" size="large">
                                        <CloseIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <IconButton type="submit"
                                        // onClick={search}
                                        sx={{ p: '10px' }} aria-label="search" size="large">
                                        <SearchIcon />
                                    </IconButton>
                                </React.Fragment>
                                :
                                null
                        }
                    />
                </Box>
            </div>
            <Box sx={{
                width: '1800px',
                backgroundColor: '#FFFFFF',
                opacity: 1,
                marginTop: '5%',
                border: '3px solid #F5F8FD',
                marginLeft: '5%'
            }}>
                {services && services.length > 0 ?
                    services.map((service: ServiceItem) => {
                        return <ServiceItemComponent serviceItem={service} isInDetails={false}/>
                    })
                    :
                    <div>Nothing to show</div>
                }
            </Box>

        </React.Fragment>
    )
};

export default ServicesMainPage;