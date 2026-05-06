# Context - Resultados de Fútbol EN VIVO

## Descripción del Proyecto

Sitio web para ver resultados de fútbol en vivo, inspirado en promiedos.com.ar (pero sin publicidad y más estable).

### Objetivo
Crear una página de uso personal/familiar para ver resultados de fútbol en tiempo real, reemplazando a promiedos.com.ar que ha empeorado tras cambio de dueño.

## Funcionalidades Deseadas

### Página Principal
- Mostrar partidos del día actual
- Partidos ordenados de más temprano a más tarde (de arriba a abajo)
- Incluir: partidos ya jugados, en curso y pendientes
- Actualización en tiempo real
- En cada partido mostrar debajo una franja con los goles (quién y a qué minuto)
- Al pulsar un partido: abrir nueva ventana con ficha del partido (formaciones, amonestados, goles, estadísticas)

### Ligas y Competencias
- Primera División Argentina
- Liga Española (1ª División)
- UEFA Champions League
- UEFA Europa League
- Premier League (Inglaterra)
- Serie A (Italia)
- Bundesliga (Alemania)

### Navegación Lateral
- Menú izquierdo con lista de ligas/competencias
- Al hacer click en una liga:
  - **Tabla de posiciones**
  - **Fixture completo** con navegación entre fechas (flechas, de la 1ª a la última fecha)
  - **Goleadores**
  - **Asistidores**
  - **Amarillas**

## Stack Tecnológico

### Backend
- **Framework:** NestJS
- **Base de datos:** SQLite (archivo en `backend/database/database.sqlite`)
- **ORM:** TypeORM
- **Puerto:** 3000 (default)

### Frontend
- **Framework:** React (con Vite)
- **Actualización:** Polling (consulta endpoints cada X segundos)

### Fuente de Datos
- **API:** API-Football (v3)
- **Límite:** 100 solicitudes por día
- **Estrategia:** Uso estratégico para optimizar solicitudes (caché de datos, actualizaciones programadas según la frecuencia de partidos)
- **Método de integración:** El backend consultará la API externa y servirá los datos al frontend vía endpoints propios

## Modelo de Datos (Entidades y Relaciones)

### Entidades
- **Liga** - Ligas y competencias (nombre, país, logo, id_api)
- **Equipo** - Equipos participantes (nombre, logo, liga_id, id_api)
- **Jugador** - Jugadores (nombre, foto, equipo_id, id_api)
- **Partido** - Encuentros (fecha, hora, estado, goles_local, goles_visitante, liga_id, equipo_local_id, equipo_visitante_id, id_api)
- **Gol** - Goles (jugador_id, partido_id, minuto, equipo_id)
- **Tarjeta** - Tarjetas (jugador_id, partido_id, minuto, tipo, equipo_id)
- **Formación** - Alineaciones (partido_id, equipo_id, formación, titulares, suplentes)
- **Estadística** - Estadísticas del partido (partido_id, posesión_local, posesión_visitante, tiros, faltas, etc.)
- **TablaPosición** - Tabla de posiciones por liga (liga_id, equipo_id, puntos, pj, g, e, p, gf, gc)
- **Goleador** - Tabla de goleadores por liga (liga_id, jugador_id, goles)
- **Asistidor** - Tabla de asistidores por liga (liga_id, jugador_id, asistencias)
- **Amarilla** - Tabla de amonestados por liga (liga_id, jugador_id, cantidad)

### Relaciones
- `Liga` 1:N `Equipo`, `Partido`, `TablaPosición`, `Goleador`, `Asistidor`, `Amarilla`
- `Equipo` 1:N `Jugador`, `Partido` (local/visitante), `TablaPosición`, `Goleador`, `Asistidor`, `Amarilla`
- `Jugador` 1:N `Gol`, `Tarjeta`, `Goleador`, `Asistidor`, `Amarilla`
- `Partido` 1:N `Gol`, `Tarjeta`, `Estadística`, `Formación`

## Endpoints Planeados
- `GET /api/partidos/hoy` - Partidos del día actual, ordenados por hora
- `GET /api/ligas` - Lista de ligas disponibles
- `GET /api/ligas/:id/tabla` - Tabla de posiciones de una liga
- `GET /api/ligas/:id/fixture?fecha=X` - Fixture por fecha de una liga
- `GET /api/ligas/:id/goleadores` - Goleadores de una liga
- `GET /api/ligas/:id/asistidores` - Asistidores de una liga
- `GET /api/ligas/:id/amarillas` - Amonestados de una liga
- `GET /api/partidos/:id` - Ficha completa de un partido (formaciones, goles, tarjetas, estadísticas)
- `POST /api/partidos` - Crear partido (pruebas/carga manual)
- `PUT /api/partidos/:id` - Actualizar partido
- `DELETE /api/partidos/:id` - Eliminar partido

