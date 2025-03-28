## Description

Your task is to create an API on top of a couple different databases.  It should conform to the user stories provided below.  You are free to use whatever language you prefer, however our tech stack features NodeJS, Java and Ruby. If you're comfortable with any of these, try to favor them.  Google and the interwebs are at your disposal.

## User Stories

#### List All Movies
AC:

* An endpoint exists that lists all movies
* List is paginated: 50 movies per page, the page can be altered with the `page` query params
* Columns should include: imdb id, title, genres, release date, budget
* Budget is displayed in dollars

API Endpoints:
* http://localhost:3000/movies
* http://localhost:3000/movies ?page=<page_no>&limit=<page_limit>


#### Movie Details
AC:

* An endpoint exists that lists the movie details for a particular movie
* Details should include: imdb id, title, description, release date, budget, runtime, average rating, genres, original language, production companies
* Budget should be displayed in dollars
* Ratings are pulled from the rating database

API Endpoints:
* http://localhost:3000/movies/559
* http://localhost:3000/movies/<movie_id>

#### Movies By Year
AC:

* An endpoint exists that will list all movies from a particular year
* List is paginated: 50 movies per page, the page can be altered with the `page` query params
* List is sorted by date in chronological order
* Sort order can be descending
* Columns include: imdb id, title, genres, release date, budget

API Endpoints:
* http://localhost:3000/movies? page=<page_no>&limit=<page_limit>&filter=year:$eq:2018
* http://localhost:3000/movies? page=<page_no>&limit=<page_limit>&filter=year:$eq:\<year>

#### Movies By Genre
AC:

* An endpoint exists that will list all movies by a genre
* List is paginated: 50 movies per page, the page can be altered with the `page` query params
* Columns include: imdb id, title, genres, release date, budget

API Endpoints:
* http://localhost:3000/movies? page=<page_no>&limit=<page_limit>&filter=genre:$eq:Horror
* http://localhost:3000/movies? page=<page_no>&limit=<page_limit>&filter=genre:$eq:\<genre>


## Improvements

* Multiple filter conditions - Tried combining Year and genre.
* Faced challenges to combine as Genres is a JSON array. 
* Support more filter operators - we only support $eq now
* Use Types for Production Company and Genres. Production Company JSON is not valid for some records.
* Load Config env,need more time to make it work!


##  Install dependencies

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```