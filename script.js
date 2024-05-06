document.getElementById("searchInput").addEventListener("input", function() {
  const searchInput = this.value.trim().toLowerCase();
  if (searchInput.length === 0) {
    document.getElementById("dropdown").style.display = "none";
    return;
  }

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const matchedProducts = data.items.filter(item => item.product.toLowerCase().includes(searchInput));
      const dropdown = document.getElementById("dropdown");
      dropdown.innerHTML = ""; // Clear previous dropdown items
      if (matchedProducts.length > 0) {
        matchedProducts.forEach(product => {
          const link = document.createElement("a");
          link.textContent = product.product;
          link.addEventListener("click", function() {
            document.getElementById("searchInput").value = product.product;
            document.getElementById("result").textContent = `Price for ${product.product}: ${product.price}`;
            dropdown.style.display = "none";
          });
          dropdown.appendChild(link);
        });
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Close the dropdown when clicking outside of it
document.addEventListener("click", function(event) {
  if (!event.target.matches("#searchInput") && !event.target.matches(".dropdown-content a")) {
    document.getElementById("dropdown").style.display = "none";
  }
});
