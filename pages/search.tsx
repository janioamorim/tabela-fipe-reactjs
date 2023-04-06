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
import { purple } from '@material-ui/core/colors';

import { redirect, useRouter } from 'next/navigation';

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
    maxWidth: "550px",
    justifyContent: "center",
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",   
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  formControl: {
    width: "100%",
    minWidth: 120,
    marginBottom: 20
  },
  cardSelect: {
    width: '550px',   
    padding: 20,
    overflow: "unset",
    height: "35vh",
    maxHeight: 315
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center"
  },
  buttonSearch: {
    padding: theme.spacing(1),
    width: '40%'
  },
  title: {
    fontWeight: 700,
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[800],
    '&:hover': {
      backgroundColor: purple[900],
    },
  },
}))(Button);

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
    const classes = useStyles();
    const [brandCars, setBrandsCars] = useState<IBrandCar[]>();
    const [carrosModelos, setCarrosModelos] = useState([]);
    const [carrossAnos, setCarrosAnos] = useState([]);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [brandCarSelected, setBrandCarSelected] = useState<IBrandCar>({
      codigo: "",
      nome: "",
    });
    const [modelSelected, setModelSelected] = useState<IBrandCar>({
      codigo: "",
      nome: "",
    });
    const [anoSelecionado, setAnoSelecionado] = useState<IBrandCar>({
      codigo: "",
      nome: "",
    });
    const { push } = useRouter();
    //possibilidade de usar useMemo ou useCallback
    const getBrandsCars = async () => {
    const resultBands = await carsService.getBrandsCars();    

    setBrandsCars(resultBands.data);
    };

    const handleChangeBrand = (event: React.ChangeEvent<{ value: unknown }>) => {
      setBrandCarSelected({ ...brandCarSelected, codigo: event.target.value });
      setModelSelected({codigo: "", nome: ""})
      getCarsByBrand(event.target.value);
    };

    const handleChangeCar = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAnoSelecionado({codigo: "", nome: ""})
      setModelSelected({ ...modelSelected, codigo: event.target.value });
    };

    const handleChangeAno = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAnoSelecionado({ ...anoSelecionado, codigo: event.target.value });
    };

    const getCarsByBrand = async (codigo: any) => {
      const resultCars = await carsService.getCarsByBrand(codigo);
      setCarrosModelos(resultCars.modelos);
      setCarrosAnos(resultCars.anos);
    };

    const buscaPrecoTabela = async () => {
      let bodyPayload = {
        codigoMarca: brandCarSelected.codigo,
        codigoModelo: modelSelected.codigo,
        ano: anoSelecionado.codigo
      }
      try{
        const resultadoTabela = await carsService.buscaPrecoTabela(bodyPayload);
        console.log("resultadoTabela", resultadoTabela);
        setResultadoPesquisa(resultadoTabela);        
      }catch(err){
        console.log("err", err);

      }     


    };
    const showPageResult = () => {     
      push('/test')
    };

    useEffect(() => {
      getBrandsCars();
    }, []);

    const virifyStatus = () =>{
      
    }

    useEffect(() => {      
      if(brandCarSelected.codigo >= 1 && modelSelected.codigo >= 1 && anoSelecionado.codigo !== '' ){
        console.log("entrou");        
        setButtonStatus(false);
      }else{
        setButtonStatus(true);

      }
    }, [brandCarSelected.codigo, anoSelecionado.codigo,  modelSelected.codigo]);

    return (
    <Container className={classes.searchContainer}>
        <Box className={classes.searchBox}>
          <Box className={classes.titleBox}>
              <Typography variant="h5" className={classes.title}>Tabela Fipe</Typography>
              <Typography variant="h6">
                Consulte o valor de um veículo de forma gratuita
              </Typography>
          </Box>
          <Card className={classes.cardSelect}>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                  Marca
              </InputLabel>
              <Select
                  value={brandCarSelected.codigo}
                  label="marca"
                  name="marca"
                  onChange={handleChangeBrand}>
                  {brandCars?.map((brand: IBrandCar, index: number) => (
                  <MenuItem key={index} value={brand.codigo}>
                      {brand.nome}
                  </MenuItem>
                  ))}
              </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                    Modelo
                </InputLabel>
                <Select
                    value={modelSelected.codigo}
                    label="modelo"
                    name="modelo"
                    onChange={handleChangeCar}>                
                    {carrosModelos?.map((model: any, index: number) => (
                    <MenuItem key={index} value={model.codigo}>
                        {model.nome}
                    </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                    Ano
                </InputLabel>
                <Select
                    value={anoSelecionado.codigo}
                    label="Ano"
                    name="ano"
                    onChange={handleChangeAno}>                
                    {carrossAnos?.map((ano: any, index: number) => (
                    <MenuItem key={index} value={ano.codigo}>
                        {ano.nome}
                    </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Box className={classes.buttonBox}>
                <ColorButton 
                  variant="contained" 
                  color="primary" 
                  className={classes.buttonSearch}
                  disabled={buttonStatus}
                  onClick={buscaPrecoTabela}>
                  Consultar preço
                </ColorButton>               
              </Box>
          </Card>
        </Box>
    </Container>
    );
    };

export default Search;
