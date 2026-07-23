# Architekci Chmury

Responsywna, jednostronicowa strona wizerunkowa firmy doradczej specjalizującej się w AWS, DevOps, FinOps i agentic AI.

Projekt powstał w OpenAI Sites, ale jego głównym sposobem publikacji jest teraz niezależny, statyczny eksport Next.js przeznaczony dla MyDevil. Strona nie wymaga bazy danych, logowania, funkcji Cloudflare ani usług OpenAI w czasie działania.

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

Źródła, dokumentacja, `.openai/`, `.git/`, `node_modules/`, `.next/`, `dist/`, pliki środowiskowe i sekrety nie są częścią paczki produkcyjnej.

## Zgodność z OpenAI Sites

Identyfikator istniejącego projektu i konfiguracja Sites pozostają w `.openai/hosting.json` wyłącznie jako ślad pochodzenia projektu. Opublikowana wcześniej wersja Sites pozostaje nienaruszona. Nowa wersja dla MyDevil nie korzysta z tych danych, Cloudflare ani mechanizmu uwierzytelniania Sites.
