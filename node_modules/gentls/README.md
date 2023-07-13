# GENTLS

### Getting started

**IMPORTANT** ➟ Se positionner à la racine du projet.

```bash
> cd my-project/
> npx gentls [filename]
```

Cette commande va créer un dossier *ssl/* au même niveau.

Ce dossier contiendra 3 fichiers:
- un fichier .gitkeep,
- un fichier (nom par défaut ou renseigné dans la commande) contenant une clé privée,
- un fichier (nom par défaut ou renseigné dans la commande) contenant un certificat TLS prêts à l'emploi pour le developpement.

**Note:** Si vous renseignez plusieurs noms de fichiers, la commande ne créera que le premier.

---

### Options supplémentaires

→ `gentls -h` permet d'afficher l'aide de la commande.

```bash
> gentls -h
    USAGE:
      → gentls [filename] [options]
      → gentls [options] [filename]
      → gentls [options] [filename] [options]

  ...
```

→ `gentls [-r]` permet la suppression préalable du dossier ssl/ s'il existe.

→ `gentls [-o <filename|filepath>]` permet de créer un fichier en y injectant le code JavaScript qui permet de récupérer le certificat et la clé dans des constantes.

**Note:** Si le fichier existe déjà, l'ajout du code se fera au-dessus du code existant.

---

[DWAPS - Michael Cornillon](https://www.linkedin.com/in/dwaps-formation/)