import chuckNorrisAPI from "./services/ChuckNorriesAPI"

// [GET, POST, PUT, PATCH, DELETE]

const RandomJokeHTMLElement = document.querySelector('.random-jokes')
const CategoriesHTMLElement = document.querySelector('#categories')
const buttomeElement = document.querySelector('.generate-joke-button')
const searchElement = document.querySelector('#search')
const searchResultWrapper = document.querySelector('.search-results')
const resultCountWrapper = document.querySelector('.result-count')

let selectedCategory = null;


const fetchRandomJokes = async (category = '') => {
    try {
        const response = await chuckNorrisAPI.get(`/random?catecory=${category}`)
    
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Something went terrible wrong!')
    }
}

const OptionCategory = async () => {
    try {
        const response = await chuckNorrisAPI.get(`/categories`)
    
        return response.data
    } catch (error) {
        throw new Error('Something went terrible wrong!')
    }
}

const displayRandomJoke = async () => {
    const joke = await fetchRandomJokes()
    RandomJokeHTMLElement.textContent = joke.value
}

const fillSelectWithOptions = async () => {
    const categories = await OptionCategory()

    if (!categories) return

    categories.forEach((category) => {
        const option = new Option(category, category)
        CategoriesHTMLElement.append(option)
    })
}

CategoriesHTMLElement.addEventListener('change', async (event) => {
    selectedCategory = event.currentTarget.value
    const response = await fetchRandomJokes(selectedCategory)
    RandomJokeHTMLElement.textContent = response.value
})

buttomeElement.addEventListener('click', async (event) => {
    const response = await fetchRandomJokes(selectedCategory)
    RandomJokeHTMLElement.textContent = response.value
})

searchElement.addEventListener('input', async (event) => {
    if (event.currentTarget.value.length < 3) return

    const response = await searchQuery(event.currentTarget.value)
    console.log(response.result)

    const resultCountPrural = response.total === 1 ? 'nali' : 'nalja'
    resultCountWrapper.innerText = `Leitud ${response?.total} ${resultCountPrural }.`
})

const searchQuery = async (query) => {

    const response = await chuckNorrisAPI.get(`$/search?query=${query}`)
    
    return response.data
}


fetchRandomJokes()
displayRandomJoke()
fillSelectWithOptions()