# SSHS Snackbot Backend
## Setup
### prerequisities

Make sure you installed [Node.js](https://nodejs.org/) and [npm](https://npmjs.com).
When using windows, install unix tools and git bash from [git](https://git-scm.com/download/win).

### Initial setup

Clone this repository and install all dependencies:

```shell
$ git clone https://github.com/coinmoles/snack-backend.git
$ cd push-backend
$ npm i
```

Start the server

``` shell
$ npm start
```

[The app](http://localhost:9302) runs on port 9302 on localhost.

## API docs

### `/snack`

- GET
  - gets the snack data of the day

  - parameters: day

    ```
    year: number = 연도
    month: number = 달
    day: number = 일
    ```

- POST
  - register a snack data via image url
  - requires authorized html to use
  - parameters: url,

    ```
    url: "등록할 이미지 url"

    example:
    {
        "url": "https://media.discordapp.net/attachments/857511850244833300/885130560043896862/1630381819517.png?width=429&height=675"
    }
    ```



