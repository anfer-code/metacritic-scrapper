# Resumen

## Objetivo actual

Obtener el HTML de Metacritic y extraer con Cheerio los datos de las cards de juegos dentro de los elementos que usan `data-testid="filter-results"`.

## Flujo actual

1. `index.ts` obtiene el HTML con `getAllGamesData()`.
2. `src/utils/get-card-game-info.ts` carga el HTML con Cheerio.
3. Se recorren todos los nodos `[data-testid='filter-results']`.
4. De cada card se extraen estos campos:

- `title`
- `url`
- `score`
- `image`

## Selectores usados

- card: `[data-testid='filter-results']`
- titulo: `[data-testid='product-title']`
- enlace: `a[href]`
- imagen: `[data-testid='product-image'] img`
- score: texto numérico detectado dentro de la card

## Resultado validado

Se ejecutó el scraper con:

```bash
npx ts-node index.ts
```

Resultado observado:

- total de cards parseadas: `24`
- cobertura de `url`: `24/24`
- cobertura de `image`: `24/24`

## Primeras 10 cards detectadas

| # | Titulo | Score |
|---|--------|-------|
| 1 | The Legend of Zelda: Ocarina of Time | 99 |
| 2 | SoulCalibur | 98 |
| 3 | Grand Theft Auto IV | 98 |
| 4 | Super Mario Galaxy | 97 |
| 5 | Super Mario Galaxy 2 | 97 |
| 6 | The Legend of Zelda: Breath of the Wild | 97 |
| 7 | Tony Hawk's Pro Skater 3 | 97 |
| 8 | Perfect Dark (2000) | 97 |
| 9 | Red Dead Redemption 2 | 97 |
| 10 | Grand Theft Auto V | 97 |

## Estado actual

El proyecto ya no imprime el HTML crudo. Ahora devuelve una colección de cards parseadas lista para exportarse a JSON, CSV o persistirse en una base de datos.