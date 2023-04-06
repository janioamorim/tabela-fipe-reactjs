import { IBrandCar } from "@/src/interfaces/interfaces.types";
import { carsService } from "@/src/services/cars.service";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  searchBox: {
    display: "flex",
    flexDirection: "column",
    width: '100%',
    justifyContent: "center",
    backgroundColor: '#ccedd9'
  },
  titleBox: {
    
    display: "flex",
    flexDirection: "column",   
    alignItems: "center",
    padding: theme.spacing(4),
  },
  title: {    
    fontWeight: 700,
  },
  price: {
    width: 180,
    margin: "15px 0 15px",
    padding: theme.spacing(1),
    backgroundColor: '#06b48f',
    borderRadius: 30,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 700,
  },
  subtitle: {    
    color: '#7a7979',
    fontWeight: 400,
    
  },
}));



interface ResultProps {}

const Result: React.FC<ResultProps> = ({}) => {
    const classes = useStyles();
    const { push } = useRouter();

    return (
    <Container className={classes.searchContainer}>
        <Box className={classes.searchBox}>
          <Box className={classes.titleBox}>
              <Typography variant="h5" className={classes.title}>Tabela Fipe: Preço Chevrolet Cruze 2019</Typography>
              <Typography variant="h6" className={classes.price}>
                R$ 91.610,00
              </Typography>
              <Typography variant="h6" className={classes.subtitle}>
                Este é o preço de compra do veículo
              </Typography>
          </Box>
        </Box>
    </Container>
    );
};

export default Result;