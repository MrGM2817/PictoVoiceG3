# React + Vite
## Estructura del Proyecto
<pre> ``` prueba1/               <-- carpeta raíz del proyecto
├── node_modules/      <-- dependencias instaladas
├── public/            <-- archivos estáticos, index.html, etc.
│   └── vite.svg
├── src/               <-- código fuente
│   ├── assets/        <-- imágenes, MP3, SVG, etc.
│   ├── components/    <-- componentes reutilizables
│   │   ├── BottomNav.jsx         <-- barra de navegación inferior
│   │   ├── NavItem.jsx           <-- ítem individual del menú de navegación
│   │   ├── SidebarSettings.jsx   <-- sidebar o panel lateral de configuración
│   │   ├── UnavailableToast.jsx  <-- notificación/alerta si algo no está disponible
│   │   ├── WordCard.jsx          <-- componente para mostrar tarjetas de palabras
│   │   ├── ImageCard.jsx         <-- componente para mostrar imágenes con overlays dinámicos
│   │   ├── GameCompletedScreen.jsx     <-- componente para mostrar pantalla de juego completado
│   │   └── ConfirmationModal.jsx         <-- componente modal para confirmar si el usuario desea omitir el juego
│   │   ├── AchievementUnlockedModal.jsx  <-- modal para notificar logro desbloqueado
│   │   ├── achievements.js            <-- componente para manejar logros 
│   │   └── completeGame.js            <-- componente para manejar estado de juegos completados 
│   ├── pages/         <-- pantallas principales (rutas de la app)
│   │   ├── InicioPage.jsx        <-- pantalla de bienvenida con botón "EMPEZAR"
│   │   ├── HomePage.jsx          <-- pantalla principal con estadísticas y acceso a juegos
│   │   ├── GamesPage.jsx         <-- pantalla de listado de juegos
│   │   └── AssociateGame2.jsx    <-- juego 2: asociación palabra - imagen (actualizado con componentes nuevos)
│   │   └── ListenConnectGame3.jsx <-- juego 3: escuccha - conecta 
│   │   └── DragFormGame1.jsx       <-- juego 1: arrastra - froma oraciones 
│   ├── App.jsx         <-- configuración de rutas y estructura general de la app
│   ├── main.jsx        <-- punto de entrada que monta la aplicación en el DOM
│   ├── index.css       <-- estilos globales (fuentes, colores base, etc.)
│   └── App.css         <-- estilos particulares del componente App (opcional)
├── .gitignore          <-- archivos y carpetas que git debe ignorar
├── package.json        <-- configuración y dependencias del proyecto
├── vite.config.js      <-- configuración de Vite para el entorno de desarrollo
└── README.md           <-- documentación general del proyecto

 ``` </pre>

