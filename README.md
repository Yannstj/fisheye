# Fisheye

## Installation

```bash
npm install
```

## Compilation (TypeScript + Sass)

```bash
task dev
```

Lance la compilation en watch de `src/**/*.ts` vers `dist/` et de `src/styles/*.scss` vers `dist/`.

## Tests

```bash
task test
```

## Lint

```bash
npm run lint
```

Compile le TypeScript puis lance ESLint (config par défaut) sur le JS généré dans `dist/`.
`typescript-eslint` ne supporte pas encore TypeScript 7, d'où le lint du JS compilé.

## Démarrer le projet

Servir le dossier à la racine via un serveur local (requis pour le `fetch` des données JSON) :
Puis ouvrir `index.html` depuis l'URL affichée.
