# BiH gradovi i mjesta

Nakon sati i sati pretraživanja po internetu, shvatila sam koliko je teško doći do ovakve liste kada praviš svoj app, platformu, šta god. Zato ostavljam jedan jedini JSON fajl za sve studente i programere početnike.

**Fajl:** [`kantoni i mjesta u BiH.json`](./kantoni%20i%20mjesta%20u%20BiH.json)

## Šta sadrži

| Grupa | Podgrupe | Broj |
| --- | --- | ---: |
| Federacija BiH | 10 kantona | 79 |
| Republika Srpska | 4 regije | 64 |
| Brčko Distrikt | | 1 |
| **Ukupno u BiH** | | **144** |
| Van BiH | Države | 39 |

Struktura: entitet → kanton/regija → lista `{ "name", "code" }`.

```json
{
  "Federacija BiH": {
    "Unsko-sanski kanton": [
      { "name": "Bihać", "code": "3" }
    ]
  }
}
```

## Korištenje

```js
const url = "https://raw.githubusercontent.com/azra212/BiH_Gradovi_Mjesta/main/kantoni%20i%20mjesta%20u%20BiH.json";
const data = await (await fetch(url)).json();
```

## Napomene

- Izvori za broj jedinica: [FZS šifarnik FBiH (2019)](https://fzs.ba/wp-content/uploads/2020/01/Sifarnik-JLS-i-naseljenih-mjesta-u-F-BiH_stanje31122019.pdf) i [RZS RS, Gradovi i opštine 2023](https://www.rzs.rs.ba/static/uploads/bilteni/gradovi_i_opstine_republike_srpske/2023/Gradovi_I_Opstine_Republike_Srpske_2023_WEB.pdf).
- Regije RS i `code` vrijednosti nisu službene. Šest naknadno dodanih jedinica nema kod.
- Ispravke i dopune su dobrodošle kroz pull request.

## Licenca

[MIT](./LICENSE)
