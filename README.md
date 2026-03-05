# Personal Postcard

Небольшой сайт-открытка на Vue 3 + Vite.

## Локальный запуск

```bash
cd client
yarn 
yarn dev
```

## Деплой на GitHub Pages

Автодеплой настроен через GitHub Actions: `.github/workflows/deploy-pages.yml`.

Что нужно сделать в GitHub один раз:
1. `Settings -> Pages`
2. В `Build and deployment` выбрать `Source: GitHub Actions`

После этого каждый `push` в `main` будет публиковать сайт на GitHub Pages.
