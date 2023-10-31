import { Avatar, Box, Button, Container, Grid, Paper, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import React, { Fragment } from 'react'

const SideProfile = () => {
    const { palette: { primary } } = useTheme();

    return (
        <Fragment>
            <Container>
                <Grid container columnSpacing={2} rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <Paper sx={{ padding: "20px" }}></Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Paper elevation={0} sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: "10px", padding: "0px", borderRadius: '12px', overflow: "hidden", border: "1px solid grey" }}>
                            <Box sx={{
                                height: { xs: "450px", sm: "450px", md: "400px", lg: "400px", xl: "400px" },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                background: "url(https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: { xs: "100% 250px", sm: "100% 250px", md: "100% 200px", lg: "100% 200px", xl: "100% 200px" },
                                backgroundPosition: "top",
                                width: "100%",
                            }}>
                                <Box sx={{ width: "-webkit-fill-available", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: '20px' }} >
                                    <Avatar sx={{ width: "100px", height: "100px", border: '6px solid #FFFFFF' }}></Avatar>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '2px' }}>
                                        <Typography variant='h5' sx={{ textAlign: "center", fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", cursor: 'pointer', '&:hover': { color: primary?.main } }}>Prem Biswas</Typography>
                                        <Typography variant='caption1' sx={{ textAlign: "center", fontWeight: 400, fontSize: "14px", fontFamily: "Open Sans", lineHeight: "20px", }}>React & React Native Developer</Typography>
                                    </Box>
                                    <Button disableElevation={true} fullWidth size="small" variant='contained' color='primary'>Follow</Button>
                                </Box>
                            </Box>

                            <Box sx={{ padding: '0px 20px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: "10px", }}>
                                <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>An user more in this world!</Typography>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", textTransform: 'uppercase' }}>Pronouns</Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>He/Him</Typography>
                                </Box>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", textTransform: 'uppercase' }}>Current Address</Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>Managua, Nicaragua</Typography>
                                </Box>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", textTransform: 'uppercase' }}>EDUCATION</Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>Computer Engineering</Typography>
                                </Box>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", textTransform: 'uppercase' }}>Currently Working</Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>Technical Support at LAFISE</Typography>
                                </Box>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", textTransform: 'uppercase' }}>Skills</Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>React, React Native, Node, Express, MongooDB, JavaScript, TypeScript, Java, Angluar, Vite, Next</Typography>
                                </Box>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "24px", textTransform: 'uppercase' }}>JOINED At</Typography>
                                    <Typography variant='h6' sx={{ fontWeight: 500, fontFamily: "Open Sans", lineHeight: "22px", fontSize: "14px", }}>{moment(new Date()).format('ll')}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment >
    )
}

export default SideProfile