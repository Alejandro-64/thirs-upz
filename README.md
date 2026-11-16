# Thirs Upz

> Tienda de ropa online desarrollada con Next.js, TypeScript y Tailwind CSS como proyecto de portfolio.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white&style=flat-square)
![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat-square)
![Vitest](https://img.shields.io/badge/Vitest-4-6e9f18?logo=vitest&logoColor=white&style=flat-square)

<!-- Activar cuando exista la demo desplegada:
**Demo:** https://enlace-de-la-demo
-->

---

## Descripción

Thirs Upz es una tienda de ropa online construida con Next.js. Permite a los usuarios explorar un catálogo de productos de moda, filtrarlos por disponibilidad y precio, ver el detalle de cada producto y gestionarlos en un carrito de compras persistente.

Los productos se consumen desde la API pública [DummyJSON](https://dummyjson.com/), filtrando las categorías de ropa y calzado disponibles. El proyecto no tiene backend propio: los datos se piden desde el servidor de Next.js y el carrito vive en el navegador.

<!-- Activar cuando haya capturas en el repositorio:
## Capturas

![Catálogo](docs/shop.png)
![Detalle de producto](docs/product.png)
-->

---

## Funcionalidades

- **Catálogo de productos** filtrado por categorías de moda y calzado
- **Filtros** por disponibilidad (en stock / sin stock) y orden por precio
- **Paginación** con estado reflejado en la URL via query params
- **Vista de producto** con galería de imágenes y selector de cantidad
- **Carrito de compras** con persistencia en `localStorage` y tope de 10 unidades por producto
- **Checkout** con resumen de productos y precio total estimado
- **Estados de carga y de error** en el catálogo y en el detalle
- **Suscripción al newsletter** con validación de correo (demostración, no guarda datos)
- **Páginas** de inicio, tienda, producto, carrito, about y contacto

---

## Tecnologías

| Tecnología                                                | Uso                                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| [Next.js 16](https://nextjs.org/)                         | App Router, Server Components y rutas dinámicas                      |
| [React 19](https://react.dev/)                            | Suspense, hook `use` y React Compiler                                |
| [TypeScript](https://www.typescriptlang.org/)             | Tipado estático                                                      |
| [Tailwind CSS v4](https://tailwindcss.com/)               | Estilos con design tokens via CSS variables                          |
| [Zustand](https://zustand-demo.pmnd.rs/)                  | Estado global del carrito con persistencia                           |
| [DummyJSON](https://dummyjson.com/)                       | API pública de productos                                             |
| [React Icons](https://react-icons.github.io/react-icons/) | Iconos                                                               |
| [Vitest](https://vitest.dev/)                             | Tests del carrito, del servicio de datos y de la lista de productos  |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx           # Layout raíz con Header y Footer
│   ├── page.tsx             # Página de inicio (hero con imagen animada)
│   ├── about/page.tsx       # Página about
│   ├── contact/page.tsx     # Página de contacto con suscripción al newsletter
│   ├── shop/
│   │   ├── page.tsx         # Catálogo: pide los productos en el servidor
│   │   ├── error.tsx        # Estado de error del catálogo
│   │   └── [id]/
│   │       ├── page.tsx     # Detalle de producto (Server Component)
│   │       ├── loading.tsx  # Estado de carga del detalle
│   │       └── error.tsx    # Estado de error del detalle
│   └── checkout/page.tsx    # Carrito de compras
├── components/              # Componentes globales reutilizables
├── features/                # Módulos por funcionalidad
│   ├── cart/                # Vista del carrito
│   ├── email/               # Suscripción al newsletter (demo)
│   ├── filter/              # Filtros y ordenamiento del catálogo
│   ├── footer/              # Footer con navegación y redes sociales
│   ├── header/              # Header con menú lateral y contador de carrito
│   ├── products/            # Lista, detalle y lógica de filtrado y paginado
│   │   ├── Products.tsx     # Lista con paginación (lee la URL y dibuja)
│   │   ├── ProductDetail.tsx
│   │   └── product-list.ts  # Filtrar, ordenar y paginar (función pura, con tests)
│   └── shop/                # Composición de la tienda (filtros + lista)
├── services/
│   └── http.ts              # Capa de acceso a la API (getClothingProducts, getProductById)
├── store/
│   └── cart-store.ts        # Estado del carrito con Zustand persist
├── constants/
│   ├── cart.ts              # Límites de cantidad por producto
│   ├── navigation.ts        # Menús de navegación, legales y redes sociales
│   └── products.ts          # Categorías de ropa que se muestran
├── types/
│   └── product-type.ts      # Tipos ProductType y ApiResponse
└── styles/
    └── globals.css          # Design tokens y tipografía
```

Los tests (`*.test.ts`) viven junto al código que prueban.

---

## Instalación y uso

Requiere Node.js 20.9 o superior.

```bash
# Clonar el repositorio
git clone https://github.com/Alejandro-64/thirs-upz.git
cd thirs-upz

# Instalar dependencias
npm install

# Crear el archivo de variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Variables de entorno

| Variable              | Descripción                                    | Valor de ejemplo                   |
| --------------------- | ---------------------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_URL_API` | URL base de la API de productos (sin consulta) | `https://dummyjson.com/products`   |

Sin esta variable la aplicación lanza un error al arrancar. El archivo `.env.example` trae el valor de ejemplo.

### Scripts

| Comando         | Qué hace                                  |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Servidor de desarrollo                    |
| `npm run build` | Compilación de producción                 |
| `npm start`     | Sirve la compilación de producción        |
| `npm run lint`  | Revisa el código con ESLint               |
| `npm test`      | Corre los tests con Vitest                |

<!-- Activar cuando se midan los resultados de Lighthouse:
## Lighthouse

| Métrica        | Antes | Después |
| -------------- | ----- | ------- |
| Rendimiento    |       |         |
| Accesibilidad  |       |         |
| Buenas prácticas |     |         |
| SEO            |       |         |
-->

---

## Decisiones técnicas

**Capa de servicios y datos pedidos en el servidor** — `services/http.ts` concentra el acceso a la API: un helper genérico `http<T>` que lanza un error si la respuesta no es correcta, y las funciones `getClothingProducts` y `getProductById`. Las páginas son Server Components, así que la URL de la API no se repite en los componentes y las respuestas se cachean una hora (`revalidate`).

**Solo viajan las prendas al navegador** — la API devuelve todo el catálogo (unos 190 productos, incluyendo belleza y comestibles). `getClothingProducts` filtra en el servidor las categorías definidas en `constants/products.ts`, así que al cliente solo llegan los productos que se muestran.

**Carga y error con Suspense y `error.tsx`** — el catálogo crea la promesa en el servidor y el componente cliente la lee con `use()` dentro de un `<Suspense>`, que muestra el estado de carga. Si la petición falla, el `error.tsx` de la ruta muestra el mensaje. Así no hace falta manejar `loading` y `error` a mano en cada componente.

**Filtros y paginación via URL** — los filtros de disponibilidad, orden y página se almacenan como query params (`?page=2&sort=mayor`). Esto permite compartir URLs con el estado aplicado y mantener el filtro al navegar hacia atrás. Una página inválida (negativa, decimal o fuera de rango) vuelve a la primera.

**Filtrar, ordenar y paginar como función pura** — `product-list.ts` recibe los productos y las opciones y devuelve el total, el número de páginas y los productos de la página actual. Al no depender de React ni de la URL, se prueba con tests sencillos (`product-list.test.ts`), y el componente `Products` se queda con leer la URL y dibujar.

**El límite de cantidad vive en el store** — el tope de 10 unidades por producto se aplica dentro de `cart-store.ts` (constantes en `constants/cart.ts`), no en los botones. Así se respeta aunque la interfaz cambie, y el store tiene tests para ello.

**Selectores derivados en Zustand** — `TOTAL_QUANTITY` y `TOTAL_PRICE` son funciones selectoras definidas fuera del store que calculan valores derivados del carrito, evitando duplicar lógica en los componentes.

**Persistencia del carrito con Zustand `persist`** — el carrito sobrevive recargas de página almacenándose en `localStorage` automáticamente via middleware.

**Tipografía dual** — Quattrocento (serif) como fuente principal para el cuerpo y Space Grotesk (sans-serif) como fuente secundaria, dando un contraste editorial acorde a la estética de la marca.

> **Nota:** esto es una demostración. El botón de pago en checkout es visual y no procesa pagos reales, la suscripción al newsletter no guarda ningún dato y el proyecto no tiene backend propio.
