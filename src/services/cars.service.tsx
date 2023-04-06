import Api from './api';

export const getCarsByBrand = async (codigo:string) => {
  try {
    const cars = await Api.get(`/carros/marcas/${codigo}/modelos`);
    return cars.data;
  } catch (err) {
    throw err;
  }
};

export const getBrandsCars = async () => {
  try {
    const brands = await Api.get(`/carros/marcas`);
    return brands;
  } catch (err) {
    throw err;
  }
};

export const buscaPrecoTabela = async (bodyPayload: any ) => {
  try {
    const tabelaPreco = await Api.get(`/carros/marcas/${bodyPayload.codigoMarca}/modelos/${bodyPayload.codigoModelo}/anos/${bodyPayload.ano}`);
    return tabelaPreco.data;
  } catch (err) {
    throw err;
  }
};




export const carsService = { 
  getBrandsCars,
  getCarsByBrand,
  buscaPrecoTabela
};
