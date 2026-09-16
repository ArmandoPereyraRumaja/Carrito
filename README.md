# Chistes DS-I y Carrito de Compras

Trabajo del curso **Desarrollo de Software I** — Escuela Profesional de Ingeniería de Sistemas, Facultad de Ingeniería y Arquitectura, Universidad Andina del Cusco. Semestre 2026-II. Docente: Felix Enrique Huaman Ataulluco.

Dos páginas web estáticas hechas con HTML, CSS y JavaScript puro, usando Materialize como framework de estilos y SweetAlert2 para los modales.

## Contenido

| Página | Archivo | Descripción |
|---|---|---|
| Portal de Chistes | `chistes.html` | Muestra los chistes aportados por el salón. Al presionar *Analizar* se revela el remate y su autor. El ícono de información muestra el conteo por estudiante. |
| Carrito de Compras | `CarritoCompras.html` | Tienda con inventario en memoria. Permite agregar y quitar productos, ver subtotales y cerrar la compra descontando el stock. |

## Estructura

```
.
├── chistes.html
├── CarritoCompras.html
├── README.md
├── .gitignore
└── Vista/
    ├── css/
    │   ├── estilochistes.css
    │   ├── estilocompras.css
    │   └── materialize.min.css
    ├── js/
    │   ├── chistes.js
    │   ├── compras.js
    │   ├── jquery-3.2.1.min.js
    │   ├── jquery-3.6.1.min.js
    │   ├── materialize.js
    │   └── materialize.min.js
    ├── fonts/
    │   └── roboto/
    └── img/
```

Las fuentes Roboto van en `Vista/fonts/roboto/` porque Materialize las busca en una ruta relativa al archivo CSS (`../fonts/roboto/`). Si se mueven a otra carpeta, la tipografía cae al fallback del navegador.

## Cómo ejecutarlo

No requiere compilación ni servidor. Basta con abrir `chistes.html` o `CarritoCompras.html` en el navegador.

Si se prefiere servirlo localmente:

```bash
python3 -m http.server 8000
```

Y entrar a `http://localhost:8000/chistes.html`.

## Dependencias externas

Estas dos se cargan desde internet, así que ambas páginas necesitan conexión para verse completas:

- **Material Icons** (Google Fonts)
- **SweetAlert2 v11** (jsDelivr)

Materialize, jQuery y Roboto están incluidos localmente en el repositorio.

## Créditos de terceros

- [Materialize CSS](https://materializecss.com/) — licencia MIT
- [jQuery](https://jquery.com/) — licencia MIT
- [SweetAlert2](https://sweetalert2.github.io/) — licencia MIT
- Roboto — Apache License 2.0

## Autores

- Bastian Nefi Quipo Mamani
- Sullca Caballero Jean Pol
- Gianfranco Maximiliano Quispe Pinto
- Frank Puma Ucharo
- Quispe Cusihuaman Sebastian Cristian
- Pereyra Rumaja Armando
- Araoz Tapia Sebastian Joaquin
- Edmundo Yabar Yepez
- Chino Hilares Shanne Alison
