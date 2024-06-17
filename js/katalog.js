$(document).ready(function() {
    // Example product data
    var products = [
        {id: 1, name: 'Espresso', description: 'Strong and bold espresso', price: 3.00, image: 'https://i.pinimg.com/564x/8a/50/9e/8a509e80a255b25b54774a4437debf0e.jpg'},
        {id: 2, name: 'Latte', description: 'Delicious latte with steamed milk', price: 4.50, image: 'https://i.pinimg.com/564x/6a/86/c3/6a86c387495a30851e5843a582c7b6f2.jpg'},
        {id: 3, name: 'Cappuccino', description: 'Creamy cappuccino with foam', price: 4.00, image: 'https://i.pinimg.com/564x/33/44/2e/33442e58a74503c7cef4fc437a4ebc8e.jpg'},
        {id: 4, name: 'Americano', description: 'Smooth and rich Americano', price: 3.50, image: 'https://i.pinimg.com/564x/cb/48/db/cb48db04009801523739569e0f33cfc3.jpg'}
    ];

    // Load products into table
    function loadProducts() {
        var productTableBody = $('#productTableBody');
        productTableBody.empty();
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            productTableBody.append(`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td><img src="${product.image}" class="product-image"></td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
                    </td>
                </tr>
            `);
        }
    }

    // Call loadProducts on page load
    loadProducts();

    // Handle form submission for creating/updating products
    $('#productForm').on('submit', function(e) {
        e.preventDefault();
        var productData = {
            id: $('#productId').val(),
            name: $('#productName').val(),
            description: $('#productDescription').val(),
            price: parseFloat($('#productPrice').val()),
            image: $('#productImage').val()
        };

        // Simulate server request and update local products array
        if (productData.id) {
            var index = products.findIndex(p => p.id == productData.id);
            products[index] = productData;
        } else {
            productData.id = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;
            products.push(productData);
        }
        loadProducts();
        $('#productForm')[0].reset();
        $('#productId').val('');
    });

    // Handle edit button click
    $('#productTableBody').on('click', '.edit-btn', function() {
        var id = $(this).data('id');
        var product = products.find(p => p.id == id);
        if (product) {
            $('#productId').val(product.id);
            $('#productName').val(product.name);
            $('#productDescription').val(product.description);
            $('#productPrice').val(product.price);
            $('#productImage').val(product.image);
        }
    });

    // Handle delete button click
    $('#productTableBody').on('click', '.delete-btn', function() {
        var id = $(this).data('id');
        if (confirm('Apakah kamu yakin ingin menghapus produk ini ?')) {
            // Simulate server request and update local products array
            products = products.filter(p => p.id != id);
            loadProducts();
        }
    });
});
function logout() {
    localStorage.removeItem('loggedIn');
    alert('Anda telah logout.');
    updateLoginStatus();
}