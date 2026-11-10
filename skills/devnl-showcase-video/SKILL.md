---
name: devnl-showcase-video
description: Maak een productvideo van het huidige project voor een showcase op DevNL (devnl.nl), met HyperFrames en de verplichte DevNL-outro. Gebruik dit als iemand vraagt om een DevNL-video, showcasevideo of productvideo voor DevNL.
---

# DevNL-showcasevideo

DevNL is een Nederlandstalige developers community. Leden showcasen hun projecten met een korte productvideo die eindigt met de DevNL-outro. Bron: https://github.com/devnl-community/showcase-video

## Werkwijze

1. **HyperFrames:** gebruik de HyperFrames-skills (`npx skills add heygen-com/hyperframes`) en volg die voor alles wat met de video te maken heeft.
2. **Outro ophalen:** `npx degit devnl-community/showcase-video/scene#v1.0.0 compositions/devnl-outro`.
3. **Inventariseren:** README, codebase, website, branding (logo, kleuren, fonts, licht of donker).
4. **Vragen, in één keer en alleen wat je niet zelf kunt vinden:**
   - lanceerstatus;
   - welk probleem het oplost en voor wie;
   - de beste functionaliteit en 2 à 3 features voor in beeld;
   - de taal van de video;
   - de toon: product-demo of builder's story;
   - de DevNL-link van de showcase (`devnl.nl/s/<id>`);
   - de call to action (zie hieronder).
5. **De video bouwen:** 45 à 90 seconden, 1920×1080, eventueel ook verticaal 1080×1920 (max. 30 seconden). Echte UI, alleen demo-data. Snappy, logische maar vlotte animaties. Bij voorkeur gebruik maken van eigen muziek, maar als deze er niet is kan muziek uit `songs/` in de DevNL-repo rechtenvrij worden gebruikt zo lang de DevNL outro wordt gebruikt.
6. **De outro als laatste scene**, 5 seconden, met alleen deze variabelen:
   - `ctaText`
   - `productName`
   - `productLink`
   - `productLogo`
   - `theme` (`light` of `dark`, dark als het product een donkere UI heeft)

   Mountvoorbeeld: zie de README van de repo.
7. **Controleren:** `npx hyperframes check`, snapshots bekijken, dan renderen.
8. **Opleveren:** de MP4 en een beschrijving van 2 à 3 zinnen. Adviseer om de video als op YouTube te zetten en de link op de DevNL-showcase te plakken. En uiteraard zelf te delen op sociale media om je product/product verder te verspreiden.

## Call to action

Stel 3 opties voor die passen bij de toon en de fase van het project, en laat de gebruiker kiezen of zelf iets typen.

- **Alleen het begin van de zin, max. 32 tekens.** "op DevNL" voegt de scene zelf toe.
- **Gebiedende wijs, zonder uitroepteken.**
- **"project"** als het nog in ontwikkeling is, **"product"** als het gelanceerd is.
- **Geen dubbel "op":** niet "Geef feedback op mijn project op DevNL", maar "Geef je feedback op DevNL".

Voorbeelden:
- Bekijk mijn product
- Probeer mijn app
- Ontdek hoe ik het bouwde
- Geef je feedback
- Volg mijn project
- Test de bèta
- Bouw mee aan mijn project

## Harde regels

- **De outro is altijd de laatste scene en wordt nooit aangepast**: geen andere tekst, kleuren, timing of logo.
- **De muziek alleen gebruiken in video's met de outro**, en nooit registreren bij Content ID.
- **Vraag om DevNL project URL indien niet aanwezig**