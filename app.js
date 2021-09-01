const searchFood = () => {
    const inputValue = document.getElementById('Search-Field')
    const input = inputValue.value;

    inputValue.value = '';

    const error = document.getElementById('error');
    error.textContent = '';
    if (input == '') {
        error.innerHTML = `<h2 class=" text-center p-3 bg-danger text-white">Please Search Anything</h2>`

    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))

    }




}

const displayMeals = foods => {
    const divCard = document.getElementById('card');
    divCard.innerHTML = '';
    error.textContent = '';

    for (const food of foods) {
        // console.log(food)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` <div onclick ="showDetails(${food.idMeal})" class="card h-100 bg-light">
      <img src="${food.strMealThumb}" class="card-img-top p-3 rounded-circle" alt="...">
      <div class="card-body">
        <h4 class="card-title">${food.strMeal}</h4>
        <p class="card-text">${food.strInstructions.slice(0, 100)}</p>
       </div>
       <div class="d-flex justify-content-around">
       <a href="${food.strYoutube}" class="btn btn-primary mb-2 ">Recipies</a>
       <a onclick ="showDetails(${food.idMeal}, event)"  class="btn btn-primary mb-2 ">Show Details</a>
        
       </div>
       
       
     
    </div>`;
        divCard.appendChild(div);

    }
}
const showDetails = (idMeal, event) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(res => res.json())
        .then(data => details(data.meals[0]))
    event.stopPropagation();


}

function details(idMeal) {
    const detail = document.getElementById('detail');
    detail.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `<div class="card text-center" >
        <div class="card-body">
            <img src="${idMeal.strMealThumb}" class="img-fluid rounded  me-3" alt="...">
                <h4 class="card-title"> ${idMeal.strMeal}</h3>
                <h5 class="card-title"> ${idMeal.strCategory}</h5>
                <h6 class="card-title"> ${idMeal.strArea}</h6>

         <ul class = "text-start">
         <i>Recipies</i>
          <li>${idMeal.strIngredient1} ${idMeal.strMeasure1}</li>
          <li>${idMeal.strIngredient2} ${idMeal.strMeasure2}</li>
          <li>${idMeal.strIngredient3} ${idMeal.strMeasure3}</li>
          <li>${idMeal.strIngredient4} ${idMeal.strMeasure4}</li>
          <li>${idMeal.strIngredient5} ${idMeal.strMeasure5}</li>
          <li>${idMeal.strIngredient6} ${idMeal.strMeasure6}</li>
          <li>${idMeal.strIngredient7} ${idMeal.strMeasure7}</li>
         </ul>
               
                <a href = "${idMeal.strYoutube}" class="btn btn-outline-primary">Watch Recipies</a>
      </div>
      <div/>`
    detail.appendChild(div);
}
