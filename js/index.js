document.getElementById("home-btn").addEventListener('click', () => {
    document.getElementById("default-banner").classList.remove("hidden");
    document.getElementById("products-container").classList.add("hidden");
})
document.getElementById("products-btn").addEventListener('click', () => {
    document.getElementById("default-banner").classList.add("hidden");
    document.getElementById("products-container").classList.remove("hidden");
})

const loadCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => displayCategories(data))
}
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("products-container");
    categoryContainer.innerHTML = "";
    for (const category of categories) {
        const newbtn = document.createElement('btn');
        newbtn.classList.add('btn');
        newbtn.innerHTML = `${category}`;
        categoryContainer.append(newbtn);
    }
}

loadCategories();
