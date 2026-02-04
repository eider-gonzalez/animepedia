# 🎌 Animepedia

Animepedia es una aplicación web para explorar información detallada de animes, combinando datos de **AniList** (metadatos del anime) y **Kitsu** (información completa de episodios) en una interfaz moderna, rápida y responsive.

Construida como proyecto personal para aplicar buenas prácticas reales de arquitectura frontend con **Next.js + TypeScript**.

---

## ✨ Features

- 🔎 Búsqueda de animes en tiempo real
- 📈 Animes en tendencia
- 🌸 Animes de la temporada actual calculada dinámicamente
- ⭐ Anime destacado por popularidad
- 📄 Página de detalle ultra completa
- 📺 Listado completo de episodios vía Kitsu (con paginación real)
- ⚡ Manejo de cache y estado del servidor con React Query
- 🎨 UI moderna con Tailwind + shadcn/ui
- 📱 Totalmente responsive

---

## 🧰 Stack Tecnológico

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Query**
- **AniList GraphQL API**
- **Kitsu REST API**

---

## 🧠 Arquitectura del proyecto

```text
src/
├─ app/         → rutas y páginas
├─ components/  → UI reutilizable
├─ hooks/       → lógica con React Query
├─ lib/
│  ├─ api.ts     → configuración central de APIs
│  ├─ anilist.ts → capa de acceso a AniList
│  └─ kitsu.ts   → capa de acceso a Kitsu
└─ types/       → tipados globales
```

---

## 🚀 Instalación

Clona el repositorio e instala dependencias:

```bash
git clone https://github.com/eider-gonzalez/animepedia.git
cd animepedia
npm install
```

---

## 🔑 Variables de entorno

Crea un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_ANILIST_API=https://graphql.anilist.co
NEXT_PUBLIC_KITSU_API=https://kitsu.io/api/edge
```

---

## ▶️ Ejecutar en desarrollo

```bash
npm run dev
```

Abre en tu navegador:

```
http://localhost:3000
```

---

## 🧪 Cómo usar la app

1. Explora los animes en tendencia.
2. Revisa los animes de la temporada actual.
3. Busca cualquier anime por nombre.
4. Entra al detalle para ver información completa y episodios.

---

## 📌 Objetivo del proyecto

Este proyecto fue creado como práctica personal para aplicar:

- Arquitectura limpia en frontend
- Manejo correcto de APIs externas
- Buenas prácticas con React Query
- Organización profesional de carpetas
- Tipado fuerte con TypeScript
- Diseño moderno con shadcn/ui

---

## 📝 Licencia

MIT
