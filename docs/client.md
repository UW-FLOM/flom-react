# Client overview
This document is intended for anyone wanting to contribute to the client code in the FLOM project.
It describes the basic architecture of the app and how the various components fit together.

## App architecture
The FLOM survey app consists of a couple classes to bootstrap execution and set up routing, a main `SurveyPage` class which handles fetching survey definitions from the server, progressing them, and submitting answers, and activity classes that define what happens in each activity.

Routing happens client-side. 
The `App` class interprets the URL and instantiates the right page (usually the `SurveyPage`) with the arguments from the URL passed to it.

Api calls are all made through `/services/api.js`.
Each endpoint the app can talk to on the server is wrapped in a function call there that returns a promise.

Components are styled using `styled-components`, a library that isolates styles to each component. Global css should be avoided. 

> Note that there are a couple of css files used in the top-level components: `index.css`, and `bootstrap/dist/css/bootstrap.css`. 
These are exceptions to the global style rule. 
`index.css` sets up the most basic global styles and `bootstrap/dist/css/bootstrap.css` is necessary for the bootstrap components which do not use `styled-components`

The following sections go in to detail about the important parts of the client app, broken up by a few different types:
* **[Top-level components](#top-level-components)** get the app started and instantiate the other components.
* **Pages** are the main view containers of the app. 
They are responsible for most of the logic, calling services, and instantiating other components.
* **components** are re-usable view components.
* **services** are the API layer.
These represent API calls that can be made to the app server.
* **activities** represent the various survey activities available to build surveys with.

## Top-level components

### index.js
This is the entry point to the app. It doesn't do much but provide a router and instantiate the `App` class.

### App.js
`App` mostly sets up routes for the survey app.
It handles client-side routing, parsing the URL and passing relevant args to the child pages.
This component makes heavy use of `react-router`, doc's for which can be found here:
[react-router](https://reacttraining.com/react-router/).

Given that this component mostly serves to instantiate page components based on the URL, it is pretty simple. 
It Creates a `react-router` `Switch` component, declaring possible routes and enumerating which page component to show for which URL.

Most routes in the app are `/survey` routes which instantiate a `SurveyPage` with the correct arguments. There are 2 exceptions:
* **`/`**: the root route when no URL is specified points to the `HomePage`. 
`HomePage` is just a redirect page which shows no content, but decides what other page to send the user to. 
The result of `/` rendering the `HomePage` is that users who hit the base URL of the app are usually re-directed to the survey found in the deployed app. 
If more than one survey is deployed on the app instance, `HomePage` will instead redirect to the `/surveys` page, which shows a list of them.
* **`/surveys`**: shows a list of links to the surveys available on the current app instance.

The most important routes in the app are the `/survey` routes.
Each of these instantiates a `SurveyPage` component and passes any relevant URL information to it--for example, which survey to run based on the URL. Available `/survey` routes are:
* **`/survey/:surveyId`**: routes the the landing page for the specified survey. Note that `:surveyId` denotes a URL variable, it will make the variable `surveyId` available to the `SurveyPage` instantiated by this route. For example, if a user navigates to `/survey/someGreatSurvey`, a `SurveyPage` will be instantiated and passed `someGreatSurvey` as the `surveyId` in its URL properties.
* **`/survey/:surveyId/session/:sessionId`**: once a user has begun a survey, a `sessionId` is created and passed to the `SurveyPage` along with the survey id. `SurveyPage` uses `sessionId` to track what has been complete in the session, and send answers to th database as part of the session.
* **`/survey/:surveyId/session/:sessionId/activity/:activityIdx`**: as a user moves through activities in a survey, the `activityIdx` in the URL is incremented and passed to the `SurveyPage` by this route. `SurveyPage` uses `activityIdx` to determine which activity in the survey the user is on.
* **`/survey`**: the `/survey` route with no arguments renders the `HomePage` which, as described above, redirects to a survey or list of surveys.

>**What to do with App.js**: App.js is where to add new routes. 
If the flom app needs to render s new top-level page that is not the survey page, or new sub-components of the `survey` route, passing different arguments, `App.js` is where to declare these new routes.

### util.js
`util.js` is a place to put common utility functions. 
It contains one important function in particular `idFromString` which is used to creates an id out of an english string by removing spaces and special characters and converting to lower case. 
These ids are used to identify surveys, activities, and questions on both the server and the client.
Unfortunately, in the current architecture, this function is duplicated on the server and client and should not be changed in either place.

### Other files at the root
* **`App.css`** is a small css file that adds 100% width and height to the app. Global styles should be avoided and it is best not to add anything to this file.
* **`App.test.js`** shows an example of how to start setting up tests for this app's components. 
In the first version, no tests have been added.
* **`index.css`** has a little more global css. It should not be added to.
* **`registerServiceWorker.js`** is a caching helper provided by create react app. It shouldn't be necessary to change it.

## Pages
Pages represent the main view components.
In general, each looks at the URL arguments passed to it through react router (sometimes none), fetches the necessary data from the server by calling the right services, and renders it's sub components with the data fetched.

Pages are also responsible for most of the logic as well as calling the necessary services to send data back to the server.

### SurveyPage 
`SurveyPage.js` is the heart of the app. 

#### `SurveyPage.handleSubmit` data formats

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