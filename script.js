let allProducts = [];


fetch("data.json")
.then(function(response) {
    return response.json();
   }) 

.then(function (products) {
   allProducts = products;
   renderProducts(allProducts);

   const allBtn = document.getElementById("allBtn");
   const activeBtn = document.getElementById("activeBtn");
   const inActiveBtn = document.getElementById("inactiveBtn");

   allBtn.addEventListener("click", () => {
      renderProducts(allProducts);
   });

   activeBtn.addEventListener("click", () => {
      const activeProducts = allProducts.filter(product => product.isActive);
      renderProducts(activeProducts);
   });

   inActiveBtn.addEventListener("click", () => {
      const inActiveProducts = allProducts.filter(product => !product.isActive);
      renderProducts(inActiveProducts);
   });

   function renderProducts(products) {
      let placeholder = document.querySelector(".box-title");
      let out = "";
      for(let product of products) {
      out += `
            <div class="product-list" id="productList">
                  <div class="intro">
                     <img src='${product.logo}'>
                     <div class="product-name">
                        <h2 id="text">${product.name}</h2>
                        <p id="para">${product.description}</p>
                     </div>
                  </div>
                  
                  <div class="status">
                     <button class="remove remove-content" data-id="${product.id}">Remove</button>
                     <button data-id="${product.id}" class="toggle">
                        <label class="toggle">
                           <input type="checkbox" class="toggle-checkbox" data-id="${product.id}" ${product.isActive ? 'checked' : ''}>
                           <span class="slide"></span>
                        </label>
                     </button>
                  </div>
               </div>
         `;
         }
         placeholder.innerHTML = out;

         attachActionListeners();
         attachToggleListeners();

         function attachActionListeners() {
            document.querySelectorAll(".remove").forEach(button => {
               button.addEventListener("click", () => {
                  const id = parseInt(button.dataset.id);
                  allProducts = allProducts.filter(product => product.id !== id);
                  renderProducts(allProducts);
               });
            });

            document.querySelectorAll(".toggle").forEach(button => {
               button.addEventListener("click", () => {
                  const id = parseInt(button.dataset.id);
                  allProducts = allProducts.map(product => {
                     if (product.id === id) {
                        return {
                           ...product, isActive: !product.isActive
                        }
                        return product;
                     }
                  });

                  renderProducts(allProducts);
               });
            });
         }

         function attachToggleListeners() {
           document.querySelectorAll(".toggle-checkbox").forEach(checkbox => {
           checkbox.addEventListener("change", () => {
           const id = parseInt(checkbox.dataset.id);

           // Find the product in the allProducts array
           allProducts = allProducts.map(product => {
            if (product.id === id) {
               return {
                  ...product,
                  isActive: checkbox.checked
               };
            }
            return product;
         });

      });
  });

}
 }
});
const lightMode = document.getElementById("lightBtn");
const darkMode = document.getElementById("darkBtn");
const body = document.body;

lightMode.addEventListener("click", () => {
   body.classList.remove("dark-theme");
   body.classList.add("light-theme");
});

darkMode.addEventListener("click", () => {
   body.classList.remove("light-theme");
   body.classList.add("dark-theme");
});





   
   

   


 

