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
* **[Pages](#pages)** are the main view containers of the app. 
They are responsible for most of the logic, calling services, and instantiating other components.
* **[Activities](#activities)** represent the various survey activities available to build surveys with.
* **[Services](#services)** are the API layer.
These represent API calls that can be made to the app server.
* **[Components](#components)** are re-usable view components.

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
* **`App.test.js`** shows an example of how to start setting up tests for this app's components. 
In the first version, no tests have been added.
* **`index.css`** has a little more global css. It should not be added to.
* **`registerServiceWorker.js`** is a caching helper provided by create react app. It shouldn't be necessary to change it.

## Pages
Pages represent the main view components.
In general, each looks at the URL arguments passed to it through react router (sometimes none), fetches the necessary data from the server by calling the right services, and renders it's sub components with the data fetched.

Pages are also responsible for most of the logic as well as calling the necessary services to send data back to the server.

### HomePage
`HomePage.js` is a re-directing page that handles the root routes of the app. 
It is responsible for redirecting to the `SurveyPage` with the correct survey populated or the `SurveyList` page if there are many surveys available.

`HomePage` calls the service `getSurveyDefinitions`, which returns the surveys from the server. If there is one survey, it redirects to `SurveyPage` with that survey.

>**What to do with HomePage.js**: Change this page to change the behavior of the app when a user goes to the root URL **`/`**. 

### SurveyListPage
`SurveyListPage.js` lists the surveys available on the system as links. It ins generally most useful at development time for survey authors who want to work on multiple surveys at once. Once the app is deployed, generally there will only be one survey and this page will not be shown.

`SurveyListPage` calls the service `getSurveyDefinitions`, which returns the surveys from the server. It renders a link to each. 

>**What to do with SurveyListPage.js**: This page is probably mostly only used by app authors or flom developers.
If there was a reason to show multiple surveys to a user, this is the page to do it.
It probably needs more explanation in that case. 

### SurveyPage 
The `SurveyPage` is the most complex component in the flom app. It is responsible for not only rendering surveys, but creating sessions, progressing through each survey, and submitting data to the server. 
Each survey consists of a list of activities. Users complete one activity at a time, then the `SurveyPage` submits the data, and moves to the next activity by updating the URL and redirecting (more on flow of control below).

`SurveyPage` gets URL arguments specifying what survey to render, what session to record the survey in, and what the current activity in the survey is. 
These arguments are:
* **surveyId**: specifies the current survey by it's id. This must correspond to a survey definition.
* **sessionId**: denotes the current session. Each run through the a survey corresponds to a single session. 
**If no sessionId is specified, a session has not begun, and the `SurveyPage` will render a consent form to begin a survey.**
See information on flow of control below for more.
* **activityIdx**: specifies the current activity within a survey to render.
When 0, the first activity is rendered, when 1, the second, and so on. 
`SurveyPage` is responsible for incrementing this number and moving to the next activity once an activity is complete.

#### Flow of control
The flow of control in the survey page follows this general pattern:
1. A user navigates to a survey URL, for example, a survey called "Some great survey": `/survey/some_great_survey`.
2. On visiting this url, there is no `sessionId` defined (it is not in the URL). A `sessionId` denotes the user session, a specific run through a survey. Since there is no `sessionId`, the `SurveyPage` must create a session before beginning the survey. It sees there is no `sessionId` and starts by rendering an `Intro` component, which shows the intro and consent information provided by the survey author, as well as a button to accept and begin the survey.
3. When a user consents to begin a survey, `SurveyPage` calls the `createSession` service, adding a session to the database and getting the `sessionId`.
4. Once `createSession` returns a `sessionId`, `SurveyPage` redirects to the same survey with the new `sessionId`, starting at activity 0. 
For example, the 30th session in the database: `/survey/some_great_survey/session/30/activity/0`.
5. The `SurveyPage` handles this new route as well, but now there is a `sessionId` as well as an `activityIdx`, 0, the first activity. 
6. `SurveyPage` now renders the first activity, instantiating the appropriate activity type, `FormActivity` for example.
7. The user completes the activity, then submits the answers, causing the activity class to call `handleSubmit` on the survey page (data formats for data passed to handleSubmit described below).
8. `handleSubmit` submits the answers to the server, then redirects to the next activity. 
9. If there Are no more activities, it marks the survey as complete and calls the `updateSession` service to mark the session as complete.
9. Once the session is marked complete, the `SurveyPage` shows the complete screen.

#### `SurveyPage.handleSubmit` data formats
These are the data formats `SurveyPage` expects from different activity types.

`FormActivity`:

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

`MapActivity`:

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

`RandomAudioActivity`:
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

>**What to do with SurveyPage.js**: `SurveyPage` contains the meat of the app. If flow of control needs to be changed, it will need to change here. **The most obvious reason to modify SurveyPage is to add a new activity type, which should only require changing its render function to understand the new type.**

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

## Components
The components directory contains re-usable components that are relied upon by activities and other app elements.

### MapTool
The MapTool shows a map that the user can draw on. It holds no geo data state (it does have state for position and zoom).
The parent should maintain geo state and pass the current stat to it.
It gets passed geometry and returns raw geometry through its `onFeatureDrawn` callback. It returns and array of objects containing a `type` field denoting type and a `geometry` field containing the raw data.

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
