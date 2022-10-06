# projet 7: Créez un réseau social d’entreprise

## cloner le dépot

    git clone https://github.com/fredbarre/projet7.git

## installation dans la racine:

    npm install

## configuration:

Pour lancer le server ajouter les fichiers suivants à la racine:

**_.env_**:

    SERVER_PORT=5173
    JWT_EXPIRE="365d"

**_.env.local_**:

    MONGO_DBLINK="mongodb+srv://<user>:<password>@<server>/<db>"
    JWT_SECRET="<SECRET>"

## lancement du server dans la racine:

    npm run dev
