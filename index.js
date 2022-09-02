//
let allData = async (search,datalimit) => {  
    try{     
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    let res = await fetch(url);
    let data = await res.json();    
    showData(data.drinks,datalimit); 
  
    } 
    catch(err){
        console.log(err);
    }  
}
allData('');

//searct enter
let inpfil = document.getElementById('inpfil').addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        proSearch(10)
    }  
})

//data search
let proSearch = (datalimit)=>{
    sniperAdd(true)
    let inpfil = document.getElementById('inpfil');
    let val = inpfil.value;
    allData(val,datalimit); 
}

//10 data search
let searchData = () =>{  
    proSearch(10)
}

//display show data
let showData = (data,datalimit) =>{
    let items = document.getElementById('items');
    items.innerHTML = '';

    //if no data show
    let seemoreCopy = document.getElementById('seemore');
    let notfound = document.getElementById('notfound');
    if(data === null){
    notfound.classList.remove('d-none')
    seemoreCopy.style.display = 'none';
    sniperAdd(false)
    }else{
        notfound.classList.add('d-none')
    };

    //data check 10
    let seemore = document.getElementById('seemore');
    if(datalimit && data.length > 10){
        data = data.slice(0,10)
        seemore.classList.remove('d-none')
    }else{
        seemore.classList.add('d-none')
    };  

    //display show data
    data.forEach(d => {
    let div = document.createElement('div');  
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
    <img src="${d.strDrinkThumb}" class="card-img-top">
    <div class="card-body">
    <h5 class="card-title">${d.strDrink}</h5>
    <p class="card-text">${d.strGlass}</p>
    <button class="btn btn-warning text-white" onclick="dataDetails('${d.idDrink}')" data-bs-toggle="modal" data-bs-target="#exampleModal" >Details</button>
    </div>
    </div>     
    `
    items.appendChild(div)
    });
    sniperAdd(false)
}

// data details 
let dataDetails = (id)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=> displayDataDetails(data.drinks))
}

// modal data details show
let displayDataDetails = (data)=>{
    data.forEach( d =>{
    let {strDrinkThumb,strDrink} = d

    let modal = document.getElementById('modalDel')
    modal.innerHTML = '';

    let title = document.getElementById('title');
    title.innerText = strDrink;

    let div = document.createElement('div')
    div.classList.add('detailsimg')
    div.innerHTML = `
    <img src="${strDrinkThumb}" alt="">
    <p>${d.strInstructions.slice(0,80)}</p>
    `
    modal.appendChild(div);
    }); 
}

//data see more
let seemore2 = document.getElementById('seemore').addEventListener('click',()=>{
  proSearch()   

});

//sniper add
let sniperAdd  = (islog) =>{
    let sniper = document.getElementById('sniper');
    sniper.classList.add('d-none')
    if(islog){
        sniper.classList.remove('d-none')
    }else{
        sniper.classList.add('d-none')
    }
}
//sniperAdd(true)