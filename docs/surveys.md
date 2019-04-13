# Survey location
To create a survey to run on the Flom app, a survey must be written in the JSON format described below.
It can have any name, but must end with **.json**, `myGreatSurvey.json` for example.
This file should be put in the server's `/surveys` directory. 
Once deployed, the app will show one survey if there is only one (usually desired), or a list of surveys if many are present in the survey's directory. 

# Survey description format
Surveys are written as JSON objects describing their various activities and questions.
Shared survey metadata an other details relevant to the survey as a whole are store in the top level of the JSON tree. 
For instance, survey title, introduction, closing text, etc., are defined at the top of the tree, then a list of activities in the survey.

## Survey-level properties
A survey consists of a set of shared data describing the survey, plus a list of activities in the survey. 
For example:
```
{
  "title": "Llama",
  "intro": "Would you like to take out awesome survey about llamas",
  "startText": "Yes!",
  "activities":[
    ... // A list of the activities in the survey
  ]
}
```
### Supported survey properties
* **`title`**: The title of the survey. This will appear on the intro page, as well as in the URL.
* **`intro`**: Introductory text that goes on the first page, before a user has begun the survey.
* **`startText`**: Text that will appear on the button that begins the survey. This should be only a couple words.
* **`activities`**: The main list of activities to be completed in the survey. Some of these may be form activities, some may be map activities, and some may be audio activities. There can be as many activities as desired and the types can be mixed and matched. By default they will be given to the user in the order defined in this list.

### Supported activities
Activities are the basic sections of a survey. They represent groups of questions presented in various ways. Each activity must have a `type` that defines its basic setup. Available types are:
* **`form`**: A standard input form. This will be a set of questions with inputs for answering them such as text-boxes, dropdowns, radio buttons, etc.
* **`map`**: A map activity presents a number of questions and asks the user to draw regions or points on the map to answer the questions.
* **`randomAudio`**: An audio activity where users are presented with audio clips in random order and questions about each.

### Form activities
Form activities show a form with a list of questions and inputs for users to answer those questions.
Supported properties for form activities:
* **`title`**: Title of the activity. This will appear as a heading at the top of the form.
* **`helpText`**: Explanatory text to appear below the title.
* **`questions`**: A list of questions that will be presented to the user on the form. 

#### Map activities
Map activities show a map, a sidebar, and a list of questions in the sidebar. One question is active at a time, while the user answers it. The active question appears in a banner at the top of the page. 
Supported properties for map activities:
* **`type`**: Must be `map` for a map activity.
* **`title`**: Title of the activity. This will appear as a heading at the top of the side bar.
* **`center`**: The center of the map expressed as a tuple of latitude and longitude in degrees. Example: `[-17.814756, -65.847956]`.
* **`zoomLevel`**: How far the map is zoomed out. This is sort of an abstract number, but a `zoomLevel` of `4` roughly fits the United States on most monitors and a zoom level of `12` is about the size of a major city.
* **`questions`**: A list of questions that will be presented to the user on the map page.

#### Random Audio activities
Random Audio activities contain a number of audio clips that the user can listen to, then answer questions about them. 
Each activity has a number of audio files which are presented to the user in random order to play and answer questions about.
For each audio clip in an activity, the same questions are presented to the user--each question is answered separately for each clip. 
Supported properties for Random Audio activities:
* **`type`**: Must be `randomAudio` for a Random Audio activity.
* **`title`**: Title of the activity. This will appear as a heading at the top of the page.
* **`helpText`**: Explanatory text to appear below the title.
* **`audioFiles`**: An array of names of audio files to present in random order.
* **`questions`**: A list of questions that will be presented for each audio clip.

