const { hasHelpFlag } = require('./get-args');

if (hasHelpFlag) {
  const help = `
    USAGE:
      → gentls [filename] [options]
      → gentls [options] [filename]
      → gentls [options] [filename] [options]
  
    ---
    DESCRIPTION:
    Le paquet \`gentls\` permet de générer une clé privée et un certificat TLS pour le développement.
    Ces fichiers seront générés dans un dossier ssl/ depuis l'endroit où la commande aura été exécutée.
    Il est donc important de l'exécuter à la racine du projet pour éviter des incohérences lors de l'utilisation de \`gentls\`.
  
    ---
    OPTIONS:
    -h              Aide de l'outil \`gentls\`.
    -r              Option permettant la suppression du dossier ssl/ s'il existe.
    -o <filepath>   Fichier à créé ou édité. Le code JS permettant de récupérer le certificat et la clé dans des constantes y sera insérer en première ligne.
    
    ---
    EXAMPLES:
  
    > gentls dwaps
    > gentls dwaps -r
    > gentls dwaps -o ./bin/www
    > gentls dwaps -o ./bin/www -r
    > gentls -r -o ./bin/www dwaps
    > gentls -r
    > gentls -o ./bin/www dwaps
  `;
  console.log(help);
  process.exit(0);
  return !'stop command';
}

return !!'run command';
