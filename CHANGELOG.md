# Changelog

Sve značajne izmjene ovog projekta bilježe se u ovom fajlu.

Format prati [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), a verzije [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Šest jedinica lokalne samouprave koje su nedostajale, prema FZS (2019) i RZS RS (2023): Pale (FBiH), Istočni Drvar, Kupres (RS), Petrovac, Istočno Novo Sarajevo i Trnovo (RS). Nove stavke imaju prazan `code`.
- JSON Schema (draft 2020-12) u `schema/`.
- Skripte za validaciju i generisanje izvedenih formata (`npm run validate`, `npm run build`, `npm run check`), bez vanjskih zavisnosti.
- Izvedeni formati u `dist/`: ravna lista mjesta i lista država kao JSON i CSV.
- GitHub Actions provjera na svaki push i pull request.
- MIT licenca, `CONTRIBUTING.md`, šabloni za issue i pull request, `CODEOWNERS`, `.editorconfig`, `.gitattributes`.
- Prošireni README: struktura, primjeri, izvori, plan razvoja.

### Removed

- "Bosna i Hercegovina" iz liste država van BiH.

## Početna verzija – 2025-01-31

- Prvi JSON sa entitetima, kantonima FBiH, regijama RS, gradovima i općinama te listom država van BiH.
