# projet 7: Créez un réseau social d’entreprise

**lien du repo**: https://github.com/fredbarre/projet7

**lancement du server a la racine**:npm run dev

Pour lancer le server il y'a besoin du fichier .env à la racine et .env.local

.env contient:

SERVER_PORT=
JWT_EXPIRE=

qui correspond au port du server et temps expiration du token avec jwt

.env.local contient:

MONGO_DBLINK=
JWT_SECRET=

qui correspond au lien de la base de donnée Mongodb.
et le secret pour la création du token jwt
