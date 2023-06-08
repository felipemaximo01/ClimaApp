const caixa = document.querySelector('.caixa');
const pesquisa = document.querySelector('.pesquisa button');
const caixaTempo = document.querySelector('.caixa-tempo');
const detalhes = document.querySelector('.detalhes');
const erro = document.querySelector('.erro');


pesquisa.addEventListener('click',() =>{
    const apiKey = 'bf44d04d8a708c8e168eb615d9c5ae13';
    const cidade = document.querySelector('.pesquisa input').value;

    if(cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}`).
    then(response=>response.json()).then(json => {
        if(json.cod === '404'){
            caixa.style.height = '400px';
            caixaTempo.style.display = 'none';
            detalhes.style.display = 'none';
            erro.style.display= 'block';
            erro.classList.add('fadeIn')
            return;
        }

        erro.style.display= 'none';
        erro.classList.remove('fadeIn')

        const img = document.querySelector('.caixa-tempo img');
        const temperatura = document.querySelector('.caixa-tempo .temperatura');
        const descricao = document.querySelector('.caixa-tempo .descricao');
        const umidadae = document.querySelector('.detalhes .umidade span');
        const vento = document.querySelector('.detalhes .vento span');

        switch(json.weather[0].main){
            case 'Clear':
                img.src = 'img/clear.png';
                break;
            case 'Rain':
                img.src = 'img/rain.png';
                break;
            case 'Snow':
                img.src = 'img/snow.png';
                break;
            case 'Clouds':
                img.src = 'img/cloud.png';
                break;
            case 'Haze':
                img.src = 'img/mist.png';
                break;
            
            default:
                img.src='';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML =  `${json.weather[0].description}`;
        umidadae.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML  = `${parseInt(json.wind.speed)}Km/h`;

        caixaTempo.style.display='';
        detalhes.style.display='';
        caixaTempo.classList.add('fadeIn');
        detalhes.classList.add('fadeIn');
        caixa.style.height = '600px';



    });
});