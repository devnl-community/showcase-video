# DevNL Showcase Video

Maak gemakkelijk en snel een professionele video van je project of product en deel hem op [DevNL](https://www.devnl.nl), YouTube, Vimeo en andere sociale media. Deze repo bevat de DevNL-outro als [HyperFrames](https://hyperframes.heygen.com)-scene, een prompt voor je AI-agent en rechtenvrije muziek.

- 🎬 **Outro-scene** in 16:9 en 9:16, licht en donker, 5 seconden, zonder geluid
- ✍️ **Eigen call to action**: jij kiest het begin, "op DevNL" staat er altijd achter
- 🤖 **Agent-klaar**: plak de prompt in Claude Code, Cursor of een andere coding agent, of installeer de skill
- 🎵 **Muziek** die je gratis mag gebruiken in video's met deze outro

## Snel starten

### Met je AI-agent (aanbevolen)

Installeer de skill en vraag je agent om een DevNL-video:

```bash
npx skills add devnl-community/showcase-video
```

> "Maak een DevNL-showcasevideo van dit project."

Geen skills? Kopieer dan [`PROMPT.md`](PROMPT.md) naar je agent.

### Een goede call to action kiezen

Kies een korte gebiedende zin die past bij je video. "op DevNL" komt er altijd achter.

| Situatie | Voorbeelden |
| --- | --- |
| Product-demo | Bekijk mijn product · Probeer mijn app |
| Builder's story | Ontdek hoe ik het bouwde · Lees het hele verhaal |
| Feedback gezocht | Geef je feedback · Help mijn project verbeteren |
| Nog in ontwikkeling | Volg mijn project · Test de bèta |
| Open source | Bouw mee aan mijn project |

Tips:
- **Project of product?** Nog in ontwikkeling: *project*. Gelanceerd: *product*.
- **Vermijd twee keer "op"**, zoals "Geef feedback op mijn project op DevNL". Schrijf liever "Geef je feedback op DevNL".
- **Geen uitroeptekens**, en schrijf "op DevNL" niet zelf. De scene verwijdert het als je het toch doet.

## Showcase-links

Elke showcase op DevNL heeft een vaste link, deze kun je vinden op de pagina van DevNL. Normaal gesproken is dat `devnl.nl/s/<id>-<slug>`, bijvoorbeeld `devnl.nl/s/42-taskly`. De korte vorm `devnl.nl/s/42` werkt altijd en stuurt door. Gebruik de korte vorm in je video: die is makkelijk over te typen en blijft werken als je projectnaam verandert.

## Muziek

In [`music/`](muziek) staan tracks die je gratis mag gebruiken in video's **met de DevNL-outro**. Zie [`LICENSE.md`](LICENSE.md).

Je mag natuurlijk ook je eigen muziek gebruiken, dat maakt jouw video nog unieker.

## Regels

1. De DevNL-outro is altijd de **laatste scene** en wordt **niet aangepast**: alleen de variabelen hierboven.
2. Niet inkorten, bijsnijden, herkleuren of overschrijven met andere beelden.
3. Gebruik demo-data in je video: geen echte klantgegevens, e-mailadressen of API-sleutels in beeld.
4. Upload je video bij op YouTube of Vimeo en plak de link op je DevNL-showcase. Je mag de video ook op je eigen site of socials zetten, mét de outro.
5. Vergroot je bereik en interesse

## Bijdragen

Verbeteringen aan de prompt, de skill of de documentatie zijn welkom via een issue of pull request. Wijzigingen aan de outro zelf (animatie, logo, opmaak) doet het DevNL-team.

De scenes worden gegenereerd met `node tools/build.mjs`. Pas dat script aan, niet de HTML-bestanden.

## Handmatig

1. Haal de scene op in je HyperFrames-project:

   ```bash
   npx degit devnl-community/showcase-video/scene#v1.0.0 compositions/devnl-outro
   ```

2. Zet de outro als **laatste scene** in je `index.html`, direct na je eigen scenes:

   ```html
   <div
     id="devnl-outro"
     data-composition-id="devnl-outro"
     data-composition-src="compositions/devnl-outro/devnl-outro-16x9.html"
     data-start="45"
     data-duration="5"
     data-track-index="1"
     data-track-kind="graphics"
     data-width="1920"
     data-height="1080"
     data-variable-values='{"ctaText":"Probeer mijn app","productName":"Taskly","productLink":"devnl.nl/s/42","productLogo":"assets/logo.svg","theme":"light"}'
   ></div>
   ```

   Gebruik `devnl-outro-9x16.html` met `data-width="1080" data-height="1920"` voor een verticale video.

3. Verleng de `data-duration` van je root-compositie met 5 seconden en render:

   ```bash
   npx hyperframes render --quality delivery -o mijn-video.mp4
   ```

Een werkend voorbeeld staat in [`voorbeeld/`](voorbeeld) (16:9) en [`voorbeeld-verticaal/`](voorbeeld-verticaal) (9:16).

## Variabelen

| Variabele | Voorbeeld | Toelichting |
| --- | --- | --- |
| `ctaText` | `Probeer mijn app` | Het begin van de eindtitel, max. 32 tekens. **"op DevNL" wordt automatisch toegevoegd.** Te lange teksten worden kleiner gezet. |
| `productName` | `Taskly` | Naam van je project of product. Leeg = geen productblok. |
| `productLink` | `devnl.nl/s/42` | De korte link naar je showcase op DevNL. |
| `productLogo` | `assets/logo.svg` | Optioneel. Pad naar je logo binnen je eigen project. |
| `theme` | `light` / `dark` | Kies `dark` als je product een donkere UI heeft. |
