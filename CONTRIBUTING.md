# Kako doprinijeti

Hvala što želiš pomoći. Najkorisniji doprinosi su ispravke podataka uz provjerljiv izvor.

## Prijava greške u podacima

Otvori issue preko šablona **Ispravka podataka** i navedi šta je pogrešno, kako bi trebalo biti i link na zvanični izvor (zakon, službeni glasnik, zavod za statistiku).

## Pull request

1. Napravi fork i novi branch, npr. `fix/hnk-naziv-opcine`.
2. Uredi `kantoni i mjesta u BiH.json`:
   - ne mijenjaj naziv fajla ni strukturu (drugi projekti ga učitavaju preko raw linka);
   - svaka stavka je `{ "name": "...", "code": "..." }`, oba polja su stringovi;
   - za novu stavku bez poznatog koda koristi `"code": ""`;
   - zadrži postojeće uvlačenje i abecedni redoslijed unutar grupe.
3. Ako se mijenja broj jedinica, ažuriraj `EXPECTED` u `scripts/validate.mjs` i navedi izvor.
4. Pokreni provjere i regeneriši izvedene formate (potreban je Node.js 20+, bez dodatnih paketa):

   ```sh
   npm run build    # regeneriše dist/
   npm run check    # validacija + provjera da je dist/ ažuran
   ```

5. Dodaj stavku u `CHANGELOG.md` pod **Unreleased**.
6. Otvori PR sa kratkim opisom i izvorom podataka.

## Nove liste

Novi skupovi podataka (npr. naseljena mjesta, poštanski brojevi) idu u nove fajlove, uz kratko objašnjenje izvora u PR-u. Postojeći fajl ostaje kakav jeste.

## Stil

- Commit poruke po [Conventional Commits](https://www.conventionalcommits.org/) (`fix(data): ...`, `docs: ...`, `feat: ...`).
- Fajl `dist/` se ne uređuje ručno, uvijek se generiše skriptom.
