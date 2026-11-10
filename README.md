# BiH gradovi i mjesta

[![Validate](https://github.com/azra212/BiH_Gradovi_Mjesta/actions/workflows/validate.yml/badge.svg)](https://github.com/azra212/BiH_Gradovi_Mjesta/actions/workflows/validate.yml)
[![Licenca: MIT](https://img.shields.io/badge/licenca-MIT-yellow)](./LICENSE)
![Format: JSON | CSV](https://img.shields.io/badge/format-JSON%20%7C%20CSV-blue)
![Gradovi i općine: 144](https://img.shields.io/badge/gradovi%20i%20op%C4%87ine-144-green)

Svi gradovi i općine u Bosni i Hercegovini, razvrstani po entitetima, kantonima FBiH i regijama RS, plus lista najčešćih država van BiH. Jedan provjeren JSON fajl, spreman za dropdown liste, forme i seed podatke, uz izvedene CSV i ravne JSON formate.

> Nakon sati i sati pretraživanja po internetu, shvatila sam koliko je teško doći do ovakve liste kada praviš svoj app, platformu, šta god. Zato ostavljam jedan jedini JSON fajl za sve studente i programere početnike.
>
> — Azra

## Sadržaj

- [Brzi start](#brzi-start)
- [Šta sadrži](#šta-sadrži)
- [Formati](#formati)
- [Struktura](#struktura)
- [Primjeri](#primjeri)
- [Validacija](#validacija)
- [Izvori i metodologija](#izvori-i-metodologija)
- [Plan razvoja](#plan-razvoja)
- [Doprinos](#doprinos)
- [Licenca](#licenca)

## Brzi start

```sh
curl -L "https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json"
```

Za produkciju je bolje kopirati fajl u svoj projekat nego ga učitavati sa GitHuba pri svakom zahtjevu.

## Šta sadrži

| Ključ (prvi nivo) | Podgrupe | Broj podgrupa | Broj stavki |
| --- | --- | ---: | ---: |
| `Federacija BiH` | kantoni | 10 | 79 |
| `Republika Srpska` | regije | 4 | 64 |
| `Brčko Distrikt` | distrikt | 1 | 1 |
| **Ukupno u BiH** | | **15** | **144** |
| `Van BiH` | `Države` | 1 | 39 |

<details>
<summary>Broj gradova i općina po kantonu / regiji</summary>

| Entitet | Kanton / regija | Broj |
| --- | --- | ---: |
| Federacija BiH | Unsko-sanski kanton | 8 |
| Federacija BiH | Posavski kanton | 3 |
| Federacija BiH | Tuzlanski kanton | 13 |
| Federacija BiH | Zeničko-dobojski kanton | 12 |
| Federacija BiH | Bosansko-podrinjski kanton | 3 |
| Federacija BiH | Srednjobosanski kanton | 12 |
| Federacija BiH | Hercegovačko-neretvanski kanton | 9 |
| Federacija BiH | Zapadnohercegovački kanton | 4 |
| Federacija BiH | Kanton Sarajevo | 9 |
| Federacija BiH | Kanton 10 | 6 |
| Republika Srpska | Banjalučka regija | 21 |
| Republika Srpska | Dobojsko-Bijeljinska regija | 14 |
| Republika Srpska | Sarajevsko-Zvornička regija | 19 |
| Republika Srpska | Trebinjsko-Fočanska regija | 10 |
| Brčko Distrikt | Brčko distrikt | 1 |

</details>

## Formati

| Fajl | Format | Sadržaj |
| --- | --- | --- |
| [`kantoni i mjesta u BiH.json`](./kantoni%20i%20mjesta%20u%20BiH.json) | JSON, ugniježđen | Izvorni fajl: entitet → kanton/regija → stavke, plus `Van BiH` → `Države` |
| [`dist/mjesta.json`](./dist/mjesta.json) | JSON, ravna lista | `{ entity, group, name, code }` za 144 grada i općine |
| [`dist/mjesta.csv`](./dist/mjesta.csv) | CSV (UTF-8) | Kolone `entity,group,name,code` |
| [`dist/drzave.json`](./dist/drzave.json) | JSON, ravna lista | `{ name, code }` za 39 država |
| [`dist/drzave.csv`](./dist/drzave.csv) | CSV (UTF-8) | Kolone `name,code` |

Izvorni fajl je izvor istine. Fajlovi u `dist/` se generišu skriptom i ne uređuju se ručno. Raw linkovi imaju oblik `https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/<putanja>`; razmak u nazivu izvornog fajla piše se kao `%20`.

## Struktura

Izvorni fajl ima tri nivoa:

1. **Entitet / grupa**: `Federacija BiH`, `Republika Srpska`, `Brčko Distrikt`, `Van BiH`
2. **Kanton / regija / podgrupa**: npr. `Unsko-sanski kanton`, `Banjalučka regija`, `Države`
3. **Lista stavki**: objekti sa poljima `name` i `code`, oba su stringovi

```json
{
  "Federacija BiH": {
    "Unsko-sanski kanton": [
      { "name": "Bihać", "code": "3" },
      { "name": "Bosanska Krupa", "code": "82" }
    ]
  },
  "Brčko Distrikt": {
    "Brčko distrikt": [{ "name": "Brčko", "code": "75" }]
  },
  "Van BiH": {
    "Države": [{ "name": "Albanija", "code": "24" }]
  }
}
```

Formalni opis je u [`schema/kantoni-i-mjesta.schema.json`](./schema/kantoni-i-mjesta.schema.json) (JSON Schema, draft 2020-12).

## Primjeri

### JavaScript

```js
const url =
  "https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json";

const data = await (await fetch(url)).json();

// Svi gradovi i općine u BiH (bez država van BiH)
const mjesta = Object.entries(data)
  .filter(([grupa]) => grupa !== "Van BiH")
  .flatMap(([, podgrupe]) => Object.values(podgrupe).flat());

console.log(mjesta.length); // 144
```

### PHP

```php
<?php
$url = 'https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json';
$data = json_decode(file_get_contents($url), true, 512, JSON_THROW_ON_ERROR);

foreach ($data['Federacija BiH']['Kanton Sarajevo'] as $mjesto) {
    echo $mjesto['name'] . PHP_EOL;
}
```

### Python

```python
import json
from urllib.request import urlopen

url = "https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json"
data = json.load(urlopen(url))

for kanton, mjesta in data["Federacija BiH"].items():
    print(kanton, len(mjesta))
```

## Validacija

Svaki push i pull request prolazi [GitHub Actions provjeru](./.github/workflows/validate.yml):

- izvorni fajl je validan JSON i odgovara JSON Schemi;
- nazivi su neprazni, bez duplikata unutar BiH i unutar liste država; kodovi su jedinstveni gdje postoje;
- broj jedinica po entitetu odgovara zvaničnim izvorima (FBiH 79, RS 64, Brčko 1);
- `dist/` je ažuran u odnosu na izvorni fajl.

Lokalno (Node.js 20+, bez dodatnih paketa):

```sh
npm run check    # validacija + provjera dist/
npm run build    # regeneriše dist/
```

## Izvori i metodologija

- **Federacija BiH**: Federalni zavod za statistiku, [Šifarnik jedinica lokalne samouprave i naseljenih mjesta u FBiH, stanje 31.12.2019.](https://fzs.ba/wp-content/uploads/2020/01/Sifarnik-JLS-i-naseljenih-mjesta-u-F-BiH_stanje31122019.pdf) (10 kantona, 79 JLS)
- **Republika Srpska**: Republički zavod za statistiku RS, [Gradovi i opštine Republike Srpske, 2023.](https://www.rzs.rs.ba/static/uploads/bilteni/gradovi_i_opstine_republike_srpske/2023/Gradovi_I_Opstine_Republike_Srpske_2023_WEB.pdf) (53 opštine i 11 gradova)
- **Brčko distrikt BiH**: jedna jedinica.

Napomene:

- **Regije RS** nisu dio navedenih izvora. Fajl koristi četiri regije radi grupisanja; jedinice dodane naknadno raspoređene su po geografskom položaju.
- **Kodovi (`code`)** potiču iz izvorne liste čije porijeklo nije dokumentovano. Nisu službene šifre FZS/RZS ni ISO kodovi, a kodovi država su zaseban skup. Šest naknadno dodanih jedinica još nema kod (`"code": ""`).
- **Istoimene općine** u dva entiteta razlikuju se oznakom u nazivu kod naknadno dodanih stavki: `Pale (FBiH)`, `Kupres (RS)`, `Trnovo (RS)`.
- Podaci mogu biti nepotpuni ili zastarjeli. Za službene i pravne svrhe provjerite ih u zvaničnim izvorima.

## Plan razvoja

- Službene šifre jedinica lokalne samouprave (FZS / RZS) kao zasebno polje
- Koordinate sjedišta općina
- Naseljena mjesta i poštanski brojevi kao zasebni fajlovi
- npm paket sa tipovima

## Doprinos

Ispravke i dopune su dobrodošle, posebno uz link na zvanični izvor. Pogledaj [CONTRIBUTING.md](./CONTRIBUTING.md) ili otvori [issue za ispravku podataka](https://github.com/azra212/BiH_Gradovi_Mjesta/issues/new?template=ispravka-podataka.yml). Izmjene su opisane u [CHANGELOG.md](./CHANGELOG.md).

## Licenca

[MIT](./LICENSE) © 2025 Azra Kadrić
