////////////// první část //////////////ú

//nezapomeň, že funkce bude přebírat data
const createMovielist = (data) => {
    console.log(data);

    //nejdřív jsem si neuvědomila, že to musím to přemapované pole do něčeho vložit, tedy si tím querySelectorem najít onen <ul> a do něj pak innerHTML!!!
    const movieList = document.querySelector(".movie-list");

    movieList.innerHTML = data
    //tady jsem měla chybně bez innerHTML rovnou data.map atp.
    //a napodruhý podobně, chybně:   >> už s uložením do proměnné, ale bez .innerHTML
    //movieList = data.map(...
    .map((movie) => {
        //tady jsem byla zblblá z reactu a psala jsem 
        //return (  >> má být zpětná uvozovka a hodnoty pak přes dolary
        //   <li class...
        return `
            <li class="movie-detail">
                <div class="movie-poster">
                    <img 
                    src=${movie.posterUrl}
                    alt=${movie.title}
                    />
                </div>
                <div class="movie-info">
                    <h2 class="movie-title">${movie.title}</h2>
                    <div class="movie-year">Rok vydání: ${movie.year}</div>
                    <div class="movie-link">
                    <a href=${movie.url} target="_blank">Odkaz na CSFD</a>
                    </div>
                </div>
            </li>
        `
    })
    .join('')
    //bez toho join by se ty <li> vložili ODDĚLENÉ ČÁRKOU! a ne hned jeden za druhým jakožto jeden dlouhý string plný html elementů - rozhodilo by se naplánované formátování
}

fetch("https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies")
.then((response) => response.json())
//bacha u prvního then na zapomenuté závorky za .json
.then(createMovielist) 


////////////// druhá část ////////////////////

const genreList = (data) => {
    console.log(data)

    const selectGenre = document.querySelector("#select-genre")
    selectGenre.innerHTML = data
    .map((genre) => {
        return `<option id=${genre} value=${genre}>${genre}</option>`
    }).join('')
};

fetch("https://apps.kodim.cz/daweb/trening-api/apis/movie-api/genres")
.then((response) => response.json())
.then(genreList);


const buttonSubmit = document.querySelector("#submit");

const handleClick = (e) => {
    e.preventDefault();
    const selectedGenre = document.querySelector("#select-genre").value;
    console.log(selectedGenre)
    
    fetch(`https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies?genre=${selectedGenre}`)
    .then((response) => response.json())
    .then(createMovielist)
    //původně jsem myslela, že budu muset volat funkci, kterou budu ten původní seznam filmů teprve filtrovat - nedošlo mi, že tím fetchem si vygeneruju UŽ VYFILTROVANÉ FILMY :-) tak super, stačilo jen znovu zavolat tu stejnou funkci pro přemapování filmů
};

buttonSubmit.addEventListener("click", handleClick);