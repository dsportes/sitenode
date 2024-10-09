Sur une requête HTTP POST de la forme:

    http://monserveur.org:3000/alertes
    Avec les arguments: pwd to sub txt

envoie un e-mail de texte à un _administrateur_. 
- `pwd` est la password du titulaire du compte mail.
- le paramètre `txt` est facultatif.
- le port est 3000 mais l'hébergeur peut l'ignorer (cas de _passenger_).

Le compte mail de l'administrateur est fixé par les paramètres donnés dans le code:

    host: 'smtp.laposte.net',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: 'pekin.lambda',
      pass: pwd,
    },

et par la constante : `const from = 'pekin.lambda@laposte.net'`.

De base ce serveur n'est pas HTTPS mais en général l'hébergeur de Node va le transformer en HTTPS.
