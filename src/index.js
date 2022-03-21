const contadorPersonagens = document.querySelector("#personagens");
const contadorLuas = document.querySelector("#luas");
const contadorPlanetas = document.querySelector("#planetas");
const contadorNaves = document.querySelector("#naves");

const starWarsAPI = (param) => {
  return axios.get(`https://swapi.dev/api/${param}`);
};

const preencherCards = () => {
  Promise.all([
    starWarsAPI("people/"),
    starWarsAPI("vehicles/"),
    starWarsAPI("planets/"),
    starWarsAPI("starships/"),
  ]).then((response) => {
    contadorPersonagens.innerHTML = response[0].data.count;
    contadorLuas.innerHTML = response[1].data.count;
    contadorPlanetas.innerHTML = response[2].data.count;
    contadorNaves.innerHTML = response[3].data.count;
  });
};

preencherCards();
