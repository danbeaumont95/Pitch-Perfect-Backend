# APIs

## /

```

    GET /
    response
    {
        description:
            Welcome to Pitch Perfect API, please follow the link below to access JSON object containing all of the available endpoints,
        apiPath:
            https://pitch-perfect-api.herokuapp.com/api
    }
```

## /api

    GET /api
    {
        description: {
            all endpoints on page you're reading
        }
    }

## /users

```

    GET /users/:user_id
    exampleResponse
    {
        user: {
            username,
            camping_history: [{date, campsite_name, votes}]
        }
    }


    POST /users
    examplePostBody
    {
        username,
        password,
        firstname,
        lastname
    }
    exampleResponse
    {
        user: {
            username
        }
    }

```

## /reviews

```

    GET /reviews/:place_id
    exampleResponse
    {
        reviews: [{username, review}]
    }

    POST /reviews/:place_id
    examplePostBody
    {
        username,
        campsite_name,
        review,
        created_at
    }
    exampleResponse
    {
        review: {username, review, created_at}
    }

    DELETE /reviews/:place_id
    example post body
    {
        username,
        review_id
    }

```

## /camping_history

```

    POST /camping_history
    examplePostBody
    {
        username,
        date,
        place_id,
        votes
    }
    exampleResponse
    {
        camping_history: {
            username,
            date,
            campsite_name,
            votes
        }
    }

```

## /campsites

```

    PATCH /campsites/:place_id
    examplePostBody
    {
        place_id,
        votes
    }

    {
        votes: {votes}
    }

    GET /campsites/:place_id
    exampleResponse
    {
        campsite: {
            campsite_name,
            owner_name,
            campsite_address,
            booked_dates,
            votes,
        }
    }

    GET /owner_username/campsites/
    exampleResponse
    {
        campsites: [{
            campsite_name,
            owner_name,
            campsite_address,
            booked_dates,
            votes,
        }]
    }

```

## /login

```

POST /api/login
examplePostBody
{
username,
password,
isUser
}

```

## /owners

```

    GET /api/owners
    exampleResponse
    [{
        owner_username,
        firstname,
        lastname,
        avatar_url
    }]

```

```

```
