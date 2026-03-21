// --- LÓGICA PANTALLA DE CARGA (SPLASH) ---
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    
    // Solicitamos permiso de GPS de entrada para ganar tiempo
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(()=>{}, ()=>{}, {timeout: 1000});
    }

    // Ocultamos el splash después de 2.5 segundos
    setTimeout(() => {
        splash.classList.add('hidden');
    }, 2500);
});
// --- FIN LÓGICA SPLASH ---

const productos = [
    { id: 1, cat: 'Frutas', nombre: 'Manzana Verde', precioUnit: 2000, estPeso: 0.20, img: 'https://buenprovecho.hn/wp-content/uploads/2021/05/Manzana_verde_2.png' },
    { id: 2, cat: 'Frutas', nombre: 'Manzana Roja', precioUnit: 2000, estPeso: 0.18, img: 'https://thumbs.dreamstime.com/b/manzanas-rojas-10923633.jpg' },
    { id: 3, cat: 'Frutas', nombre: 'Tomate Cherry', precioUnit: 1000, estPeso: 0.25, img: 'https://www.flores.ninja/wp-content/uploads/2018/09/Tomate-cherry.jpg' },
    { id: 4, cat: 'Frutas', nombre: 'Tomate Perita', precioUnit: 1500, estPeso: 0.15, img: 'https://www.frutasmiguel.es/wp-content/uploads/2020/07/IMG_7399-scaled.jpg' },
    { id: 5, cat: 'Verduras', nombre: 'Lechuga Fresca', precioUnit: 500, estPeso: 0.30, img: 'https://tse2.mm.bing.net/th/id/OIP.EQNB9qKGgFFsar36BA1MrQHaEc?rs=1&pid=ImgDetMain' },
    { id: 6, cat: 'Verduras', nombre: 'Remolacha', precioUnit: 1200, estPeso: 0.20, img: 'https://i.blogs.es/08042d/remolachas/1366_2000.jpg' },
    { id: 7, cat: 'Cervezas', nombre: 'Cerveza Quilmes Clásica 340ml', precioUnit: 1200, estPeso: 1, img: 'https://www.bodega-latina.de/wp-content/uploads/2023/02/cerveza-quilmes-clasica.jpg' },
    { id: 8, cat: 'Cervezas', nombre: 'Cerveza Brahma Clásica 473ml', precioUnit: 1100, estPeso: 1, img: 'https://images.squarespace-cdn.com/content/v1/5ef4b9a14215590dac8d9e26/09bb0159-600d-4b49-9d68-9923d59bbcba/Brahma_Cans_AR34-01.jpg' },
    { id: 9, cat: 'Cervezas', nombre: 'Cerveza Andes Origen IPA 473ml', precioUnit: 1500, estPeso: 1, img: 'https://elnenearg.vtexassets.com/arquivos/ids/161585-800-auto?v=637970386720870000&width=800&height=auto&aspect=true' },
    { id: 10, cat: 'Almacen', nombre: 'Fideos Matarazzo Coditos', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-coditobyb1-a49f751a0a2c63eebc15971505682240-1024-1024.png' },
    { id: 11, cat: 'Almacen', nombre: 'Fideos Matarazzo Spaghetti', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-spaghetti-byb1-e0524d38e8eb7054a515966747031147-1024-1024.png' },
    { id: 12, cat: 'Almacen', nombre: 'Fideos Matarazzo Tirabuzón', precioUnit: 1350, estPeso: 1, img: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/108/127/products/matarazzo-tirabuzon1-9e5b931729e38a770715843809254148-1024-1024.png' }
];

let carrito = {};
let categoriaActual = 'Frutas';
let metodoSeleccionado = '';
let ubicacionGps = '';

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

    listaFiltrada.forEach((p, index) => {
        const qty = carrito[p.id] || 0;
        const sub = qty * p.estPeso * p.precioUnit;
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <div class="product-img-container ${p.cat === 'Almacen' ? 'bg-almacen' : ''}">
                <img src="${p.img}" alt="${p.nombre}" class="product-img ${p.cat === 'Almacen' ? 'img-contain' : ''}">
            </div>
            <div class="product-info">
                <div>
                    <h3>${p.nombre}</h3>
                    <span class="price-tag">$${p.precioUnit.toLocaleString('es-AR')}</span>
                </div>
                <div class="controls">
                    <button class="qty-btn" onclick="updateQty(${p.id}, -1)">-</button>
                    <span class="unit-display" id="qty-${p.id}">${qty}</span>
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
    let hayAlgo = false;
    for (let id in carrito) { if (carrito[id] > 0) hayAlgo = true; }
    if (!hayAlgo) return alert("Tu carrito está vacío.");
    document.getElementById('section-productos').style.display = 'none';
    document.getElementById('section-entrega').style.display = 'block';
    window.scrollTo(0,0);
}

function prepararEnvio() {
    metodoSeleccionado = 'Envío a Domicilio';
    document.getElementById('opciones-metodo').style.display = 'none';
    document.getElementById('form-direccion').style.display = 'flex';
}

function obtenerGps() {
    const btn = document.getElementById('btn-obtener-gps');
    const txt = document.getElementById('txt-gps');
    const btnFinal = document.getElementById('btn-enviar-final');
    if (!navigator.geolocation) return alert("Tu GPS no es compatible.");
    txt.innerText = "⌛ Obteniendo tu ubicación...";
    btn.style.animation = "none";
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            ubicacionGps = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
            txt.innerText = "✅ Ubicación capturada";
            btn.style.borderColor = "var(--accent-green)";
            btn.style.color = "var(--accent-green)";
            btnFinal.style.display = "block";
        },
        (err) => {
            txt.innerText = "❌ Error: Activa tu GPS";
            btn.style.animation = "pulse 2s infinite";
            alert("No pudimos obtener tu ubicación.");
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function validarYEnviar() { finalizarPedido(metodoSeleccionado, ubicacionGps); }

function volverAlMenu() {
    document.getElementById('section-productos').style.display = 'block';
    document.getElementById('section-entrega').style.display = 'none';
    document.getElementById('opciones-metodo').style.display = 'flex';
    document.getElementById('form-direccion').style.display = 'none';
    document.getElementById('btn-enviar-final').style.display = 'none';
    document.getElementById('txt-gps').innerText = "Presioná aquí para enviar mi ubicación";
}

function finalizarPedido(metodo, ubi = "") {
    let texto = `🏪 *PEDIDO - EN LO DE OTTO*\n📦 *METODO:* ${metodo}\n`;
    if (ubi !== "") texto += `📍 *MAPA:* ${ubi}\n`;
    texto += `---------------------------------\n\n`;
    productos.forEach(p => {
        if (carrito[p.id] > 0) {
            let sub = carrito[p.id] * p.estPeso * p.precioUnit;
            texto += `✅ *${p.nombre}*\nCant: ${carrito[p.id]}\nSub: *$${sub.toLocaleString('es-AR')}*\n\n`;
        }
    });
    texto += `---------------------------------\n💰 *TOTAL: ${document.getElementById('total-general').innerText}*`;
    window.open(`https://wa.me/543751246552?text=${encodeURIComponent(texto)}`, '_blank');
}

renderizar();
