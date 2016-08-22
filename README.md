# Imgar - Lokaverkefni í Vefforritun 2015
### eftir Daníel Adolfsson, Jianfei Zheng og Ricky Hiển Tường
***

[Hér](https://imgar.herokuapp.com/) má nálgast vefsiðuna.
Verkefnið á github má nálgast [hér](https://github.com/DanniD3/imgar)
***

Við völdum okkur sem lokaverkefni að búa til vefsíðu þar sem notandi getur hlaðið inn mynd og deilt með öðrum. Þegar mynd hefur verið hlaðið inn, birtist deilanlegur hlekkur með myndinni. Hægt er að skrifa athugasemdir við myndir, en það geta einungis notendur gert sem skráðir eru inn.

Verkefnið er í raun byggt á 'Imgur', sem hægt er að skoða [hér](www.imgur.com)


## Uppsetning
gert er ráð fyrir að postgres og pgAdmin sé nú þegar til staðar, til að fá gagnagrunninn í gang þarf að gera eftirfarandi:

búa til **database** 'imgar'
búa til **tables** og **roles** í 'imgar' með því að keyra create.sql skráni í 'imgar' gagnagrunninum.

Til að setja upp vefsiðuna þarf að gera eftirfarandi í command line:
```
npm install
```
siðan
```
gulp
```
þá er hægt að nálgast vefsiðunu á [localhost:3000](loalhost:3000)
## Lausn
Verkefnið var gert með node.js og voru ýmsir pakkar notaðir til stuðnings verkefnisins:
```
  "dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "dotenv": "^1.2.0",
    "express": "~4.13.1",
    "express-session": "^1.12.1",
    "gulp-live-server": "0.0.29",
    "jade": "~1.11.0",
    "moment": "^2.10.6",
    "morgan": "~1.6.1",
    "multer": "^1.1.0",
    "pg": "^4.4.3",
    "serve-favicon": "^2.3.0",
    "xss": "^0.2.7"
  },
  "devDependencies": {
    "chai": "^3.3.0",
    "gulp": "^3.9.0",
    "gulp-env": "^0.2.0",
    "gulp-jadelint": "^0.1.0",
    "gulp-jshint": "^1.11.2",
    "gulp-livereload": "^3.8.1",
    "gulp-mocha": "^2.1.3",
    "gulp-nodemon": "^2.0.4",
    "gulp-open": "^1.0.0",
    "jshint-stylish": "^2.0.1",
    "mocha": "^2.3.3"
    }
```
Við höfðum imgur.com til hliðsjónar við útfærslu vefsiðunnar, en fórum þó okkar eigin leið þegar við töldum hana fljótlegri í vinnslu eða flottari að okkar mati, til dæmis er viðmótið ólíkt þegar notendur skrá sig inn. Virknin er svipuð og í verkefni 1-6.

## Hvað hefði betur mátt fara
Áhærla okkar á virnki vefsiðunnar hefði mátt dreifast betur þar sem ekki fór nóg mikil tími í útlit siðunar, en er útlitið þó ásættanlegt (að okkar mati).
Við hefðum mátt eyða meiri tíma í gerð vefsiðunnar, en við reyndum að forgangsraða önnur verkefni í skólanum.

**tl;dr:** '*clone*' af imgur.com unnið með node.js sem fékk ekki eins mikla **ást** og átti skilið.
