# Playwright DemoBlaze

Projet d'automatisation end-to-end du site [DemoBlaze](https://demoblaze.com) avec Playwright Test, TypeScript et le pattern Page Object Model (POM).

Le scénario principal vérifie le parcours suivant :

1. Ouvrir la page d'accueil.
2. Se connecter.
3. Vérifier que l'utilisateur est connecté.
4. Ouvrir un produit et l'ajouter au panier.
5. Vérifier que le produit est présent dans le panier.
6. Se déconnecter.

## Prérequis

- Node.js installé, de préférence une version LTS récente.
- npm, installé avec Node.js.
- Un accès réseau pour télécharger les navigateurs Playwright et accéder à DemoBlaze.

Vérifier l'installation :

```bash
node --version
npm --version
```

## Installation

Depuis la racine du projet :

```bash
npm install
npx playwright install chromium
```

`npm install` installe les dépendances déclarées dans `package.json`, notamment :

- `@playwright/test` : framework de test et API Playwright.
- `@types/node` : types TypeScript pour Node.js.

La configuration du projet utilise uniquement Chromium. L'installation de `chromium` suffit donc pour exécuter les tests localement.

## Structure du projet

```text
.
├── API/
│   ├── clients/               # Clients API, à utiliser pour les tests HTTP
│   └── models/                # Modèles TypeScript des requêtes et réponses API
├── POM/
│   ├── components/
│   │   └── navbar.component.ts # Actions communes de la barre de navigation
│   ├── cart.page.ts             # Actions et vérifications de la page panier
│   ├── home.page.ts             # Actions de la page d'accueil
│   ├── login.page.ts            # Ouverture et soumission du formulaire de connexion
│   └── product.page.ts          # Ajout d'un produit au panier
├── tests/
│   └── demoblaze/
│       ├── auth.setup.ts             # Création de l'état d'authentification
│       └── login-add-cart-logout.spec.ts # Scénario end-to-end principal
├── auth-state.ts                 # Calcul du chemin de l'état d'authentification
├── playwright.config.ts         # Configuration Playwright
├── reporter.ts                  # Personnalisation du rapport HTML
├── tsconfig.json                # Configuration du contrôle de types TypeScript
├── package.json                 # Dépendances npm du projet
├── package-lock.json             # Versions verrouillées des dépendances
├── playwright-report/            # Rapport HTML et fichiers générés par Playwright
└── test-results/                 # Traces, vidéos et pièces jointes des tests
```

### Gestion de l'authentification

Le fichier [auth-state.ts](auth-state.ts) centralise le calcul du chemin utilisé
pour sauvegarder et relire l'état d'authentification Playwright. Il utilise
`BASE_URL` et extrait son domaine pour produire un fichier spécifique, par
exemple `playwright/.auth/demoblaze.com.json`.

Le projet `setup`, défini dans [auth.setup.ts](tests/demoblaze/auth.setup.ts),
se connecte puis sauvegarde les cookies et les données du navigateur dans ce
fichier. Le projet Chromium, configuré dans
[playwright.config.ts](playwright.config.ts), dépend de ce setup et réutilise
ensuite l'état avec `storageState` pour démarrer directement connecté. Chaque
domaine possède ainsi son propre état de session.

Les fichiers générés dans `playwright/.auth/` peuvent contenir des informations
de session et sont donc exclus du dépôt avec `.gitignore`, au même titre que
`test-results/` et `playwright-report/`.

### Organisation POM

Chaque Page Object reçoit une instance Playwright `Page` et centralise les locators ainsi que les actions métier de la page concernée. Le test décrit le parcours fonctionnel sans manipuler directement les sélecteurs.

Les transitions entre pages sont représentées par les méthodes comme `openProduct()` et `openCart()`, qui retournent le Page Object correspondant.

Les dossiers `API/clients` et `API/models` sont prévus pour ajouter des tests API. Les appels HTTP devront rester dans les clients API et ne pas être effectués directement depuis les tests ou les Page Objects.

## Configuration

La configuration se trouve dans [playwright.config.ts](playwright.config.ts) :

- Répertoire des tests : `tests/`.
- Navigateur : Chromium.
- URL par défaut : `https://demoblaze.com`.
- URL configurable avec la variable d'environnement `BASE_URL`.
- Trace et vidéo générées pour chaque test.
- Screenshot généré en cas d'échec.
- Rapport HTML généré dans `playwright-report/`.

Pour utiliser une autre URL :

```bash
BASE_URL=https://mon-environnement.example.com npx playwright test
```

## Lancer les tests

### Tous les tests

```bash
npx playwright test
```

### Le scénario DemoBlaze

```bash
npx playwright test tests/demoblaze/login-add-cart-logout.spec.ts --project=chromium
```

### En mode navigateur visible

```bash
npx playwright test tests/demoblaze --project=chromium --headed
```

### Avec l'interface Playwright

```bash
npx playwright test --ui
```

### Contrôler les types TypeScript

Le contrôle de types est prévu par `tsconfig.json`, mais le compilateur `typescript` n'est pas encore déclaré dans les dépendances actuelles du projet. Pour l'activer, l'installer une fois :

