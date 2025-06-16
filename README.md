# 🎮 VideoGames Challenge - Vue 3 App

Aplicación web desarrollada con **Vue 3 + Composition API** que presenta un catálogo de videojuegos, sistema de favoritos con persistencia en `localStorage`, y un diseño visual inspirado en el estilo **Persona 5**.

## ✨ Funcionalidades

- 🔄 Listado de templates con **scroll infinito**
- 💾 Persistencia de favoritos en `localStorage`
- 🎨 Interfaz visual estilo "Persona 5" con animaciones y diseño responsive
- 🖱️ Cursor personalizado e integración de tipografía única
- 🔗 integración con APIs de videojuegos

## 🛠️ Tecnologías utilizadas

- **Vue 3**
- **Vite**
- **Pinia**
- **Tailwind CSS**
- **Oh Vue Icons**
- **LocalStorage API**
- **Axios**
- **Custom cursor & fonts** (Anton desde Google Fonts, cursores personalizados)

## 📦 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/Tiin24/Videogames-Challenge.git

# Ingresar al proyecto
cd Videogames-Challenge

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🔐 Configuración de variables de entorno

Esta aplicación requiere una **API Key** para conectarse al servicio externo. Para ello, debes crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_API_KEY=tu_api_key_aqui
```

## 🎨 Diseño en Figma

Puedes ver el diseño visual de la aplicación aquí:  
👉 [Diseño en Figma](https://www.figma.com/design/1PQROulz4oWnxc9l32pEN2/Videogames-Challenge?node-id=1-10091&t=MSfiJJyBadTgjjfG-1)

> _Nota: El diseño fue creado para replicar visualmente la estética de la aplicación en producción._

## 📁 Estructura del proyecto

```
src/
├── assets/
├── components/
│ ├── ui/
│ ├── GameCard.vue
│ ├── FilterBar.vue
│ └── ...
├── views/
│ ├── Home.vue
│ └── ...
├── routes/
│ └── index.ts
├── services/
│ └── gameService.ts
├── App.vue
└── main.ts
```

## ✍️ Demo

Puedes probar la aplicación en producción aquí:
👉 https://videogames-challenge.vercel.app

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## ✍️ Autor

Desarrollado por [Isaias Agustin Romero](https://www.linkedin.com/in/isaias-romero//)
