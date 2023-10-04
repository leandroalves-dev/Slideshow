
const slider = document.querySelectorAll('.slider');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const containerBullets = document.querySelector('.container-bullets');

let counter = 0;
let valueIdPagination;

slider.forEach((slide, index) => {
    //Calcula as posições dos slides
    slide.style.left = `${index * 100}%`

    //Verifica se é o primeiro e adiciona uma classe no bullets
    if( index == 1 ){
        document.querySelector('.bullets').classList.toggle('active');
    }
  
    createBullets(index);
    
});

//Cria os bullets de acordo com a quantidade de slider
function createBullets(index){
    const htmlSpan = document.createElement('span');
    htmlSpan.classList.add('bullets');
    htmlSpan.setAttribute('data-id', (index + 1));
    containerBullets.appendChild(htmlSpan);
}

const bullets = document.querySelectorAll('.bullets');

//Valida e verifica quando se clica nos bullets
bullets.forEach(function(pagination, index) {
    
    pagination.addEventListener('click', function(){
        bullets.forEach(items => {
            items.classList.remove('active');
        });
        this.classList.add('active');

        checkBullets(index);
       
        slider.forEach(slide => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    });

});

//Anterior slider
prevBtn.addEventListener('click', () =>{

    checkPagination();

    counter--;

    if( counter < 0 ){  
        counter = slider.length - 1;        
    }
   
    carrossel(counter);
    checkBullets(counter);
});

//Proximo slider
nextBtn.addEventListener('click', () =>{

    checkPagination();

    counter++;

    if( counter > slider.length - 1 ){       
        counter = 0;
    }
    carrossel(counter);    
    checkBullets(counter);
});

//Desabilita quando o prev ou next quando for o primeiro e o ultimo item
function checkBullets(indx){
    
    if( indx < 1 ){
        prevBtn.setAttribute('disabled', true);
        prevBtn.style.opacity = '0.5';
    }else{
        prevBtn.removeAttribute('disabled');
        prevBtn.style.opacity = '1';
    }
    
    if( (indx + 1) >= slider.length ){
        nextBtn.setAttribute('disabled', true);
        nextBtn.style.opacity = '0.5';
    }else{
        nextBtn.removeAttribute('disabled');
        nextBtn.style.opacity = '1';
    }
}

//Valida os bullets quando é clicado no prev ou next
function checkPagination(){
    bullets.forEach((btn) => {
        if(btn.classList.contains('active')){
            valueIdPagination = btn.dataset.id - 1;
            counter = valueIdPagination;
        }
    });
}

function carrossel(){    
    setPaginationBullets();
    slider.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
}

//Adiciona active quando clicado
function setPaginationBullets(){
    bullets.forEach((items, indx) => {
        if( indx == counter ){
            items.classList.add('active');
        }else{
            items.classList.remove('active');
        }
    });
}