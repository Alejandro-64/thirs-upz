# 🛍️ Thirs Upz

> Tienda de ropa online desarrollada con Next.js, TypeScript y Tailwind CSS como proyecto de portfolio frontend.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white&style=flat-square)
![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat-square)

---

## 📋 Descripción

Thirs Upz es una tienda de ropa online construida con Next.js. Permite a los usuarios explorar un catálogo de productos de moda, filtrarlos por disponibilidad y precio, ver el detalle de cada producto y gestionarlos en un carrito de compras persistente.

Los productos se consumen desde la API pública [DummyJSON](https://dummyjson.com/), filtrando las categorías de ropa y calzado disponibles.

---

## ✨ Funcionalidades

- **Catálogo de productos** filtrado por categorías de moda y calzado
- **Filtros** por disponibilidad (en stock / sin stock) y orden por precio
- **Paginación** con estado reflejado en la URL via query params
- **Vista de producto** con galería de imágenes y selector de cantidad
- **Carrito de compras** con persistencia en `localStorage`
- **Checkout** con resumen de productos y precio total estimado
- **Páginas** de inicio, tienda, producto, carrito, about y contacto

---

## 🛠️ Tecnologías

| Tecnología                                                | Uso                                              |
| --------------------------------------------------------- | ------------------------------------------------ |
| [Next.js 15](https://nextjs.org/)                         | Framework React con App Router y rutas dinámicas |
| [TypeScript](https://www.typescriptlang.org/)             | Tipado estático                                  |
| [Tailwind CSS v4](https://tailwindcss.com/)               | Estilos con design tokens via CSS variables      |
| [Zustand](https://zustand-demo.pmnd.rs/)                  | Estado global del carrito con persistencia       |
| [DummyJSON](https://dummyjson.com/)                       | API pública de productos                         |
| [React Icons](https://react-icons.github.io/react-icons/) | Iconos                                           |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx           # Layout raíz con Header y Footer
│   ├── page.tsx             # Página de inicio (hero con imágenes)
│   ├── about/page.tsx       # Página about
│   ├── contact/page.tsx     # Página de contacto con formulario
│   ├── shop/
│   │   ├── page.tsx         # Catálogo con filtros y paginación
│   │   └── [id]/page.tsx    # Detalle de producto dinámico
│   └── checkout/page.tsx    # Carrito de compras
├── components/              # Componentes globales reutilizables
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Heading.tsx
│   ├── Link.tsx
│   ├── Logo.tsx
│   ├── Paragraph.tsx
│   └── Section.tsx
├── features/                # Módulos por funcionalidad
│   ├── cart/                # Vista y lógica del carrito
│   ├── email/               # Formulario de contacto
│   ├── filter/              # Filtros y ordenamiento del catálogo
│   ├── footer/              # Footer con navegación y redes sociales
│   ├── header/              # Header con menú lateral y contador de carrito
│   └── products/            # Grid de productos con paginación
├── hooks/
│   └── useFetch.ts          # Hook genérico para fetch con loading y error
├── store/
│   └── cart-store.ts        # Estado del carrito con Zustand persist
├── constants/
│   └── navigation.ts        # Menús de navegación, legales y redes sociales
├── types/
│   └── product-type.ts      # Tipos ProductType y ApiResponse
└── styles/
    └── globals.css          # Design tokens y tipografía
```

---

## ⚙️ Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/thirs-upz.git
cd thirs-upz

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🧠 Decisiones técnicas

**Filtros y paginación via URL** — los filtros de disponibilidad, orden y página se almacenan como query params (`?page=2&sort=mayor`). Esto permite compartir URLs con el estado aplicado y mantener el filtro al navegar hacia atrás.

**`useFetch` genérico** — hook personalizado con tipado genérico `<T>` que maneja los tres estados del ciclo de vida de una petición: `data`, `loading` y `error`. Reutilizado tanto en el listado de productos como en el detalle.

**Selectores derivados en Zustand** — `TOTAL_QUANTITY` y `TOTAL_PRICE` son funciones selectoras definidas fuera del store que calculan valores derivados del carrito, evitando duplicar lógica en los componentes.

**Persistencia del carrito con Zustand `persist`** — el carrito sobrevive recargas de página almacenándose en `localStorage` automáticamente via middleware.

**Tipografía dual** — Quattrocento (serif) como fuente principal para el cuerpo y Space Grotesk (sans-serif) como fuente secundaria, dando un contraste editorial acorde a la estética de la marca.

> **Nota:** el botón de pago en checkout es visual — no procesa pagos reales.
