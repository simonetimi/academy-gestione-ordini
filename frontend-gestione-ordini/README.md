# Applicativo Gestione Ordini

## Funzionalità frontend

### Ruoli

- Admin: creati, modifica o elimina prodotti
- Operatore: crea ordini e ne modifica lo stato. Aggiunge o modifica clienti.

### Autenticazione

L'utente può registrarsi come operatore o admin.
A seconda del ruolo restituito dal database, è precluso ad admin l'accesso delle aree dedicate a operatore, e viceversa.

### Dashboard

Le AuthGuard eseguono il ridirezionamento alla dashboard corretta, e prevengono l'accesso alle aree precluse.

### Services

Ogni service è responsabile di una parte dell'applicazione: autenticazione, notifiche, persistenza, http
Alcuni service gestiscono lo stato dei dati dell'applicazione: ordini, prodotti, clienti.

### Form

I form (reactive) hanno validation per ogni campo.

### Pipes

È stata creata una custom pipe per il calcolo dell'IVA nel prezzo.
La pipe accetta un array di due number: prezzo, iva. Il valore di ritorno è il prezzo con l'IVA.

### Lingua

È stato utilizzato il pacchetto @angular/localize e configurato per la visualizzazione corretta in italiano di date e currency.

## Funzionalità backend

### Gestione prodotti

La modifica dei prodotti avviene mantenendo i vecchi prodotti, e flaggandoli come non più "current".
Questo permette di mantenere il prezzo e il nome corretto dei prodotti negli ordini effettuati prima della modifica.
Stesso meccanismo per eliminare i prodotti: se si vuole eliminare un prodotto, viene flaggato come current:false,
così gli ordini già effettuati con quel prodotto vengono mantenuti. 


### Autenticazione

1) L'autenticazione avviene tramite token JWT. Il token ha come soggetto il username dell'user e viene segnata con una secretkey la quale verrà usata in seguito alla decodifica.
La chiave segreta è una stringa lunga almeno 32 caratteri salvata nell'application.properties.
Allo stesso modo anche la data di scadenza viene salvata nell'application.properties e passato al metodo della creazione del token.
Nella classe JwtTokenProvider oltre alla creazione del token troviamo anche il metodo "extractUsername" che decodifica il token passato con la secretkey e ritorna il username codificato nel token.
Inoltre troviamo anche il metodo "validateToken" metodo usato per la validazione tel token nella classe filter JwtAuthenticationFilter la quale in seguito viene iniettata nel SecurityConfig di Spring, nel @Bean SecurityFilterChain.


2) La classe CustomUserDetailsService implementa UserDetailsService che serve per caricare le informazioni di autenticazione di un utente per Spring Security facendo @Override del metodo il quale viene chiamato per cercare l'utente tramite username o email, convertire i ruoli in un formato compatibile e restituire un oggetto User con email, password e ruoli, pronto per l'autenticazione


3) La classe JwtAuthenticationEntryPoint gestisce i tentativi di accesso non autorizzati,
   	inviando una risposta di errore 401 Unauthorized.


4)    La classe JwtAuthenticationFilter controlla ogni richiesta HTTP per verificare
 se contiene un token JWT valido.
In questa classe vengono iniettati le precendenti classi JwtTokenProvider e UserDetailsService per la decodifica e la validazione del token ed il recupero dell'utente usando il metodo "loadUserByUsername".  Se il token è valido, carica i dettagli
      dell'utente e imposta l'utente autenticato nel contesto di sicurezza.


5) Nella classe SecurityConfig vengono iniettati le precedenti clasii 
Nella classe JwtAuthenticationFilter 
Gli endpoint dell'API sono protetti dietro autenticazione, mentre le operazioni CRUD (tranne READ) richiedono anche un ruolo specifico(Admin - Operator)



### 
