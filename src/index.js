const contadorPersonagens = document.querySelector("#personagens");
const contadorLuas = document.querySelector("#luas");
const contadorPlanetas = document.querySelector("#planetas");
const contadorNaves = document.querySelector("#naves");

const titulo0 = document.getElementById("title-0");
const titulo1 = document.getElementById("title-1");
const titulo2 = document.getElementById("title-2");
const titulo3 = document.getElementById("title-3");
const titulo4 = document.getElementById("title-4");
const titulo5 = document.getElementById("title-5");

const estreia0 = document.getElementById("release-0");
const estreia1 = document.getElementById("release-1");
const estreia2 = document.getElementById("release-2");
const estreia3 = document.getElementById("release-3");
const estreia4 = document.getElementById("release-4");
const estreia5 = document.getElementById("release-5");

const diretor0 = document.getElementById("director-0");
const diretor1 = document.getElementById("director-1");
const diretor2 = document.getElementById("director-2");
const diretor3 = document.getElementById("director-3");
const diretor4 = document.getElementById("director-4");
const diretor5 = document.getElementById("director-5");

const episodio0 = document.getElementById("episode-0");
const episodio1 = document.getElementById("episode-1");
const episodio2 = document.getElementById("episode-2");
const episodio3 = document.getElementById("episode-3");
const episodio4 = document.getElementById("episode-4");
const episodio5 = document.getElementById("episode-5");

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
    contadorPersonagens.textContent = response[0].data.count;
    contadorLuas.textContent = response[1].data.count;
    contadorPlanetas.textContent = response[2].data.count;
    contadorNaves.textContent = response[3].data.count;
  });
};

const preencherTabela = () => {
  starWarsAPI("films").then((resposta) => {
    titulo0.textContent = resposta.data.results[0].title;
    titulo1.textContent = resposta.data.results[1].title;
    titulo2.textContent = resposta.data.results[2].title;
    titulo3.textContent = resposta.data.results[3].title;
    titulo4.textContent = resposta.data.results[4].title;
    titulo5.textContent = resposta.data.results[5].title;

    estreia0.textContent = resposta.data.results[0].release_date;
    estreia1.textContent = resposta.data.results[1].release_date;
    estreia2.textContent = resposta.data.results[2].release_date;
    estreia3.textContent = resposta.data.results[3].release_date;
    estreia4.textContent = resposta.data.results[4].release_date;
    estreia5.textContent = resposta.data.results[5].release_date;

    diretor0.textContent = resposta.data.results[0].director;
    diretor1.textContent = resposta.data.results[1].director;
    diretor2.textContent = resposta.data.results[2].director;
    diretor3.textContent = resposta.data.results[3].director;
    diretor4.textContent = resposta.data.results[4].director;
    diretor5.textContent = resposta.data.results[5].director;

    episodio0.textContent = resposta.data.results[0].episode_id;
    episodio1.textContent = resposta.data.results[1].episode_id;
    episodio2.textContent = resposta.data.results[2].episode_id;
    episodio3.textContent = resposta.data.results[3].episode_id;
    episodio4.textContent = resposta.data.results[4].episode_id;
    episodio5.textContent = resposta.data.results[5].episode_id;
  });
};

preencherTabela();
preencherCards();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(preencherGrafico);

async function preencherGrafico() {
  const resposta = await starWarsAPI("planets/");
  const planetasArray = resposta.data.results;
  console.log(resposta);

  const dataArray = [];
  dataArray.push(["Planetas", "Diametro"]);
  planetasArray.forEach((planeta) => {
    dataArray.push([planeta.name, Number(planeta.diameter)]);
  });

  console.log(dataArray);

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Maiores Planetas",
    legend: "none",
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}
