# RAVES — Application Mobile d'Enregistrement et Transformation Audio

## 🌎 Aperçu du Projet

**RAVES** est une application mobile cross-plateforme développée avec **React Native** et **Expo**. Elle permet d'enregistrer des fichiers audio, de les gérer localement et de les transformer via un serveur distant doté d'un modèle d'intelligence artificielle.

> ✨ Projet réalisé dans un cadre **académique**, illustrant mes compétences en développement mobile et en intégration backend.

---

## 👉 Accès Immédiat via Expo Go

Scannez ce QR code avec l'app **Expo Go** pour lancer l'application :

![QR Code Expo](url)

---

## 📊 Fonctionnalités Clés

* 🔗 **Connexion Serveur** : Interface pour spécifier l'adresse IP et le port du serveur Flask distant.
* 🎤 **Enregistrement Audio** : Capture de l'audio via le micro du smartphone.
* 📂 **Gestion Locale** : Sauvegarde, lecture, suppression des enregistrements.
* 🔄 **Transformation Audio IA** : Envoi au serveur pour transformation par un modèle ONNX (IA), retour d'un audio modifié.

---

## 🛠️ Installation de l'application

### 1. Clone du dépôt

```bash
git clone [https://github.com/GoldSenseiBoi/RAVE-Hyper-Project.git]
```

### 2. Installation des dépendances

```bash
cd RAVE-Hyper-Project
npm install
```

### 3. Lancement de l'application

```bash
npm start
```

> L'application se lancera via Expo, disponible sur smartphone avec **Expo Go** ou via un simulateur.

---

## 🔧 Configuration du Serveur Flask

L'application repose sur un serveur Flask pour transformer l'audio. Voici comment le mettre en place :

### ✅ Prérequis

* Python installé
* Git pour cloner le repo serveur

### ⚡ Mise en place rapide

1. Clone du serveur :

```bash
git clone https://github.com/gnvIRCAM/RAVE-ONNX-Server
```

2. Déplacement dans le dossier :

```bash
cd RAVE-ONNX-Server
```

3. Lancement du serveur Flask :

```bash
python server.py
```

> Le serveur sera accessible à l'adresse IP locale et au port configuré dans `server.py` (par défaut `http://127.0.0.1:5000`).

---

## 🔹 Guide d'utilisation

1. Ouvrir l'application RAVES
2. Saisir l'adresse IP et le port de votre serveur Flask dans l'interface de connexion
3. Naviguer vers **"Studio"** pour créer, écouter ou supprimer des enregistrements
4. Aller dans **"Convertisseur"** pour sélectionner un modèle IA, transformer l'audio, et recevoir le résultat en quelques secondes

---

## 📄 Licence & Avertissement

Ce projet est un prototype à but **pédagogique**. Il n'est pas destiné à un usage en production sans modifications sécuritaires.

---

🌟 *Merci d'avoir consulté ce projet. Pour toute suggestion ou retour, n'hésitez pas à ouvrir une issue ou une pull request !*
