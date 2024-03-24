# Boo.world

## Requirements (versions used while developing)

-   `Node.js: v18.19.1`
-   `NPM: 10.2.4`
-   `Postman: 10.24.7`
-   `OS: MacOS Sonoma 14.4 (UNIX-based)`
-   `VSCode: 1.87.2`

## How to install

-   Firstly clone the repository to your machine with:
    ```sh
      $ git clone https://github.com/joaocasarin/boo.world.git
    ```
-   Enter the folder and install dependencies with:

    ```sh
      $ cd boo.world
      $ nvm use
      $ npm install
    ```

-   Create a file to keep the environment variables used with:
    ```sh
      $ cp .env.example .env
    ```

## How to use on Postman

-   Open Postman
-   Choose `Import` on the top-left side of the UI
-   Drag the collection available in the root of the project to Postman

## How to run automated tests

-   Run following command:
    ```sh
      $ npm run test
    ```

## How to start server

-   Start the API with:
    ```sh
      $ npm run dev
    ```

## Available API routes

-   Create a profile on

```sh
POST localhost:3000/profiles
```

```json
// body
{
    "name": string,
    "description": string?,
    "mbti": string?,
    "enneagram": string?,
    "variant": string?,
    "tritype": number?,
    "socionics": string?,
    "sloan": string?,
    "psyche": string?
}
```

-   Render profile page by ID on

```sh
GET localhost:3000/:profileId
```

-   Get profile details by ID on

```sh
GET localhost:3000/profiles/:profileId?sortBy=(best|recent)&filterBy=(mbti|enneagram|zodiac)
```

-   Get all profiles details on

```sh
GET localhost:3000/profiles?sortBy=(best|recent)&filterBy=(mbti|enneagram|zodiac)
```

-   Create a comment on profile on

```sh
POST localhost:3000/profiles/:profileId/comments
```

```json
// body
{
    "title": string,
    "authorId": string,
    "comment": string,
    "mbti": string?,
    "enneagram": string?,
    "zodiac": string?
}
```

-   Get comments from profile by ID on

```sh
GET localhost:3000/profiles/:profileId/comments
```

-   Like/unlike comment on

```sh
PUT localhost:3000/comments/:commentId/react
```

```json
// body
{
    "profileId": string,
    "reaction": string (like | unlike)
}
```

## First observations

-   All IDs are UUIDv4. I opted using it instead of Mongo's default `_id` because it is more common using it than ObjectID elsewhere.
-   TypeScript could help with the organization of models/schemas/interfaces and objects and fields validation.
-   The default image URL is not working since the start.