```bash
npm install --save-dev typescript
npx tsc --noEmit
```

## Consulter le rapport

Après l'exécution des tests, ouvrir le rapport HTML avec :

```bash
npx playwright show-report
```

Le rapport HTML centralise toutes les informations de chaque exécution :

- le statut et les résultats des tests ;
- les screenshots générés, notamment en cas d'échec ;
- les vidéos de chaque test ;
- les traces Playwright détaillées ;
- les pièces jointes et les messages d'erreur associés.

Depuis le rapport, il est possible d'ouvrir les screenshots et les vidéos, puis
de consulter la trace complète d'un test pour analyser les étapes, les actions
et l'état du navigateur.

Pour ouvrir directement la trace d'un test, utiliser :

```bash
npx playwright show-trace test-results/<dossier-du-test>/trace.zip
```

Le nom exact du dossier est généré par Playwright dans `test-results/`.

## Lancer un test avec un serveur MCP actif

Un serveur MCP Playwright peut être utilisé pour piloter ou observer le navigateur depuis l'agent MCP. Il doit être démarré et connecté à VS Code avant de lancer le test.

### Définir le serveur MCP dans VS Code

Créer le fichier `.vscode/mcp.json` à la racine du projet avec la configuration suivante :

```json
{
	"servers": {
		"playwright": {
			"command": "npx",
			"args": ["-y", "@playwright/mcp@latest"]
		}
	}
}
```

Cette configuration demande à VS Code de lancer le serveur Playwright MCP avec `npx`. Le paquet est téléchargé automatiquement par npm lors du premier démarrage ; il n'est pas nécessaire de l'ajouter aux dépendances de `package.json`.

Pour démarrer le serveur :

1. Ouvrir la palette de commandes de VS Code.
2. Exécuter `MCP: List Servers`.
3. Sélectionner `playwright`.
4. Choisir `Start Server`.

Le serveur apparaît ensuite comme actif dans la vue MCP de VS Code. Il peut être arrêté avec `MCP: List Servers` puis `Stop Server`.

Une fois le serveur MCP actif, le test Playwright se lance normalement depuis un second terminal :

```bash
npx playwright test tests/demoblaze/login-clean-cart-logout.spec.ts --project=chromium --headed
```

### Exemple fictif : connexion et nettoyage du panier

L'exemple ci-dessous décrit un parcours complet : connexion, lecture de la liste du panier, suppression de tous les articles présents, screenshot, puis déconnexion. Les méthodes `getProducts()` et `removeProduct()` sont fictives et devront être ajoutées au `CartPage` avant d'utiliser cet exemple dans le projet.

```typescript
import { test } from '@playwright/test';
import { CartPage } from '../../POM/cart.page';
import { HomePage } from '../../POM/home.page';
import { LoginPage } from '../../POM/login.page';

test('se connecte, vide le panier, prend un screenshot et se deconnecte', async ({ page }, testInfo) => {
	const loginPage = new LoginPage(page);
	const homePage = new HomePage(page);

	await page.goto('/index.html');
	await loginPage.open();
	await loginPage.loginAs(
		process.env.DEMOBLAZE_USERNAME ?? 'utilisateur-fictif',
		process.env.DEMOBLAZE_PASSWORD ?? 'mot-de-passe-fictif',
	);
	await homePage.expectLoggedIn();

	const cartPage = await homePage.openCart();
	const products = await cartPage.getProducts();

	for (const product of products) {
		await cartPage.removeProduct(product.name);
	}

	await cartPage.expectEmpty();

	const screenshotPath = testInfo.outputPath('cart-vide.png');
	await page.screenshot({ path: screenshotPath, fullPage: true });
	await testInfo.attach('panier vide', {
		path: screenshotPath,
		contentType: 'image/png',
	});

	await homePage.logout();
	await loginPage.expectLoggedOut();
});
```

Le serveur MCP peut alors être utilisé pour vérifier visuellement l'état du navigateur pendant les étapes du scénario. Les assertions et les actions restent toutefois dans le test et les Page Objects, conformément à l'organisation du projet.

## Ajouter un test

1. Créer un fichier `*.spec.ts` dans `tests/`.
2. Ajouter ou réutiliser un Page Object dans `POM/`.
3. Centraliser les locators et les interactions dans le Page Object.
4. Garder les assertions fonctionnelles dans le test.
5. Utiliser en priorité `getByRole`, `getByLabel` ou `getByPlaceholder`.
6. Vérifier les types et lancer le test ciblé avant de lancer toute la suite.

Exemple de commande pour un nouveau fichier :

```bash
npx playwright test tests/demoblaze/mon-test.spec.ts --project=chromium
```

## Données de connexion

Le scénario actuel utilise les identifiants définis dans le fichier de test. Pour un usage partagé ou en CI, ces valeurs doivent être remplacées par des variables d'environnement afin de ne pas publier de mot de passe dans le dépôt.

Exemple de lancement avec des variables d'environnement :

```bash
DEMOBLAZE_USERNAME=mon-utilisateur DEMOBLAZE_PASSWORD=mon-mot-de-passe npx playwright test
```

Les variables ne seront prises en compte qu'après adaptation du test pour les lire avec `process.env`.

## gif
