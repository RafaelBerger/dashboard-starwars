const contadorPersonagens = document.querySelector("#personagens");
const contadorLuas = document.querySelector("#luas");
const contadorPlanetas = document.querySelector("#planetas");
const contadorNaves = document.querySelector("#naves");

const apiGet = (param) => {
  axios.get(`https://swapi.dev/api/${param}`).then((resposta) => {
    return resposta.data.count;
  });
};

const preencherContadores = () => {
  contadorLuas.innerHTML = apiGet("vehicles/").count;
  contadorNaves.innerHTML = apiGet("starships/").count;
  contadorPlanetas.innerHTML = apiGet("planets/").count;
  contadorPersonagens.innerHTML = apiGet("people/").count;
};
