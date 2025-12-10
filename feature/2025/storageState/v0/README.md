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
