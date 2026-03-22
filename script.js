window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => { splash.classList.add('hidden'); }, 2500);
});

const productos = [
    { id: 1, cat: 'Frutas', nombre: 'Manzana Verde', precioUnit: 2000, estPeso: 0.20, img: 'https://buenprovecho.hn/wp-content/uploads/2021/05/Manzana_verde_2.png' },
    { id: 2, cat: 'Frutas', nombre: 'Manzana Roja', precioUnit: 2000, estPeso: 0.18, img: 'https://thumbs.dreamstime.com/b/manzanas-rojas-10923633.jpg' },
    { id: 3, cat: 'Frutas', nombre: 'Tomate Cherry', precioUnit: 1000, estPeso: 0.25, img: 'https://www.flores.ninja/wp-content/uploads/2018/09/Tomate-cherry.jpg' },
    { id: 4, cat: 'Frutas', nombre: 'Tomate Perita', precioUnit: 1500, estPeso: 0.15, img: 'https://www.frutasmiguel.es/wp-content/uploads/2020/07/IMG_7399-scaled.jpg' },
    { id: 5, cat: 'Verduras', nombre: 'Lechuga Fresca', precioUnit: 500, estPeso: 0.30, img: 'https://tse2.mm.bing.net/th/id/OIP.EQNB9qKGgFFsar36BA1MrQHaEc?rs=1&pid=ImgDetMain' },
    { id: 6, cat: 'Verduras', nombre: 'Remolacha', precioUnit: 1200, estPeso: 0.20, img: 'https://i.blogs.es/08042d/remolachas/1366_2000.jpg' },
    { id: 7, cat: 'Cervezas', nombre: 'Quilmes 340ml', precioUnit: 1200, estPeso: 1, img: 'https://www.bodega-latina.de/wp-content/uploads/2023/02/cerveza-quilmes-clasica.jpg' },
    { id: 8, cat: 'Cervezas', nombre: 'Brahma 473ml', precioUnit: 1100, estPeso: 1, img: 'https://images.squarespace-cdn.com/content/v1/5ef4b9a14215590dac8d9e26/09bb0159-600d-4b49-9d68-9923d59bbcba/Brahma_Cans_AR34-01.jpg' },
    { id: 9, cat: 'Cervezas', nombre: 'Andes IPA 473ml', precioUnit: 1500, estPeso: 1, img: 'https://elnenearg.vtexassets.com/arquivos/ids/161585-800-auto?v=637970386720870000' },
    { id: 10, cat: 'Almacen', nombre: 'Matarazzo Coditos', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-coditobyb1-a49f751a0a2c63eebc15971505682240-1024-1024.png' },
    { id: 11, cat: 'Almacen', nombre: 'Matarazzo Spaghetti', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-spaghetti-byb1-e0524d38e8eb7054a515966747031147-1024-1024.png' },
    { id: 12, cat: 'Almacen', nombre: 'Matarazzo Tirabuzón', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-tirabuzon1-9e5b931729e38a770715843809254148-1024-1024.png' }
];

let carrito = {};
let categoriaActual = 'Frutas';
let ubicacionGps = '';

function filtrarCategoria(cat, btn) {
    categoriaActual = cat;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('current-category-title').innerText = (cat === 'Almacen') ? 'Almacén' : cat;
    renderizar();
}

function renderizar() {
    const container = document.getElementById('products-container');
    container.innerHTML = "";
    productos.filter(p => p.cat === categoriaActual).forEach(p => {
        const qty = carrito[p.id] || 0;
        const sub = qty * p.estPeso * p.precioUnit;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-container ${p.cat === 'Almacen' ? 'bg-almacen' : ''}">
                <img src="${p.img}" class="product-img ${p.cat === 'Almacen' ? 'img-contain' : ''}">
            </div>
            <div class="product-info">
                <h3>${p.nombre}</h3>
                <span class="price-tag">$${p.precioUnit.toLocaleString('es-AR')}</span>
                <div class="controls">
                    <button class="qty-btn" onclick="updateQty(${p.id}, -1)">-</button>
                    <span id="qty-${p.id}">${qty}</span>
                    <button class="qty-btn" onclick="updateQty(${p.id}, 1)">+</button>
                </div>
                <span class="subtotal-live" id="sub-${p.id}">$${sub.toLocaleString('es-AR')}</span>
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
    document.getElementById(`sub-${id}`).innerText = `$${(carrito[id] * p.estPeso * p.precioUnit).toLocaleString('es-AR')}`;
    calcularTotal();
}

function calcularTotal() {
    let total = 0;
    productos.forEach(p => { if (carrito[p.id]) total += carrito[p.id] * p.estPeso * p.precioUnit; });
    document.getElementById('total-general').innerText = `$${total.toLocaleString('es-AR')}`;
}

function vaciarCarrito() { if(confirm("¿Vaciar pedido?")) { carrito = {}; renderizar(); calcularTotal(); } }

function mostrarOpcionesEntrega() {
    if (document.getElementById('total-general').innerText === '$0.00') return alert("Tu carrito está vacío.");
    document.getElementById('section-productos').style.display = 'none';
    document.getElementById('section-entrega').style.display = 'block';
    window.scrollTo(0,0);
}

function prepararEnvio() {
    document.getElementById('opciones-metodo').style.display = 'none';
    document.getElementById('form-direccion').style.display = 'block';
}

function obtenerGps() {
    const txt = document.getElementById('txt-gps');
    
    // Opciones recomendadas para iOS (Alta precisión)
    const opciones = { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 };

    txt.innerText = "⏳ Capturando ubicación...";

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            // Formato de link compatible con todos los mapas
            ubicacionGps = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
            txt.innerText = "✅ Ubicación capturada";
            document.getElementById('btn-enviar-final').style.display = "block";
        },
        (error) => {
            alert("Error: Por favor activá el GPS y permití el acceso en Safari.");
            txt.innerText = "❌ Error de ubicación";
        },
        opciones
    );
}

function validarYEnviar() { finalizarPedido('Envío a Domicilio', ubicacionGps); }

function volverAlMenu() {
    document.getElementById('section-productos').style.display = 'block';
    document.getElementById('section-entrega').style.display = 'none';
}

function finalizarPedido(metodo, ubi = "") {
    let texto = `🏪 *PEDIDO - EN LO DE OTTO*\n📦 *METODO:* ${metodo}\n`;
    if (ubi !== "") texto += `📍 *MAPA:* ${ubi}\n`;
    texto += `---------------------------------\n`;
    productos.forEach(p => { if (carrito[p.id] > 0) texto += `• ${p.nombre} x${carrito[p.id]}\n`; });
    texto += `---------------------------------\n💰 *TOTAL: ${document.getElementById('total-general').innerText}*`;
    window.open(`https://wa.me/543751246552?text=${encodeURIComponent(texto)}`, '_blank');
}

renderizar();
