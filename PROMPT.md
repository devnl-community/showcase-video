# Prompt: DevNL-showcasevideo

Kopieer alles onder de streep naar je coding agent (Claude Code, Cursor, …). Vervang `{{DEVNL_LINK}}` door de link van je showcase of je productie domein, bijvoorbeeld `devnl.nl/s/42`. Op DevNL staat deze prompt al ingevuld klaar bij je showcase.

---

DevNL is een Nederlandstalige developers community. Ik wil mijn project op DevNL showcasen met een korte snappy productvideo, gemaakt met HyperFrames. Mijn DevNL-link is `{{DEVNL_LINK}}`.

## Voorbereiding
1. Installeer de HyperFrames-skills (`npx skills add heygen-com/hyperframes`) en volg ze. Gok niet naar HyperFrames-conventies.
2. Haal de DevNL-outro op: `npx degit devnl-community/showcase-video/scene#v1.0.0 compositions/devnl-outro`. Lees de README op https://github.com/devnl-community/showcase-video.
3. Inventariseer dit project: README, codebase, de website en de bestaande branding (logo, kleuren, fonts, licht of donker).

## Vragen
Stel daarna in één keer alleen de vragen die je niet zelf kunt beantwoorden:
- Is het project al gelanceerd, of wanneer wordt het gelanceerd?
- Welk probleem lost het op, en voor wie?
- Wat is de beste functionaliteit, en welke 2 à 3 features moeten in beeld?
- Moet de tekst in de video Nederlands of Engels zijn? (De DevNL-outro blijft Nederlands.)
- Welke toon kies je?
  1. Product-demo: strak, energiek, echte UI, korte techniek-hint
  2. Builder's story: waarom je het bouwt en welke techniek erachter zit
- **Call to action:** stel 3 eindtitels voor die passen bij de toon en de fase van het project, en laat mij kiezen of iets eigens typen. Regels:
  - alleen het begin van de zin, max. 32 tekens. "op DevNL" voegt de outro zelf toe;
  - gebiedende wijs, geen uitroepteken;
  - "project" als het nog in ontwikkeling is, "product" als het gelanceerd is;
  - geen dubbel "op" (dus niet "Geef feedback op mijn project op DevNL").

Stel vervolgvragen tot je zeker weet dat de video informatief en overtuigend wordt.

## De video
- Lengte 45 à 90 seconden, 1920×1080, plus optioneel een verticale versie (1080×1920, max. 30 seconden).
- Begin met een intro van een paar seconden en laat daarna de features zien met echte UI.
- Gebruik alleen demo-data: geen echte klantgegevens, e-mailadressen of API-sleutels in beeld.
- Muziek: kies een track uit `muziek/` in de DevNL-repo die bij de toon past. Gebruik onder de voorwaarden in `LICENSE.md`.

## Verplichte outro
Zet `compositions/devnl-outro/devnl-outro-16x9.html` (of `-9x16.html` voor verticaal) als laatste scene, 5 seconden, zoals beschreven in de README. Vul alleen de variabelen in:
- `ctaText`: de gekozen call to action (zonder "op DevNL");
- `productName`: de naam van mijn project;
- `productLink`: `{{DEVNL_LINK}}`;
- `productLogo`: het pad naar mijn logo in dit project (optioneel);
- `theme`: `dark` als mijn product een donkere UI heeft, anders `light`.

Pas verder niets aan de outro aan. Laat de muziek doorlopen en onder de outro uitfaden.

## Oplevering
Lever de MP4 en een korte beschrijving van 2 à 3 zinnen. Zet de video daarna als "niet vermeld" op YouTube en plak de link op mijn showcase: `{{DEVNL_LINK}}`.
