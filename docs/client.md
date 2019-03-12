# Client overview
This document is intended for anyone wanting to contribute to the client code in the FLOM project.
It describes the basic architecture of the app and how the various components fit together.

## App architecture and components
The FLOM survey app consists of a couple classes to boostrap execution and set up routing, a main `SurveyPage` class which handles fetching survey definitions from the server, progressing them, and submitting answers, and activity classes that define what happens in each activity.

### index.js
This is the entry point to the app. It doesn't do much but provide a router and instantiate the `App` class.

### App.js
`App` mostly sets up routes for the survey app.
It handles client-side routing, parsing the URL and passing relevant args to the child pages.
This component makes heavy use of `react-router`, doc's for which can be found here:
[react-router](https://reacttraining.com/react-router/).

The most important routes in the app at this point are the `/survey` routes.
Each of these instantiates a `SurveyPage` component and passes any relevant URL information to it--for example, which survey to run based on the URL. Available `/survey` routes are:
* **`/survey/:surveyId`**: routes the the landing page for the specified survey. Note that `:surveyId` denotes a URL variable, it will make the variable `surveyId` available to the `SurveyPage` instantiated by this route. For example, if a user navigates to `/survey/someGreatSurvey`, a `SurveyPage` will be instantiated and passed `someGreatSurvey` as the `surveyId` in its URL properties.
* **`/survey/:surveyId/session/:sessionId`**: once a user has begun a survey, a `sessionId` is created and passed to the `SurveyPage` along with the survey id. `SurveyPage` uses `sessionId` to track what has been complete in the session, and send answers to th database as part of the session.
* **`/survey/:surveyId/session/:sessionId/activity/:activityIdx`**: as a user moves through activities in a survey, the `activityIdx` in the URL is incremented and passed to the `SurveyPage` by this route. `SurveyPage` uses `activityIdx` to determine which activity in the survey the user is on. 

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

Random Audio activity questions:
```
{
  "file_id.questionId": {
    "type": "select",
    "indexInActivity": 0,
    "response": "Female",
    "audioFile": "<url>"
  },
  "llama_mp3.are_llamas_great": {
    "indexInActivity": 1,
    "type": "text",
    "response": "55",
    "audioFile": "<url>"
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

## Activities

### MapActivity 
For geo-based questions, the map activity stores a `response` in state as an array
of very simple geo objects. 
When submitted to the server, these get converted to standard geo-json.

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

### RandomAudioActivity
`RandomAudioActivity` presents the user with a set of audio files in random order and a number of questions to answer about each of the audio clips. 
It supports form-based questions using the `FormInputRenderer`.
The basic inputs are a list of audio files, and a list of questions.
On setup, the `RandomAudioActivity` shuffles the audio files, then indexes into the suffled array as it goes through questions to achieve rough-randomness.
For each activity the same form is displayed for each clip, so the user answers the same questions for each audio clip.
The responses are stored in the database under ids made up from the audio file name and the question id: `'<audio file name>.<questionId>'`.

**NOTE:** `RandomAudioActivity` relies heavily on the [`react-sound` library](https://www.npmjs.com/package/react-sound)