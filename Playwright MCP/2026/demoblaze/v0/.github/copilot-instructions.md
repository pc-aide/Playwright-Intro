# Instructions Playwright

## Objectif

Ce projet utilise Playwright Test avec TypeScript et le pattern Page Object Model (POM).
Toute nouvelle automatisation doit respecter les conventions ci-dessous.

## Nomenclature

- Fichiers de test : `<feature>.spec.ts`, en minuscules avec des tirets si nécessaire.
- Fichiers Page Object : `<page-name>.page.ts`, en minuscules avec des tirets.
- Classes Page Object : `PascalCase`, suffixées par `Page` : `LoginPage`, `DashboardPage`.
- Méthodes publiques : `camelCase` et orientées métier : `loginAs`, `submitLogin`, `expectLoggedIn`.
- Locators privés : `camelCase`, suffixés par `Button`, `Input`, `Link` ou `Heading` lorsque cela apporte de la précision.
- Tests : phrases lisibles avec `test.describe` pour le périmètre et `test` pour le comportement vérifié.
- Variables, paramètres et fonctions : `camelCase`; constantes globales : `UPPER_SNAKE_CASE` uniquement lorsqu'elles sont réellement constantes.
- Un fichier ne doit contenir qu'un Page Object principal ou une suite de tests principale.

## Priorité des sélecteurs

Utiliser les sélecteurs dans cet ordre de préférence :

1. `getByRole` avec un nom accessible.
2. `getByLabel` pour les champs associés à un label.
3. `getByPlaceholder` lorsque le placeholder est contractuel et stable.
4. `getByText` pour du texte utilisateur stable et non ambigu.
5. `getByTestId` avec un attribut `data-testid` réservé aux éléments sans sémantique accessible suffisante.
6. Sélecteurs CSS ou XPath uniquement en dernier recours, lorsqu'aucune option sémantique ou test id n'est fiable.

Règles complémentaires :

- Ne pas utiliser de sélecteurs dépendant de classes CSS de présentation, de styles, de position ou de texte technique.
- Préférer un locator strict et spécifique; filtrer avec `filter({ hasText })` ou `filter({ has })` si nécessaire.
- Ne pas ajouter de `waitForTimeout`; attendre une assertion, une navigation ou un état observable.
- Centraliser les locators et les interactions dans le Page Object, pas dans les tests.
- Les assertions restent dans les tests, sauf les assertions réutilisables qui décrivent clairement un état propre à une page.

## Page Object Model

- Les Page Objects vivent dans `POM/`.
- Les tests vivent dans `tests/` et importent les Page Objects au lieu de manipuler directement leurs sélecteurs.
- Chaque Page Object reçoit une instance `Page` dans son constructeur.
- Encapsuler les détails de navigation et les actions réutilisables dans des méthodes métier.
- Retourner le Page Object suivant lorsqu'une action entraîne une navigation vers une autre page.
- Garder les Page Objects cohérents, courts et focalisés sur une page ou une responsabilité.

Structure attendue :

```text
.
├── POM/
│   ├── login.page.ts
│   └── dashboard.page.ts
├── tests/
│   └── login.spec.ts
├── playwright.config.ts
└── tsconfig.json
```

## Configuration et exécution

- Utiliser `playwright.config.ts` comme source de vérité.
- Le navigateur par défaut est Chromium; ajouter un projet uniquement si le besoin est démontré.
- L'URL de base vient de `BASE_URL`, avec la valeur locale définie dans la configuration.
- Les traces et vidéos sont toujours générées pour chaque test, y compris en cas de succès (`trace: 'on'` et `video: 'on'`).
- Pour afficher un screenshot dans le rapport HTML, l'enregistrer puis l'attacher avec `testInfo.attach()` et le type `image/png`.
- Commandes attendues : `npm test`, `npm run test:headed`, `npm run test:ui` et `npm run test:report`.
- Vérifier les types avec `npm run typecheck` avant de considérer une modification terminée.

## Normes API

- Les clients et méthodes API vivent dans `API/clients/`, séparés des Page Objects UI.
- Les fichiers client suivent le format `<resource>.api.ts` : `auth.api.ts`, `cart.api.ts`.
- Les classes client suivent le format `PascalCaseApi` : `AuthApi`, `CartApi`.
- Les modèles suivent le format `<resource>.model.ts` et utilisent des interfaces ou types explicites.
- Un client API doit rester focalisé sur une ressource ou un domaine fonctionnel.
- Les méthodes publiques d'un client décrivent une intention métier : `getCart`, `createUser`, `deleteProduct`.
- Ne pas appeler `request.get`, `request.post` ou une autre méthode HTTP directement dans un test; passer par un client API.
- Les Page Objects dans `POM/` ne doivent pas appeler directement les endpoints API.
- Les modèles de requêtes et réponses partagés vivent dans `API/models/` lorsque leur réutilisation le justifie.
- Utiliser `APIRequestContext` de Playwright pour les appels HTTP et vérifier les statuts avec `expect(response).toBeOK()` ou une assertion équivalente.
- Vérifier également les données importantes de la réponse, pas uniquement le code HTTP.
- Centraliser les URLs d'endpoint, headers communs et l'authentification dans les clients API.
- Utiliser `BASE_URL` ou une variable dédiée comme `API_BASE_URL`; ne pas coder une URL d'environnement dans un test.
- Ne jamais écrire de token, mot de passe ou secret directement dans un test; utiliser des variables d'environnement.
- Les tests API vivent dans `tests/<domaine>/api/` et les parcours UI dans `tests/<domaine>/ui/` lorsque les deux types de tests coexistent.
- Un scénario end-to-end peut combiner un client API et des Page Objects, mais chaque couche doit rester responsable de son propre comportement.

Structure recommandée pour un domaine :

```text
.
├── API/
│   ├── clients/
│   │   ├── auth.api.ts
│   │   └── cart.api.ts
│   └── models/
├── POM/
│   ├── components/
│   ├── home.page.ts
│   └── login.page.ts
└── tests/
    └── demoblaze/
        ├── api/
        ├── ui/
        └── e2e/
```
