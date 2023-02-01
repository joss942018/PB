import logo from "../images/logo-h.svg";
import Header from "./headerAdmin";
import {Link} from "react-router-dom";
import React from "react";
import TextField from "@mui/material/TextField";
import Chart from './Chart';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import Container from '@mui/material/Container';

function dashboard() {
    return (
        <div>
            <Header />
            <div className="container mt-5 pt-3">
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Deposits />
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default dashboard;