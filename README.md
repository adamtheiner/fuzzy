# FuzzyLogic
>Predmetom fuzzy logiky je možnosť uvažovania v podmienkach nejasnosti, neostrosti a ich aplikácie v počítačových systémoch.

[Demo :arrow_forward:](https://adamtheiner.github.io/fuzzy/)

## Praktický príklad systému založeného na fuzzy logike
Vytvoríme jednoduchý fuzzy riadiaci systém na riadenie prevádzky práčky, aby fuzzy systém riadil pranie, príjem vody, čas prania a rýchlosť odstreďovania.
Vstupnými parametrami sú objem odevov, stupeň znečistenia a druh nečistôt. Zatiaľ čo objem oblečenia by určoval príjem vody, stupeň znečistenia by sa zase určoval priehľadnosťou vody a druh nečistôt by sa určoval v čase, keď sa farba vody nezmení.

### Prvým krokom je definovanie jazykových premenných a pojmov.

*Pre vstup sú uvedené lingvistické premenné:*

* Typ znečistenia: {Greasy, Medium, Not Greasy} (mastné, stredné, nemastné)
* Stupeň znečistenia: {Large, Medium, Small} (vysoký, stredný, nízky)

*Výstupné premenné sú uvedené nižšie:*

* Čas prania: {Short, Very Short, Long, Medium, Very Long} (krátky, veľmi krátky, stredný, dlhý, veľmi dlhý).

### Druhým krokom je vybudovanie členských funkcií.

Nižšie sú uvedené grafy, ktoré definujú členské funkcie pre dva vstupy.

*Funkcie spojitosti pre stupeň nečistôt:*

![Image greasy](https://github.com/adamtheiner/fuzzy/blob/master/files/fuzzy5.jpg?raw=true)

*Funkcie pre typ znečistenia:*

![Image mud](https://github.com/adamtheiner/fuzzy/blob/master/files/fuzzy4.jpg?raw=true)

### Tretí krok zahŕňa vypracovanie súboru pravidiel pre vedomostnú základňu.

Toto je sada pravidiel používajúcich logiku IF-THEN:

* IF stupeň znečistenia Small a typ znečistenia Greasy, THEN Čas prania Long.
* IF stupeň znečistenia Medium a typ znečistenia Greasy, THEN Čas prania Long.
* IF stupeň znečistenia Large a typ znečistenia Greasy, THEN Čas prania Very Long.
* IF stupeň znečistenia Small a typ znečistenia Medium, THEN Čas prania Medium.
* IF stupeň znečistenia Medium a typ znečistenia Medium, THEN Čas prania Medium.
* IF stupeň znečistenia Large a typ znečistenia Medium, THEN Čas prania Medium.
* IF stupeň znečistenia Small a typ znečistenia Non-Greasy, THEN Čas prania Very Short.
* IF stupeň znečistenia Medium a typ znečistenia Non-Greasy, THEN Čas prania Medium.
* IF stupeň znečistenia Large a typ znečistenia Greasy, THEN Čas prania Short.

### Štvrtý krok. Hebbove pravidlá.

Na internete nájdete v rôznych učebniciach a knihách o teórii neurónových sietí rôzne formulácie Hebbovho pravidla.
Napríklad Wikipedia nám dáva dve Hebbove pravidlá:
* **Prvé Hebbovo pravidlo** — Ak je signál perceptrónu nesprávny a je rovný nule, je potrebné zvýšiť hmotnosť tých vstupov, na ktoré sa jednotka použila.
* **Druhé Hebbovo pravidlo** — Ak je signál perceptrónu nesprávny a rovná sa jednotke, je potrebné znížiť hmotnosť tých vstupov, na ktoré bola jednotka použitá.

Правило Хебба основано на правиле, согласно которому 
весовой вектор увеличивается пропорционально входному и обучающему (или выходному) сигналам.
Веса увеличиваются путем добавления произведения ввода и вывода к старому весу:

**W (nové) = w (staré) + x * y**

Máme teda tri uzly v zjednodušenom modeli stroja: dva pri vstupe (stupeň mastnoty, sila alebo množstvo znečistenia) a jeden pri výstupe (čas prania). Tieto uzly budeme nazývať neurónmi pre pohodlie ďalšej práce.
Tieto neuróny spracovávajú údaje tak, aby sa dosiahol požadovaný výsledok. Uzly alebo neuróny sú spojené vstupmi, váhami pripojenia a aktivačnými funkciami.
Hlavnou charakteristikou neurónovej siete je jej schopnosť učiť sa. Neurónové siete sú trénované na dobre známych príkladoch. Akonáhle je sieť vyškolená, môže sa použiť na riešenie problémov.

Chceme prinútiť Hebbovú sieť rozlišovať stupeň a množstvo znečistenia (podľa údajov so senzorov priehľadnosti vody na začiatku umývania a po určitom čase). Budeme potrebovať Hebbovské spojenia medzi dvoma vstupnými uzlami a jedným výstupom. Toto je najjednoduchší model „plochej“ umelej neurónovej sietie. Počiatočné hmotnosti sieťových spojení sú inicializované náhodnými hodnotami od 0 do 1, pretože na začiatku stroj stále nemôže vedieť, aké silné je znečistenie a aký je stupeň mastnoty.
Po inicializácii uzlov môžete začať trénovať sieť: údaje zo senzorov privádzame na vstup uzlov (v mojom modeli ide o posuvníky * range * pre nelineárny výpočet alebo rozbaľovacie zoznamy s voľbou * select * pre lineárne) a podľa toho upravujeme uzly. To vedie k problému výberu pravidiel odbornej prípravy. Ak použijeme iba myšlienku posilnenia väzieb (bez použitia obmedzenia väzieb), musíme použiť vzorec:

**dw = n * ai * aj**, kde:

**dw** – zmena hmotnosti uzla medzi vstupným prvkom **i** a výstupným prvkom **j**,
**ai** – úroveň signálu na vstupnom prvku **i**,
**aj** – úroveň signálu na výstupnom prvku **j**,
**n** – konštantný faktor chrániaci pred príliš veľkými zmenami v hmotnosti uzlov.

Je zrejmé, že keď sú hodnoty vstupných a výstupných údajov väčšie ako 0, váhové koeficienty sa nemôžu znižovať - preberajú stále väčšie a väčšie hodnoty. Tu je potrebné rozšíriť (vylepšiť) pravidlo Hebb. Ak sa vyššie uvedený vzorec pozmení na:

**dw = n(2ai - 1) aj**,

potom sa hmotnosť zníži, keď sú aktivity vstupných prvkov menšie ako 0,5 ( 2ai-1 dá záporné číslo). Táto situácia sa nazýva Post-Not-Pre LTD (* post-nepresynaptické potlačenie dlhodobej komunikácie *) v tom zmysle, že váha spojenia sa zníži s neaktívnym presynaptickým neurónom a aktívnym postsynaptickým neurónom.

Hebbove pravidlá nehovoria o tom, že by dokázali brať váhy s negatívnymi hodnotami alebo zvyšovať ich do nekonečna. Ak je potrebné obmedzenie, je potrebné pridať niekoľko riadkov kódu:

```javascript
if (strengths > 1) {strengths = 1};
if (strengths < 0) {strengths = 0};
```

V mojom modeli také obmedzenie nie je potrebné, pretože počiatočné údaje sú jasne obmedzené hodnotami od 0 do 1.

Nezabúdame na potrebu vyzvať aktualizáciu váh určitú množstvo opakovaní * iterations *, tak aby sa hmotnosti nakoniec zmenili na ich konečné hodnoty.

Neurónové Hebbovské siete sa zvyčajne učia veľmi pomaly. Môžeme sa ubezpečiť, že vstupy sa často musia predkladať tisíckrát, a napriek tomu sa sieť nemusí učiť správne. Ak napríklad existuje 8 tréningových príkladov, budete musieť predložiť jeden príklad, upraviť váhy a zopakovať postup pre všetky ostatné príklady a potom tento cyklus opakovať a opakovať toľkokrát, koľko je potrebné na dosiahnutie správnych výsledkov.
