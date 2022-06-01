## Installation BE

```bash
cd tesTPA-BE
composer install
cp .env.example .env
php artisan key:generate
```
change the database connection to your local database connection
```bash
php artisan migrate
php artisan serve
```

## Installation FE

```bash
cd testTPA-FE
npm install
cp .env.example .env
set API_URL <your_local_domain/api>
npm run dev
```
