document.getElementById("home-btn").addEventListener('click', () => {
    document.getElementById("default-banner").classList.remove("hidden");
    document.getElementById("category-container").classList.add("hidden");
})
document.getElementById("products-btn").addEventListener('click', () => {
    document.getElementById("default-banner").classList.add("hidden");
    document.getElementById("category-container").classList.remove("hidden");
})

const removeActive = () => {
    const arr = document.getElementsByClassName('btn');
    for (const element of arr) {
        element.classList.remove('active');
    }
}

const loadCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => {
            displayCategories(data)
        })
}
const loadAllData = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            displayCategoryData(data)
        })
}
const loadCategoryData = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => {
            displayCategoryData(data)
        })
}
const displayCategoryData = (products) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    for (const product of products) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('card', 'bg-base-100', 'shadow-sm');
        newDiv.innerHTML = `
                    <figure>
                        <img class="h-48 w-full" src= ${product.image} alt="" />
                    </figure>
                    <div class="flex justify-between mt-4 px-5">
                        <p class="bg-blue-300 px-2 rounded-full font-semibold">${product.category}</p>
                        <p><i class="fa-solid fa-star"></i> ${product.rating.rate} (${product.rating.count})</p>
                    </div>
                    <div class="card-body">
                        <h2 class="card-title">
                            ${product.title} <br> $${product.price}
                        </h2>
                        <div class="card-actions justify-between">
                            <div onclick = loadDetails(${product.id}) class="btn px-5">details</div>
                            <div class="btn btn-primary px-5"><i class="fa-solid fa-cart-arrow-down"></i> Add</div>
                        </div>
                    </div>
        `;
        productsContainer.append(newDiv);
    }
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
    const allBtn = document.createElement('btn');
    allBtn.classList.add('btn');
    allBtn.innerText = 'all';
    allBtn.addEventListener('click', () => {
        removeActive();
        allBtn.classList.add('active');
        loadAllData();
    })
    categoryContainer.appendChild(allBtn);
    for (const category of categories) {
        const newbtn = document.createElement('button');
        newbtn.classList.add('btn');
        newbtn.innerHTML = `${category}`;
        newbtn.addEventListener('click', () => {
            removeActive();
            newbtn.classList.add('active');
            loadCategoryData(category);
        });
        categoryContainer.appendChild(newbtn);
    }
}

const loadDetails = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => console.log(data))
}

loadCategories();