### Estructura Actual
```
E:\Github\Resultados de futbol EN VIVO\
├── backend/
│   ├── src/
│   │   ├── app.module.ts (configuración TypeORM SQLite)
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── ligas/
│   │   │   ├── ligas.module.ts
│   │   │   ├── ligas.service.ts
│   │   │   ├── ligas.controller.ts
│   │   │   └── liga.entity.ts
│   │   ├── equipos/
│   │   │   ├── equipos.module.ts
│   │   │   ├── equipos.service.ts
│   │   │   ├── equipos.controller.ts
│   │   │   └── equipo.entity.ts
│   │   ├── jugadores/
│   │   │   ├── jugadores.module.ts
│   │   │   ├── jugadores.service.ts
│   │   │   ├── jugadores.controller.ts
│   │   │   └── jugador.entity.ts
│   │   ├── partidos/
│   │   │   ├── partidos.module.ts
│   │   │   ├── partidos.service.ts
│   │   │   ├── partidos.controller.ts
│   │   │   └── partido.entity.ts
│   │   ├── goles/
│   │   │   ├── goles.module.ts
│   │   │   ├── goles.service.ts
│   │   │   ├── goles.controller.ts
│   │   │   └── gol.entity.ts
│   │   ├── tarjetas/
│   │   │   ├── tarjetas.module.ts
│   │   │   ├── tarjetas.service.ts
│   │   │   ├── tarjetas.controller.ts
│   │   │   └── tarjeta.entity.ts
│   │   ├── formaciones/
│   │   │   ├── formaciones.module.ts
│   │   │   ├── formaciones.service.ts
│   │   │   ├── formaciones.controller.ts
│   │   │   └── formacion.entity.ts
│   │   ├── estadisticas/
│   │   │   ├── estadisticas.module.ts
│   │   │   ├── estadisticas.service.ts
│   │   │   ├── estadisticas.controller.ts
│   │   │   └── estadistica.entity.ts
│   │   ├── tabla-posicion/
│   │   │   ├── tabla-posicion.module.ts
│   │   │   ├── tabla-posicion.service.ts
│   │   │   ├── tabla-posicion.controller.ts
│   │   │   └── tabla-posicion.entity.ts
│   │   ├── goleadores/
│   │   │   ├── goleadores.module.ts
│   │   │   ├── goleadores.service.ts
│   │   │   ├── goleadores.controller.ts
│   │   │   └── goleador.entity.ts
│   │   ├── asistidores/
│   │   │   ├── asistidores.module.ts
│   │   │   ├── asistidores.service.ts
│   │   │   ├── asistidores.controller.ts
│   │   │   └── asistidor.entity.ts
│   │   └── amarillas/
│   │       ├── amarillas.module.ts
│   │       ├── amarillas.service.ts
│   │       ├── amarillas.controller.ts
│   │       └── amarilla.entity.ts
│   └── database/
│       └── database.sqlite
├── frontend/
│   ├── src/
│   │   ├── App.jsx (home con partidos del día y Sidebar)
│   │   ├── main.jsx (React Router configurado)
│   │   ├── components/
│   │   │   ├── Sidebar.jsx (menú lateral con ligas)
│   │   │   ├── Sidebar.css
│   │   │   ├── PartidoDetail.jsx (ficha completa del partido)
│   │   │   ├── PartidoDetail.css
│   │   │   ├── LigaDetail.jsx (pestañas: tabla, fixture, goleadores, etc.)
│   │   │   └── LigaDetail.css
│   │   ├── services/
│   │   │   └── partidosService.js (servicio para consumir API)
│   │   ├── App.css
│   │   └── index.css
│   ├── vite.config.js (proxy a localhost:3000)
│   └── package.json
└── context.md
```

## Comandos Útiles
### Backend
- `npm run start:dev` - Inicia el servidor en modo desarrollo
- `nest generate module <nombre>` - Crea un módulo
- `nest generate service <nombre>` - Crea un servicio
- `nest generate controller <nombre>` - Crea un controlador

### Frontend
- `npm run dev` - Inicia Vite en modo desarrollo (puerto 5173)
- `npm run build` - Construye para producción

## Repositorio
- **GitHub:** https://github.com/alanfoa/ResultadosDeFutbol
- **Estado:** Código subido a la rama `main`

## Estado Actual
### Backend (NestJS + TypeORM + SQLite)
- ✅ Proyecto NestJS creado
- ✅ TypeORM configurado con SQLite (`backend/database/database.sqlite`)
- ✅ Stack definido (React + API-Football v3 + Polling)
- ✅ Modelo de datos definido (12 entidades con relaciones)
- ✅ Endpoints planeados (CRUD completo)
- ✅ 12 entidades creadas:
  - `Liga`, `Equipo`, `Jugador`, `Partido`, `Gol`, `Tarjeta`
  - `Formación`, `Estadística`, `TablaPosición`, `Goleador`, `Asistidor`, `Amarilla`
- ✅ Módulos, servicios y controladores generados para todas las entidades
- ✅ Endpoints CRUD implementados en todos los controladores
- ✅ Servidor iniciado, tablas creadas en base de datos

### Frontend (React + Vite)
- ✅ Proyecto React + Vite creado en `/frontend`
- ✅ Proxy configurado en Vite para comunicación con backend (localhost:3000)
- ✅ React Router instalado y configurado (`main.jsx`)
- ✅ Servicio `partidosService.js` creado para consumir API
- ✅ Componentes creados:
  - `App.jsx`: Home con partidos del día, franja de goles, polling cada 30s
  - `Sidebar.jsx`: Menú lateral con ligas, navegación a `/liga/:id`
  - `PartidoDetail.jsx`: Ficha completa del partido (formaciones, goles, tarjetas, estadísticas)
  - `LigaDetail.jsx`: Pestañas para Tabla, Fixture, Goleadores, Asistidores, Amarillas
- ✅ Estilos creados: `App.css`, `Sidebar.css`, `PartidoDetail.css`, `LigaDetail.css`

### Repositorio
- ✅ GitHub inicializado: https://github.com/alanfoa/ResultadosDeFutbol
- ✅ Código subido a la rama `main` (múltiples commits)

### Pendiente
- ⏳ Fixture con navegación por fechas (flechas, de la 1ª a la última fecha)
- ⏳ Integración con API-Football v3 (estrategia para 100 solicitudes/día)
- ⏳ Carga inicial de ligas, equipos y partidos desde API-Football
