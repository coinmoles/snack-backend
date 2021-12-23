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

You need an env file for features that use the database. Make a database account first and make an `.env` file with credentials.
```shell
$ touch .env
$ cat <<EOF> .env
PORT=(Your port)
DB_CONNECTION_URI=(Your DB connection uri)
API_KEY=(Your API key)
EOF
```

Start the server

``` shell
$ npm start
```

[The app](http://localhost:9302) runs on port 9302 on localhost.

[The app](https://snack-backend.herokuapp.com/) is currently hosted via heroku at https://snack-backend.herokuapp.com/

## API docs

### `/snack`

- GET
  - GETs every snack data stored in DB

  - parameters: None

  - returns
    
    ```
    [
      {
        "year": "연도",
        "month": "월",
        "day": "일",
        "snack": "간식 정보"
      },
    ]
    ```

- DELETE
  - DELETEs every snack data stored in DB

  - reauires api key to use

  - parameters: None
  
  - returns
    
    ```
    {
      status: "success" | false
    }
    ```

### `/snack/daily`

- GET
  - GETs the snack data of the day

  - parameters: year, month, day
    ```
    year: 연도
    month: 월
    day: 일

    example:
    {
      year: 2021,
      month: 2,
      day: 8
    }
    ```

  - returns
    
    ```
    [
      {
        "year": "연도",
        "month": "월",
        "day": "일",
        "snack": "간식 정보"
      },
    ]
    ```

- DELETE
  - DELETEs the snack data of the day

  - reauires api key to use

  - parameters: year, month, day
    ```
    year: 연도
    month: 월
    day: 일

    example:
    {
      year: 2021,
      month: 7,
      day: 31
    }
    ```

  - returns
    
    ```
    {
      status: "success" | false
    }
    ```

- POST
  - register a snack data of the day

  - requires api key to use

  - parameters: year, month, day, snack

    ```
    year: 연도
    month: 월
    day: 일
    snack: "등록할 간식 정보"

    example:
    {
        year: 2021,
        month: 12,
        day: 23,
        snack: "스태프핫도그\n데미소다"
    }
    ```
  
  - returns
    ```
    {
      status: "success" | false
    }

### `/snack/monthly`

- GET
  - GETs every snack data of the month

  - parameters: year, month
    ```
    year: 연도
    month: 월
    
    example:
    {
      year: 2021,
      month: 10
    }
    ```

  - returns
    
    ```
    [
      {
        "year": "연도",
        "month": "월",
        "day": "일",
        "snack": "간식 정보"
      },
    ]
    ```

- DELETE
  - DELETEs every snack data of the month

  - reauires api key to use

  - parameters: year, month
    ```
    year: 연도
    month: 월

    example:
    {
      year: 2021,
      month: 10
    }
    ```

  - returns
    
    ```
    {
      status: "success" | false
    }
    ```

### `/snack/yearly`

- GET
  - GETs every snack data of the year

  - parameters: year
    ```
    year: 연도

    example:
    {
      year: 2021
    }
    ```

  - returns
    
    ```
    [
      {
        "year": "연도",
        "month": "월",
        "day": "일",
        "snack": "간식 정보"
      },
    ]
    ```

- DELETE
  - DELETEs every snack data of the year

  - reauires api key to use

  - parameters: year
    ```
    year: 연도

    example:
    {
      year: 2021
    }
    ```

  - returns
    
    ```
    {
      status: "success" | false
    }
    ```
