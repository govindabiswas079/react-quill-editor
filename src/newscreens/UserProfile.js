import { PersonPinCircleRounded, AddPhotoAlternateRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Container, IconButton, Paper, Typography } from '@mui/material'
import React, { Fragment } from 'react'

const UserProfile = () => {
    return (
        <Fragment>
            <Container >
                <Box sx={{
                    height: "350px",
                    display: "flex",
                    borderRadius: '12px',
                    flexDirection: "column",
                    alignItems: "center",
                    background: "url(https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg)",
                    backgroundRepeat: "no-repeat",
                    // backgroundSize: "cover",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    width: "100%",
                }}>
                    {/* <IconButton sx={{ position: "absolute", top: 10, right: 65, backgroundColor:"#FFFFFF", borderRadius:"12px" }}>
                        <AddPhotoAlternateRounded />
                    </IconButton> */}
                </Box>

                <Box sx={{ position: "relative", top: -175, }}>
                    <Container /* maxWidth={"md"} */ sx={{ minWidth: '200px' }}>
                        <Paper sx={{ display: "flex", backgroundColor: "#FFFFFF", borderRadius: '12px', flexDirection: "column", alignItems: "center", width: "100%", }}>
                            <Box sx={{ padding: "20px", width: "-webkit-fill-available", display: "flex", flexDirection: "column", alignItems: "center", }} >
                                <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", position: 'relative', top: -76 }}>
                                    <Box sx={{ width: "100px", height: "100px", border: '6px solid #000000', borderRadius: "50%", borderRightColor: "transparent", borderTopColor: "transparent", transform: "rotate(-45deg)" }}>
                                        <Avatar sx={{ width: "100%", height: "100%", transform: "rotate(45deg)" }}></Avatar>
                                    </Box>
                                    <Button disableElevation={true} size="small" variant='contained' color='primary'>Follow</Button>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '10px' }}>
                                    <Typography variant='h5' sx={{ textAlign: "center", fontWeight: 700, fontSize: "24px", fontFamily: "Open Sans", lineHeight: "24px", color: '#090909' }}>Prem Biswas</Typography>
                                    <Typography variant='caption1' sx={{ textAlign: "center", fontWeight: 500, fontSize: "16px", fontFamily: "Open Sans", lineHeight: "20px", lineBreak: 'anywhere' }}>React & React Native Developer</Typography>
                                </Box>
                            </Box>
                        </Paper>
                        <Typography>sdfghj</Typography>
                    </Container>
                    <Typography>sdfghj</Typography>
                </Box>
            </Container>
        </Fragment>
    )
}

export default UserProfile