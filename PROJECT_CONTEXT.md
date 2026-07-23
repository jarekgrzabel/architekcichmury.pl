# Architekci Chmury — kontekst projektu

## Cel

Publiczna, jednostronicowa strona wizerunkowa „Architekci Chmury”. Jedyna wersja produkcyjna utrzymywana w ramach tego projektu działa na zewnętrznym hostingu MyDevil.

Produkcja działa pod adresem [https://architekcichmury.pl](https://architekcichmury.pl). Pierwsze wdrożenie wykonano 23 lipca 2026 r.

## Architektura

- Next.js App Router, React, TypeScript i Tailwind CSS.
- Treść i wygląd strony znajdują się w `app/`.
- Główny build: statyczny eksport do `out/`.
- Runtime MyDevil: `app.js` + `out/`, bez instalowania zależności na serwerze.
- Lokalnie hostowane fonty Geist; brak pobierania fontów podczas produkcyjnego builda.
- Brak bazy danych, logowania, API, uploadów i funkcji serwerowych.
- Link kontaktowy używa `mailto:`.

Prywatne repozytorium GitHub jest jedynym źródłem kodu, a MyDevil jedynym środowiskiem i procesem publikacji.

## Kontrola jakości

Przed każdym wdrożeniem wykonaj:

```bash
npm run lint
npm run typecheck
npm test
```

Testy budują eksport, sprawdzają kluczową treść, uruchamiają lokalnie `app.js`, potwierdzają HTTP 200, prawdziwe 404, odrzucenie metod modyfikujących i obecność nagłówków bezpieczeństwa.

## Artefakt produkcyjny

Paczka wdrożeniowa może zawierać wyłącznie:

```text
app.js
out/
```

Nie wysyłaj źródeł, `README.md`, `PROJECT_CONTEXT.md`, `.git/`, konfiguracji builda, `package.json`, lockfile, `node_modules/`, `.next/`, logów, plików środowiskowych ani sekretów.

Na macOS twórz archiwum z `COPYFILE_DISABLE=1` i wykluczaj `.DS_Store` oraz `._*`.

## MyDevil

Konfiguracja produkcyjna:

- domena: `architekcichmury.pl`;
- serwer: `s46.mydevil.net`;
- konto: `architekcichmury`;
- katalog aplikacji: `/home/architekcichmury/domains/architekcichmury.pl/public_nodejs`;
- równoważna ścieżka systemowa: `/usr/home/architekcichmury/domains/architekcichmury.pl/public_nodejs`;
- katalog kopii: `/home/architekcichmury/domains/architekcichmury.pl/deploy-backup`;
- plik startowy: `app.js`;
- executable: `/usr/local/bin/node24`;
- środowisko: `production`;
- procesy: `4`;
- minimalna wersja TLS: `1.2`;
- SSL: wymuszony;
- restart: `devil www restart architekcichmury.pl`.

Połączenie korzysta z tego samego klucza co hippora.pl: `/Users/jarek/.ssh/github`, z opcjami `-F /dev/null` i `IdentitiesOnly=yes`. Klucz prywatny pozostaje wyłącznie poza projektem. Nie zapisuj haseł, tokenów ani kluczy w repozytorium lub paczce.

Początkowy katalog utworzony przez MyDevil został zachowany jako:

```text
/home/architekcichmury/domains/architekcichmury.pl/deploy-backup/pre-migration-20260723-1245
```

Standardowe wdrożenie:

1. Zbuduj i sprawdź projekt lokalnie.
2. Utwórz minimalną paczkę `app.js` + `out/`.
3. Prześlij paczkę poza aktywny katalog aplikacji.
4. Sprawdź allowlistę plików i brak symlinków.
5. Zachowaj poprzednie wydanie w `deploy-backup/`.
6. Podmień katalog aplikacji przez zmianę nazwy na tym samym systemie plików.
7. Zrestartuj domenę przez `devil www restart DOMENA`.
8. Sprawdź stronę główną, kontrolne 404, fonty/CSS, nagłówki bezpieczeństwa i log błędów.

Jeżeli kontrola produkcji się nie powiedzie, przywróć ostatni kompletny katalog z `deploy-backup/`, zrestartuj domenę i ponownie wykonaj kontrolę.

## GitHub

- główne repozytorium: `git@github.com:jarekgrzabel/architekcichmury.pl.git`;
- repozytorium jest prywatne;
- zdalna nazwa `origin` wskazuje GitHub i jest jedynym repozytorium używanym do utrzymania strony;
- do operacji GitHub używaj klucza `/Users/jarek/.ssh/github` z `-F /dev/null` i `IdentitiesOnly=yes`;
- nigdy nie kopiuj klucza do projektu ani nie zapisuj sekretów w konfiguracji Git;
- `README.md` i `PROJECT_CONTEXT.md` należą do prywatnego repozytorium, ale nie są częścią paczki wdrażanej na MyDevil;
- przed commitem sprawdź staged files i przeskanuj ich treść pod kątem kluczy, tokenów, haseł i plików środowiskowych.
