const apiEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const mealContainer = document.getElementById('meals')
const spinner = document.getElementById('spinner')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const alert = document.getElementById('search-empty-alert')

// fetch meals from api
const fetchMeals = async () => {
	spinnerToggle('block')
	const res = await fetch(apiEndPoint)
	const data = await res.json()
	spinnerToggle('none')
	appendMeals(data.meals)
}

// spinner toggle function
const spinnerToggle = (spinnerSituation) => {
	spinner.style.display = spinnerSituation
}

// append meals list through loop
const appendMeals = (meals) => {
	meals.forEach((meal) => {
		const mealDiv = document.createElement('div')
		mealDiv.classList.add('col-md-4')
		mealDiv.innerHTML = `
         <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
               <h5 class="card-title">${meal.strMeal}</h5>
               <p class="card-text">
                  ${meal.strInstructions.slice(0, 150) + '...'}
               </p>
               <a target="_blank" href='${
					meal.strSource
				}' class='btn btn-primary'>Details</a>
            </div>
         </div>
      `
		mealContainer.appendChild(mealDiv)
	})
}

// search for meals
searchButton.addEventListener('click', async () => {
	spinnerToggle('block')
	notificationAlert('none')
	mealContainer.textContent = ''
	const searchValue = searchInput.value
	if (searchValue.length === 0) {
		mealContainer.textContent = ''
		notificationAlert('block', 'Please type something before searching.')
		spinnerToggle('none')
	} else {
		const searchedRes = await fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
		)
		const searchData = await searchedRes.json()
		appendSearchResult(searchData.meals)
		searchInput.value = ''
	}
})

// append search result
const appendSearchResult = (data) => {
	mealContainer.textContent = ''
	if (data) {
		data?.forEach((meal) => {
			const mealDiv = document.createElement('div')
			mealDiv.classList.add('col-md-4')
			mealDiv.innerHTML = `
            <div class="card">
               <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
               <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">
                     ${meal.strInstructions.slice(0, 150) + '...'}
                  </p>
                  <a target="_blank" href='${
						meal.strSource
					}' class='btn btn-primary'>Details</a>
               </div>
            </div>
         `
			mealContainer.appendChild(mealDiv)
			spinnerToggle('none')
			notificationAlert('none')
		})
	} else {
		notificationAlert('block', 'Nothing Found')
		spinnerToggle('none')
	}
}

fetchMeals()

// nothing found alert
const notificationAlert = (alertSit, alertText = '') => {
	alert.style.display = alertSit
	alert.innerHTML = alertText
}
notificationAlert('none', '')
