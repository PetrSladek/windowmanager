# Spravce oken
Spravce oken je mala knihovna umoznujici pohzbovat s okny, zvětšovat a zmenšovat je, případně je maximalizovat v rámci své plochy.

## Pripojeni do stránky
Pro přidání knihovny do stránky je potřeba připojit následující soubory

```html
<!-- Styl nutny pro funkcnost spravce oken -->
<link href="windows.css" rel="stylesheet" type="text/css" media="all" />
<!-- Styl upravujici vyhled spravce oken  -->
<link href="windows-theme.css" rel="stylesheet" type="text/css" media="all" />
<!-- Javascriptova knihovna zajistujici obsluhu -->
<script type="text/javascript" src="windows.js"></script>
```

## Plochy a okna
Plochou se stane každý blokový HTML element, kterému nastavíme třídu `class="desktop"`. Oknem poté každý jeho potomek s třídou `class="window"`

Příklad
```html
<div class="desktop" style="width: 800px; height: 800px">
  <div class="window">Obsah prvního okna</div>
  <div class="window">Obsah druhého okna</div>
</div>
```
Plochám i oknům je možné vlasními CSS styly nastavit velikost či cokoliv jiného

## Okna s titulkem
Pokud chceme mít u oken hlavičku s titulkem, ikonou a tlačítky pro zavírání a maximalizaci musíme použít následující kód

```html
<div class="window" id="myWindow1">
    <div class="window-header">
        <div class="pull-left">
            <img class="window-header-icon" src="icon.png" alt="." /> Titulek okna
        </div>
        <div class="pull-right">
            <a href="#myWindow1" data-window="toggle-maximalize"><i class="icon-toggle-maximalize"></i></a>
            <a href="#myWindow1" data-window="close"><i class="icon-close"></i></a>
        </div>
    </div>
    <div class="window-content">
        Obsah okna!
    </div>
</div>
```
Každý odkaz `<a>..</a>` s atributem `data-window="close"` zavře okno jehož ID j v atributu `href`. To znamená že do obsahu libovolného okna, plochy či kamkoliv jinam můžeme umístit tlačítko na zavření konkrétího okna.

Stejně to funguje i pro tlačátko na Maximalizaci/Obnovení okna. Tuto funkci vykoná odkaz s atributem `data-window="toggle-maximalize"`.

Hlavička okna je nastylovaná ve výchozím theme stylu. Obrázkek ikony okna je třeba volžit dle ppředchozí ukázky.

## Autor
Petr Sládek
xslade12@stud.fit.vutbr.cz

