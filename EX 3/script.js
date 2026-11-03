
// ShopEase Shopping App JavaScript

// Add product to cart
function addToCart(productName) {
    let cartItems = document.getElementById("cartItems");

    let item = document.createElement("li");
    item.textContent = productName + " - Added to Cart";

    cartItems.appendChild(item);

    alert(productName + " added to your cart successfully!");
}

// Add product to wishlist
function addToWishlist(productName) {
    let wishItems = document.getElementById("wishItems");

    // Check whether product is already in wishlist
    let existingItems = wishItems.getElementsByTagName("li");

    for (let i = 0; i < existingItems.length; i++) {
        if (existingItems[i].dataset.product === productName) {
            alert(productName + " is already in your wishlist!");
            return;
        }
    }

    let item = document.createElement("li");
    item.textContent = productName + " - Added to Wishlist";
    item.dataset.product = productName;

    wishItems.appendChild(item);

    alert(productName + " added to your wishlist!");
}
