# Architekci Chmury

Responsywna, jednostronicowa strona wizerunkowa firmy doradczej specjalizującej się w AWS, DevOps, FinOps i agentic AI.

Samodzielny projekt Next.js publikowany jako statyczny eksport na hostingu MyDevil. Strona nie wymaga bazy danych, logowania ani zewnętrznego środowiska aplikacyjnego.

Wersja produkcyjna: [https://architekcichmury.pl](https://architekcichmury.pl).

## Uruchomienie lokalne

Wymagany jest Node.js 24.x.

```bash
npm install
npm run dev
```

Kontrole przed publikacją:

```bash
npm run lint
npm run typecheck
npm test
```

`npm run build` tworzy gotową stronę w katalogu `out/`.

Kod strony pozostaje w `app/`. Fonty Geist są dołączone lokalnie, więc produkcyjny build nie pobiera ich z zewnętrznych serwerów.

## Wdrożenie na MyDevil

MyDevil uruchamia domenę jako stronę typu Node.js przez Phusion Passenger. Na serwer trafiają wyłącznie:

```text
app.js
out/
```

`app.js` korzysta wyłącznie z modułów wbudowanych Node.js. Serwuje statyczny eksport, zwraca prawdziwe odpowiedzi 404, ustawia cache dla wersjonowanych assetów i dodaje nagłówki bezpieczeństwa, w tym CSP, HSTS, ochronę przed framingiem i MIME sniffingiem.

Źródła, dokumentacja, `.git/`, `node_modules/`, `.next/`, pliki środowiskowe i sekrety nie są częścią paczki produkcyjnej.

## Źródło prawdy

Prywatne repozytorium GitHub jest jedynym źródłem kodu, a `https://architekcichmury.pl` na MyDevil — jedynym środowiskiem produkcyjnym i jedyną ścieżką publikacji.
