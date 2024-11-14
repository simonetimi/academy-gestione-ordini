# Applicativo Gestione Ordini

## Funzionalità frontend

### Ruoli

- Admin: creati, modifica o elimina prodotti
- Operatore: crea ordini e ne modifica lo stato. Aggiunge o modifica clienti.

### Autenticazione

L'utente può eseguire la registrazione come operatore.
Nel momento del login, viene eseguita l'autenticazione tramite token JWT.

A seconda del ruolo restituito dal database, è precluso ad admin l'accesso delle aree dedicate a operatore, e viceversa.

### Dashboard

Le AuthGuard eseguono il ridirezionamento alla dashboard corretta, e prevengono l'accesso alle aree precluse.

### Services

Ogni service è responsabile di una parte dell'applicazione: autenticazione, notifiche, persistenza, http
Alcuni service gestiscono lo stato dei dati dell'applicazione: ordini, prodotti, clienti.

### Form

I form (reactive) hanno validation per ogni campo.

### Pipes

È stata creata una pipe per il calcolo dell'IVA nel prezzo.
La pipe accetta un array di due number: prezzo, iva. Il valore di ritorno è il prezzo con l'IVA.

### Lingua

È stato utilizzato il pacchetto @angular/localize e configurato per la visualizzazione corretta in italiano di date e currency.

## Funzionalità backend

### Gestione prodotti

La modifica dei prodotti avviene mantenendo i vecchi prodotti, e flaggandoli come non più "current".
Questo permette di mantenere il prezzo e il nome corretto dei prodotti negli ordini effettuati prima della modifica.

