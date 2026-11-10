# 🇧🇦 BiH gradovi i mjesta (JSON)

Jedan JSON fajl sa entitetima, kantonima, regijama, gradovima i općinama u Bosni i Hercegovini, plus lista nekih popularnih država van BiH. Spreman za dropdown liste, forme i seed podatke u vašoj aplikaciji.

![Format: JSON](https://img.shields.io/badge/format-JSON-blue)
![Gradovi i općine: 138](https://img.shields.io/badge/gradovi%20i%20op%C4%87ine-138-green)
![Države van BiH: 40](https://img.shields.io/badge/dr%C5%BEave%20van%20BiH-40-orange)

Nakon sati i sati pretraživanja po internetu, shvatila sam koliko je teško doći do ovakve liste kada praviš svoj app, platformu, šta god. Zato ostavljam jedan jedini JSON fajl za sve studente i programere početnike, u kojem su:

- entiteti u BiH (i Brčko distrikt)
- gradovi i općine u BiH
- kantoni u FBiH
- regije u RS
- lista nekih "popularnih" država van BiH

## Sadržaj

- [Šta sadrži](#šta-sadrži)
- [Struktura fajla](#struktura-fajla)
- [Kako koristiti](#kako-koristiti)
  - [JavaScript](#javascript)
  - [PHP](#php)
  - [Python](#python)
- [Kako doprinijeti](#kako-doprinijeti)
- [Napomena o podacima](#napomena-o-podacima)
- [Licenca](#licenca)

## Šta sadrži

Fajl: [`kantoni i mjesta u BiH.json`](./kantoni%20i%20mjesta%20u%20BiH.json)

| Ključ (prvi nivo) | Podgrupe | Broj podgrupa | Broj stavki |
| --- | --- | ---: | ---: |
| `Federacija BiH` | kantoni | 10 | 78 |
| `Republika Srpska` | regije | 4 | 59 |
| `Brčko Distrikt` | distrikt | 1 | 1 |
| `Van BiH` | `Države` | 1 | 40 |
| **Ukupno u BiH** | | **15** | **138** |

<details>
<summary>Broj gradova i općina po kantonu/regiji</summary>

| Entitet | Kanton / regija | Broj |
| --- | --- | ---: |
| Federacija BiH | Unsko-sanski kanton | 8 |
| Federacija BiH | Posavski kanton | 3 |
| Federacija BiH | Tuzlanski kanton | 13 |
| Federacija BiH | Zeničko-dobojski kanton | 12 |
| Federacija BiH | Bosansko-podrinjski kanton | 2 |
| Federacija BiH | Srednjobosanski kanton | 12 |
| Federacija BiH | Hercegovačko-neretvanski kanton | 9 |
| Federacija BiH | Zapadnohercegovački kanton | 4 |
| Federacija BiH | Kanton Sarajevo | 9 |
| Federacija BiH | Kanton 10 | 6 |
| Republika Srpska | Banjalučka regija | 18 |
| Republika Srpska | Dobojsko-Bijeljinska regija | 14 |
| Republika Srpska | Sarajevsko-Zvornička regija | 17 |
| Republika Srpska | Trebinjsko-Fočanska regija | 10 |
| Brčko Distrikt | Brčko distrikt | 1 |

</details>

## Struktura fajla

Fajl ima tri nivoa:

1. **Entitet / grupa**: `Federacija BiH`, `Republika Srpska`, `Brčko Distrikt`, `Van BiH`
2. **Kanton / regija / podgrupa**: npr. `Unsko-sanski kanton`, `Banjalučka regija`, `Države`
3. **Lista stavki**: svaka stavka je objekat sa poljima `name` i `code` (oba su stringovi)

Isječak iz fajla:

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
    "Države": [
      { "name": "Albanija", "code": "24" },
      { "name": "Australija", "code": "59" }
    ]
  }
}
```

> [!NOTE]
> Porijeklo i značenje vrijednosti `code` trenutno nisu dokumentovani. Kodovi su jedinstveni unutar BiH dijela, ali kodovi država u `Van BiH` su zaseban skup i nisu ISO kodovi, pa ih ne miješajte sa kodovima mjesta. Lista `Države` uključuje i samu Bosnu i Hercegovinu.

## Kako koristiti

Raw URL (razmak u nazivu fajla je kodiran kao `%20`):

```
https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json
```

Za produkciju je bolje fajl kopirati u svoj projekat nego ga učitavati sa GitHuba pri svakom zahtjevu.

### JavaScript

```js
const url =
  "https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json";

const data = await (await fetch(url)).json();

// Svi gradovi i općine u BiH (bez država van BiH)
const mjesta = Object.entries(data)
  .filter(([grupa]) => grupa !== "Van BiH")
  .flatMap(([, podgrupe]) => Object.values(podgrupe).flat());

console.log(mjesta.length); // 138
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

## Kako doprinijeti

Doprinosi su dobrodošli. Ubacite ovo u ChatGPT i generišite još JSON-a kakvih hoćete, ili ispravite postojeće podatke, i slobodno pošaljite da ubacimo ovdje:

1. Napravite fork repozitorija.
2. Napravite novi branch (npr. `ispravka-hnk`).
3. Uredite podatke i zadržite postojeći format: ista struktura, polja `name` i `code` kao stringovi, validan JSON.
4. Otvorite pull request sa kratkim opisom izmjene i, ako možete, izvorom podataka.

Molim vas da ne mijenjate naziv postojećeg fajla, jer ga drugi projekti možda učitavaju preko raw linka. Novi skupovi podataka mogu ići u nove fajlove.

## Napomena o podacima

Podaci su prikupljeni ručno i mogu biti nepotpuni ili zastarjeli. Prije upotrebe u službene ili pravne svrhe provjerite ih u zvaničnim izvorima (npr. Agencija za statistiku BiH, zavodi za statistiku entiteta).

## Licenca

Licenca još nije definisana.
