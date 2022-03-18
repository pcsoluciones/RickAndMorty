console.log("Funcionando...")

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

const fetchData = async () => {
    console.log("Obteniento datos...")
    try {
        loadingData(true)
        const res = await fetch("https://rickandmortyapi.com/api/character")
        const data = await res.json()
        pintarCard(data)
        
    } catch (error) {
        console.log("Error al tratar de obtener los datos")
        console.log(error)
    } finally {
        loadingData(false)
    }
}

// Pintar las tarjetas
const pintarCard = data=> {
    const cards = document.getElementById('card-dinamicas')
    const templateCard = document.getElementById('template-card').content
    const fragment = document.createDocumentFragment()
    //console.log(data)
    data.results.forEach(item => {
        //console.log(item)
        const clone = templateCard.cloneNode(true)  // clona el contenido del template
        // se va rellenando el contenido con los datos dinámicos
        clone.querySelector("h5").textContent = item.name       
        clone.querySelector("p").textContent = item.species
        clone.querySelector(".card-img-top").setAttribute("src", item.image)
        // guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}


// Pintar el Loading
const loadingData = (estado) => {
    const loading = document.getElementById("loading")
    if (estado) {
        loading.classList.remove('d-none')
    } else {
        loading.classList.add('d-none')
    }
}





