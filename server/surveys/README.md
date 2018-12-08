# Survey description format
Surveys are written as JSON objects describing their various activities and questions.
Shared survey metadata an other details relevant to the survey as a whole are store in the top level of the JSON tree. 
For instance, surey title, introduction, closing text, etc., are defined at the top of the tree, then a list of activities in the survey.

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

### Suported activities
Activities are the basic sections of a survey. They represent groups of questions persented in various ways. Each activity has a `type` that defines its basic setup. Available types are:
* **`form`**: A standard input form. This will be a set of questions with inputs for answering them such as text-boxes, dropdowns, radio buttons, etc.
* **`map`**: A map activity presents a number of questions and asks the user to draw regions or points on the map to answer the questions.
