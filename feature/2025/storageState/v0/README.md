# storageState

---

## diagram
<img src="https://i.imgur.com/KE2jUtA.jpeg">

---

## Table
| Fichier | Rôle | Description |
| :--- | :--- | :--- |
| `playwright.config.ts` | **Configuration Principale** | Définit la dépendance (`dependencies: ['setup']`) et le chemin du `storageState` pour les projets de test (`use: { storageState: '...' }`). |
| `setup/auth.setup.ts` | **Setup (Login)** | Exécute la séquence de connexion une seule fois et sauvegarde l'état de la session dans le fichier `user.json`. |
| `tests/transfert.spec.ts` | **Tests Fonctionnels** | Contient les tests réels (ex: test de virement). Démarre **déjà connecté** grâce au chargement automatique du `storageState`. |
| `playwright/.auth/user.json` | **État Sauvegardé** | Le fichier généré par le setup, contenant les cookies, jetons (tokens) et le stockage local nécessaires pour simuler une session authentifiée. |

---

## 1_x playwright.config.ts
````ts
// playwright.config.ts

import { defineConfig } from '@playwright/test';

// 1. Définir le chemin de sortie du fichier d'authentification
const AUTH_FILE = 'playwright/.auth/user.json';

export default defineConfig({
  // Configuration de base...
  // testDir: './tests', // Par défaut
  // timeout: 30 * 1000,
  
  projects: [
    // --- PROJET 1 : SETUP ---
    // Ce projet s'exécute en premier pour se connecter et enregistrer l'état.
    {
      name: 'setup-login',
      // Spécifie le chemin du fichier de setup.
      testMatch: '**/setup/auth.setup.ts', 
      use: {
        // Optionnel: base pour les URLs de connexion
        baseURL: 'https://votre-banque.com', 
      }
    },

    // --- PROJET 2 : TESTS CONNECTÉS ---
    // Ce projet contient tous les tests fonctionnels (Virement, etc.)
    {
      name: 'logged-in tests',
      // Utilise l'état de la session sauvegardé par le projet 'setup-login'
      use: {
        storageState: AUTH_FILE,
        // Optionnel: base pour les URLs des tests
        baseURL: 'https://votre-banque.com', 
      },
      // IMPORTANT : Assure que le 'setup-login' est terminé avant de commencer
      dependencies: ['setup-login'],
      // Ignore le fichier de setup lui-même pour ne pas le ré-exécuter
      testIgnore: '**/setup/auth.setup.ts', 
      
      // Les tests à exécuter, ex: tous les fichiers dans le dossier 'tests'
      testDir: './tests', 
    },
  ],
});
````

---

## 2_x setup/auth.setup.ts
````ts
// setup/auth.setup.ts

import { test as setup, expect } from '@playwright/test';

// Doit correspondre au chemin dans playwright.config.ts
const AUTH_FILE = 'playwright/.auth/user.json'; 

// Définissez un test unique pour la connexion
setup('authentification de l\'utilisateur', async ({ page, baseURL }) => {
  // 1. Aller à la page de connexion
  await page.goto(`${baseURL}/login`);
  
  // 2. Remplir le formulaire (remplacez par vos propres sélecteurs !)
  await page.fill('#username', 'votre_utilisateur_valide');
  await page.fill('#password', 'votre_mot_de_passe_secret');
  await page.click('#login-button');
  
  // 3. Attendre la redirection vers le tableau de bord (preuve que la connexion a réussi)
  await expect(page).toHaveURL(/.*dashboard/); 
  
  // 4. SAUVEGARDE L'ÉTAT DE LA SESSION !
  // Ceci enregistre les cookies, les tokens de session, etc. dans le fichier.
  await page.context().storageState({ path: AUTH_FILE });
  
  console.log(`✅ État de connexion sauvegardé dans: ${AUTH_FILE}`);
});
````

---

## 3_x tests/transfert.spec.ts
````ts
// tests/transfert.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Tests de Virement', () => {
    
    // Le test démarre, et le navigateur est déjà dans un état "connecté" !
    test('Devrait effectuer un virement entre comptes', async ({ page, baseURL }) => {
        
        // 1. Naviguer directement vers la page de virement (ou le tableau de bord)
        await page.goto(`${baseURL}/transfert`);
        
        // 2. Vérifier que nous sommes bien connectés
        await expect(page.locator('.user-profile')).toBeVisible();

        // 3. Effectuer le virement (remplacez par vos propres sélecteurs !)
        await page.selectOption('#from-account', { label: 'Compte Courant' });
        await page.selectOption('#to-account', { label: 'Compte Épargne' });
        await page.fill('#amount', '50.00');
        await page.click('#submit-transfer');

        // 4. Vérification finale
        await expect(page.locator('.success-message')).toHaveText('Transaction réussie.', { timeout: 10000 });
        
    });
    
    // Vous pouvez ajouter d'autres tests ici qui seront TOUS connectés,
    // sans avoir à refaire le login.
    test('Devrait afficher l\'historique des transactions', async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/historique`);
        await expect(page.locator('.transaction-row')).toHaveCount(5); 
    });

});
````

---

## run
````ps1
# 1_x setup-login
# 2_x setup/auth.setup.ts & generate newFile user.json
# 3_x run logged-in tests with using user.json
npx playwright test
````
