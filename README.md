# Gym Reservation

Aplicación Angular para visualizar clases disponibles de gimnasio y simular la reserva de un cupo.

## Tecnologías

- Angular 17.3.12
- Angular CLI 17.3.17
- Angular DevKit Build Angular 17.3.17
- TypeScript 5.4.5
- Standalone components
- Signals
- RxJS 7.8.2
- HttpClient
- Zone.js 0.14.10
- SCSS

## Requisitos

Versión utilizada durante el desarrollo:

- Node.js 19.9.0
- npm 9.6.3

> Nota: Angular informa que Node 19.9.0 no es una versión soportada para producción por no ser LTS. Para un entorno real conviene usar una versión LTS compatible.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run start
```

La aplicación queda disponible en:

```txt
http://localhost:4200
```

La ruta principal redirige a:

```txt
http://localhost:4200/bookings
```

## Build

```bash
npm run build
```

## Testing

El proyecto incluye un test unitario mínimo para `BookingService`.

El test valida:

- Creación del servicio.
- Llamada HTTP `GET /bookings`.
- Respuesta tipada con reservas.
- Propagación de errores HTTP.

Para ejecutar los tests:

```bash
npm run test
```

## Arquitectura

La aplicación usa standalone components y una estructura simple separada por responsabilidad:

```txt
src/app/
  components/
    booking-list/
    booking-detail/
  interceptors/
    mock-bookings.interceptor.ts
  models/
    booking.model.ts
  pages/
    booking-page/
  services/
    booking.service.ts
  app.routes.ts
  app.config.ts
```

## Routing y lazy loading

El proyecto usa routing configurado manualmente en `app.routes.ts`.

La ruta `/bookings` carga `BookingPageComponent` con lazy loading mediante `loadComponent`.

`AppComponent` funciona como layout general y contiene el `router-outlet`.

## Componentes

`BookingPageComponent` es la página contenedora de la feature. Sus responsabilidades son:

- Cargar las reservas.
- Manejar estados con signals.
- Coordinar listado y detalle.
- Resolver la selección de una clase.
- Resolver la reserva simulada.

`BookingListComponent` es presentacional:

- Recibe reservas por `@Input()`.
- Muestra las tarjetas.
- Emite la clase seleccionada con `@Output()`.

`BookingDetailComponent` es presentacional:

- Recibe la clase seleccionada por `@Input()`.
- Muestra el detalle.
- Emite la acción de reservar con `@Output()`.

## Estado de UI

La pantalla contempla:

- Loading: mientras se cargan las reservas.
- Error: si falla la llamada HTTP.
- Empty state: si no hay clases disponibles.
- Success: cuando se confirma una reserva simulada.
- Al reservar una clase, se descuenta un cupo disponible en memoria.
- Una clase ya reservada queda deshabilitada para evitar una segunda reserva del mismo usuario.

## Simulación de API

`BookingService` consume el endpoint:

```txt
GET /bookings
```

La respuesta se simula con `mockBookingsInterceptor`, que intercepta esa llamada y devuelve datos mockeados de tipo `IntBooking[]`.

La lógica de datos se mantiene fuera de los componentes presentacionales.
