const productos = [
    { id: 1, cat: 'Frutas', nombre: 'Manzana Verde', precioUnit: 2000, estPeso: 0.20, img: 'https://buenprovecho.hn/wp-content/uploads/2021/05/Manzana_verde_2.png', porUnidad: false },
    { id: 2, cat: 'Frutas', nombre: 'Manzana Roja', precioUnit: 2000, estPeso: 0.18, img: 'https://thumbs.dreamstime.com/b/manzanas-rojas-10923633.jpg', porUnidad: false },
    { id: 3, cat: 'Frutas', nombre: 'Tomate Cherry', precioUnit: 1000, estPeso: 0.25, img: 'https://www.flores.ninja/wp-content/uploads/2018/09/Tomate-cherry.jpg', porUnidad: false },
    { id: 4, cat: 'Frutas', nombre: 'Tomate Perita', precioUnit: 1500, estPeso: 0.15, img: 'https://www.frutasmiguel.es/wp-content/uploads/2020/07/IMG_7399-scaled.jpg', porUnidad: false },
    { id: 5, cat: 'Verduras', nombre: 'Lechuga Fresca', precioUnit: 500, estPeso: 0.30, img: 'https://tse2.mm.bing.net/th/id/OIP.EQNB9qKGgFFsar36BA1MrQHaEc?rs=1&pid=ImgDetMain', porUnidad: false },
    { id: 6, cat: 'Verduras', nombre: 'Remolacha', precioUnit: 1200, estPeso: 0.20, img: 'https://i.blogs.es/08042d/remolachas/1366_2000.jpg', porUnidad: false },
    { id: 7, cat: 'Cervezas', nombre: 'Cerveza Quilmes Clásica 340ml', precioUnit: 1200, estPeso: 1, img: 'https://www.bodega-latina.de/wp-content/uploads/2023/02/cerveza-quilmes-clasica.jpg', porUnidad: true },
    { id: 8, cat: 'Cervezas', nombre: 'Cerveza Brahma Clásica 473ml', precioUnit: 1100, estPeso: 1, img: 'https://images.squarespace-cdn.com/content/v1/5ef4b9a14215590dac8d9e26/09bb0159-600d-4b49-9d68-9923d59bbcba/Brahma_Cans_AR34-01.jpg', porUnidad: true },
    { id: 9, cat: 'Cervezas', nombre: 'Cerveza Andes Origen IPA 473ml', precioUnit: 1500, estPeso: 1, img: 'https://elnenearg.vtexassets.com/arquivos/ids/161585-800-auto?v=637970386720870000&width=800&height=auto&aspect=true', porUnidad: true },
    { id: 10, cat: 'Almacen', nombre: 'Fideos Matarazzo Coditos', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-coditobyb1-a49f751a0a2c63eebc15971505682240-1024-1024.png', porUnidad: true },
    { id: 11, cat: 'Almacen', nombre: 'Fideos Matarazzo Spaghetti', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-spaghetti-byb1-e0524d38e8eb7054a515966747031147-1024-1024.png', porUnidad: true },
    { id: 12, cat: 'Almacen', nombre: 'Fideos Matarazzo Tirabuzón', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-tirabuzon1-9e5b931729e38a770715843809254148-1024-1024.png', porUnidad: true },
    { id: 13, cat: 'Almacen', nombre: 'Fideos Matarazzo Mostachol', precioUnit: 1350, estPeso: 1, img: 'https://d3340tyzmtlo4u.cloudfront.net/users/864/images/detailed/14/Matarazzo_Fideos_Mostachol_N%c2%b052%2c_500_g.jpg', porUnidad: true },
    { id: 14, cat: 'Almacen', nombre: 'Arroz Largo-Fino 1kg Dos Hermanos', precioUnit: 1850, estPeso: 1, img: 'https://masonlineprod.vtexassets.com/arquivos/ids/225426/0779050319908-01-9885.jpg?v=637855396563700000', porUnidad: true },
    { id: 15, cat: 'Almacen', nombre: 'Snacks Discos Salame Dos Hermanos', precioUnit: 980, estPeso: 1, img: 'https://carrefourar.vtexassets.com/arquivos/ids/196688-800-auto?v=637523688999570000&width=800&height=auto&aspect=true', porUnidad: true },
    { id: 16, cat: 'Almacen', nombre: 'Snacks Arroz Queso Dos Hermanos', precioUnit: 980, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/snack-dos-hermanos-queso1-1e27c89de532b6d7a416353560056687-1024-1024.png', porUnidad: true },
    { id: 17, cat: 'Almacen', nombre: 'Salsa Lista Pomarola Arcor 340grs', precioUnit: 750, estPeso: 1, img: 'https://th.bing.com/th/id/R.da40d4c25bea58b12591ceb59b610700?rik=0rGgltqWuRtKRw&pid=ImgRaw&r=0', porUnidad: true },
    { id: 18, cat: 'Almacen', nombre: 'Puré de Tomate Arcor 350grs', precioUnit: 680, estPeso: 1, img: 'https://www.multifood.com.ar/images/000Z-001-016-01355517Z-001-016-013-Puredetomate.jpg', porUnidad: true }
];

let carrito = {};
let categoriaActual = 'Frutas';

function filtrarCategoria(categoria, btn) {
    categoriaActual = categoria;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('current-category-title').innerText = (categoria === 'Almacen') ? 'Almacén' : categoria;
    renderizar();
}

function renderizar() {
    const container = document.getElementById('products-container');
    container.innerHTML = "";
    const listaFiltrada = productos.filter(p => p.cat === categoriaActual);

    listaFiltrada.forEach(p => {
        const qty = carrito[p.id] || 0;
        const sub = qty * p.estPeso * p.precioUnit;
        const isAlmacen = p.cat === 'Almacen';
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-container ${isAlmacen ? 'bg-almacen' : ''}">
                <img src="${p.img}" alt="${p.nombre}" class="product-img ${isAlmacen ? 'img-contain' : ''}">
            </div>
            <div class="product-info">
                <div>
                    <h3>${p.nombre}</h3>
                    <span class="price-tag">$${p.precioUnit.toLocaleString('es-AR')} / ${p.porUnidad ? 'Unid.' : 'kg'}</span>
                </div>
                <div class="controls">
                    <button class="qty-btn" onclick="updateQty(${p.id}, -1)">-</button>
                    <span class="unit-display" id="qty-${p.id}">${qty}</span>
                    <button class="qty-btn" onclick="updateQty(${p.id}, 1)">+</button>
                </div>
                <span class="subtotal-live" id="sub-${p.id}">Subtotal: $${sub.toLocaleString('es-AR')}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateQty(id, change) {
    if (!carrito[id]) carrito[id] = 0;
    carrito[id] += change;
    if (carrito[id] < 0) carrito[id] = 0;
    const p = productos.find(prod => prod.id === id);
    document.getElementById(`qty-${id}`).innerText = carrito[id];
    document.getElementById(`sub-${id}`).innerText = `Subtotal: $${(carrito[id] * p.estPeso * p.precioUnit).toLocaleString('es-AR')}`;
    calcularTotal();
}

function calcularTotal() {
    let total = 0;
    productos.forEach(p => { if (carrito[p.id]) total += carrito[p.id] * p.estPeso * p.precioUnit; });
    document.getElementById('total-general').innerText = `$${total.toLocaleString('es-AR')}`;
}

function vaciarCarrito() { if(confirm("¿Vaciar pedido?")) { carrito = {}; renderizar(); calcularTotal(); } }

function enviarPedido() {
    let texto = "🏪 *NUEVO PEDIDO - EN LO DE OTTO*\n---------------------------------\n\n";
    let hayAlgo = false;
    productos.forEach(p => {
        if (carrito[p.id] > 0) {
            let sub = carrito[p.id] * p.estPeso * p.precioUnit;
            texto += `✅ *${p.nombre}*\nCant: ${carrito[p.id]} ${p.porUnidad ? 'unid.' : 'kg'}\nSub: *$${sub.toLocaleString('es-AR')}*\n\n`;
            hayAlgo = true;
        }
    });
    if (!hayAlgo) return alert("Carrito vacío.");
    texto += `---------------------------------\n💰 *TOTAL: ${document.getElementById('total-general').innerText}*`;
    window.open(`https://wa.me/543751246552?text=${encodeURIComponent(texto)}`, '_blank');
}

renderizar();
