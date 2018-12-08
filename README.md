# Flom in React
This is a react version of the FLOM project. There are only a couple prerequisties:

* [yarn](https://yarnpkg.com/en/)
* [node](https://nodejs.org/en/) 

# Getting started
To run the project in development mode, clone this repo, then from the repo root:

```
cd client
yarn install
yarn start
```
This will run the development server on your local machine. By default you
can see the app by going to *localhost:3000*

# Running the app
In development, run the dev server, the prod server, and psql.
The dev server is set up to proxy REST calls to the production server, which talks to postgress.

To run the dev server:
```
cd client
yarn start
```

To run the production server:

```
cd server
yarn install
yarn server
```

Start postgress:
```
yarn psql:start
```
If you control the environment and you want to start everything at once:
```
yarn start:all
```

It's a good idea to shut down postgres when you are done:
```
yarn psql:stop
```

# Development

## Data Formats

### SurveyPage: `SurveyPage.handleSubmit`.

Form questions:

```
{
  "what_is_your_gender_": {
    "type": "select",
    "indexInActivity": 0,
    "response": "Female"
  },
  "how_old_are_you_": {
    "indexInActivity": 1,
    "type": "text",
    "response": "55"
  },
  "what_is_the_highest_level_of_school_you_have_completed_": {
    "type": "select",
    "indexInActivity": 2,
    "response": "high_school"
  }
}
```

Map questions:

```
{
    "draw_new_england": {
      "type": "area",
      "indexInActivity": 0,
      "response": <geoJson>
    },
    "draw_the_south": {
      "type": "area",
      "indexInActivity": 1,
      "response": <geoJson>
    }
}
```

### MapTool
The map tool holds no geo data state (it does have state for position and zoom).
It get's passed geometry and returns raw goemetry through its `onFeatureDrawn` callback. It returns and array of objects containing a `type` field denoting type and a `geometry` field containing the raw data.

#### Supported map tool return types:
* `polygon`
```
{ 
  type: "polygon",
  geometry: [
    [44.5, 77.7],
    [66.7, 45.6],
    [120, 56]
  ]
}
```

*Note that multi-shape polygons are not supported*

### MapActivity 
For geo-based questions, the map activity stores a `response` in state as an array 
of very simple geo objects.

#### Supported MapActivity types
* `polygon`
```
[
  {
    polygon: [
      [ 
        [x, y],
        [z, a],
        [b, c]
      ]
    ]
    otherAttr: "some other attribute",
    ...
  }
]
```
