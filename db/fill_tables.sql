INSERT INTO survey (survey_id, name, detail)
VALUES ('test','A Sample Survey for Development Testing',
'{
    "title": "Test of FLOM",
    "intro": "This is the first iteration of FLOM",
    "startText": "Start Demo",
    "activities": [{
        "title": "About you",
        "helpText": "Sample demographic form",
        "type": "form",
        "id": "about",
        "questions": [{
            "title": "What is your gender?",
            "id": "gender",
            "required": "false",
            "type": "select",
            "options": [{
                "id": "male",
                "text": "Male"
            },
                {
                    "id": "female",
                    "text": "Female"
                },
                {
                    "id": "non-binary",
                    "text": "Non-binary/Third gender"
                },
                {
                    "id": "no_state",
                    "text": "Prefer not to state"
                }
            ]
        },
            {
                "title": "How would you describe your ethnicity?",
                "id": "ethnicity",
                "type": "select",
                "required": "false",
                "options": [{
                    "id": "white",
                    "text": "White, Caucasian"
                },
                    {
                        "id": "black",
                        "text": "Black, African American"
                    },
                    {
                        "id": "hispanic",
                        "text": "Hispanic, Latino/a"
                    },
                    {
                        "id": "native",
                        "text": "American Indian, Alaska Native"
                    },
                    {
                        "id": "asian",
                        "text": "Asian"
                    },
                    {
                        "id": "islander",
                        "text": "Native Hawaiian, Pacific Islander"
                    },
                    {
                        "id": "comba",
                        "text": "A combination of some of the options above"
                    },
                    {
                        "id": "others",
                        "text": "Some other ethnicity"
                    }
                ]
            },
            {
                "title": "In what year were you born?",
                "type": "num",
                "id": "born_year",
                "required": "false",
                "max": "2002"
            },
            {
                "title": "Where were you born? (city, state)",
                "type": "text",
                "required": "false",
                "id": "born_area"
            },
            {
                "title": "Where did you grow up (between 8 and 18)? (city, state)",
                "type": "text",
                "required": "false",
                "id": "grow_area"
            },
            {
                "title": "Where do you live now? (city, state)",
                "type": "text",
                "required": "false",
                "id": "live_area"
            },
            {
                "title": "Where did your mother grow up? (State)",
                "type": "select",
                "required": "false",
                "id": "mother_state",
                "options": [{
                    "text": "Alabama",
                    "id": "AL"
                },
                    {
                        "text": "Alaska",
                        "id": "AK"
                    },
                    {
                        "text": "American Samoa",
                        "id": "AS"
                    },
                    {
                        "text": "Arizona",
                        "id": "AZ"
                    },
                    {
                        "text": "Arkansas",
                        "id": "AR"
                    },
                    {
                        "text": "California",
                        "id": "CA"
                    },
                    {
                        "text": "Colorado",
                        "id": "CO"
                    },
                    {
                        "text": "Connecticut",
                        "id": "CT"
                    },
                    {
                        "text": "Delaware",
                        "id": "DE"
                    },
                    {
                        "text": "District Of Columbia",
                        "id": "DC"
                    },
                    {
                        "text": "Federated States Of Micronesia",
                        "id": "FM"
                    },
                    {
                        "text": "Florida",
                        "id": "FL"
                    },
                    {
                        "text": "Georgia",
                        "id": "GA"
                    },
                    {
                        "text": "Guam",
                        "id": "GU"
                    },
                    {
                        "text": "Hawaii",
                        "id": "HI"
                    },
                    {
                        "text": "Idaho",
                        "id": "ID"
                    },
                    {
                        "text": "Illinois",
                        "id": "IL"
                    },
                    {
                        "text": "Indiana",
                        "id": "IN"
                    },
                    {
                        "text": "Iowa",
                        "id": "IA"
                    },
                    {
                        "text": "Kansas",
                        "id": "KS"
                    },
                    {
                        "text": "Kentucky",
                        "id": "KY"
                    },
                    {
                        "text": "Louisiana",
                        "id": "LA"
                    },
                    {
                        "text": "Maine",
                        "id": "ME"
                    },
                    {
                        "text": "Marshall Islands",
                        "id": "MH"
                    },
                    {
                        "text": "Maryland",
                        "id": "MD"
                    },
                    {
                        "text": "Massachusetts",
                        "id": "MA"
                    },
                    {
                        "text": "Michigan",
                        "id": "MI"
                    },
                    {
                        "text": "Minnesota",
                        "id": "MN"
                    },
                    {
                        "text": "Mississippi",
                        "id": "MS"
                    },
                    {
                        "text": "Missouri",
                        "id": "MO"
                    },
                    {
                        "text": "Montana",
                        "id": "MT"
                    },
                    {
                        "text": "Nebraska",
                        "id": "NE"
                    },
                    {
                        "text": "Nevada",
                        "id": "NV"
                    },
                    {
                        "text": "New Hampshire",
                        "id": "NH"
                    },
                    {
                        "text": "New Jersey",
                        "id": "NJ"
                    },
                    {
                        "text": "New Mexico",
                        "id": "NM"
                    },
                    {
                        "text": "New York",
                        "id": "NY"
                    },
                    {
                        "text": "North Carolina",
                        "id": "NC"
                    },
                    {
                        "text": "North Dakota",
                        "id": "ND"
                    },
                    {
                        "text": "Northern Mariana Islands",
                        "id": "MP"
                    },
                    {
                        "text": "Ohio",
                        "id": "OH"
                    },
                    {
                        "text": "Oklahoma",
                        "id": "OK"
                    },
                    {
                        "text": "Oregon",
                        "id": "OR"
                    },
                    {
                        "text": "Palau",
                        "id": "PW"
                    },
                    {
                        "text": "Pennsylvania",
                        "id": "PA"
                    },
                    {
                        "text": "Puerto Rico",
                        "id": "PR"
                    },
                    {
                        "text": "Rhode Island",
                        "id": "RI"
                    },
                    {
                        "text": "South Carolina",
                        "id": "SC"
                    },
                    {
                        "text": "South Dakota",
                        "id": "SD"
                    },
                    {
                        "text": "Tennessee",
                        "id": "TN"
                    },
                    {
                        "text": "Texas",
                        "id": "TX"
                    },
                    {
                        "text": "Utah",
                        "id": "UT"
                    },
                    {
                        "text": "Vermont",
                        "id": "VT"
                    },
                    {
                        "text": "Virgin Islands",
                        "id": "VI"
                    },
                    {
                        "text": "Virginia",
                        "id": "VA"
                    },
                    {
                        "text": "Washington",
                        "id": "WA"
                    },
                    {
                        "text": "West Virginia",
                        "id": "WV"
                    },
                    {
                        "text": "Wisconsin",
                        "id": "WI"
                    },
                    {
                        "text": "Wyoming",
                        "id": "WY"
                    }
                ]
            },
            {
                "title": "Where did your father grow up? (State)",
                "type": "select",
                "id": "father_state",
                "required": "false",
                "options": [{
                    "text": "Alabama",
                    "id": "AL"
                },
                    {
                        "text": "Alaska",
                        "id": "AK"
                    },
                    {
                        "text": "American Samoa",
                        "id": "AS"
                    },
                    {
                        "text": "Arizona",
                        "id": "AZ"
                    },
                    {
                        "text": "Arkansas",
                        "id": "AR"
                    },
                    {
                        "text": "California",
                        "id": "CA"
                    },
                    {
                        "text": "Colorado",
                        "id": "CO"
                    },
                    {
                        "text": "Connecticut",
                        "id": "CT"
                    },
                    {
                        "text": "Delaware",
                        "id": "DE"
                    },
                    {
                        "text": "District Of Columbia",
                        "id": "DC"
                    },
                    {
                        "text": "Federated States Of Micronesia",
                        "id": "FM"
                    },
                    {
                        "text": "Florida",
                        "id": "FL"
                    },
                    {
                        "text": "Georgia",
                        "id": "GA"
                    },
                    {
                        "text": "Guam",
                        "id": "GU"
                    },
                    {
                        "text": "Hawaii",
                        "id": "HI"
                    },
                    {
                        "text": "Idaho",
                        "id": "ID"
                    },
                    {
                        "text": "Illinois",
                        "id": "IL"
                    },
                    {
                        "text": "Indiana",
                        "id": "IN"
                    },
                    {
                        "text": "Iowa",
                        "id": "IA"
                    },
                    {
                        "text": "Kansas",
                        "id": "KS"
                    },
                    {
                        "text": "Kentucky",
                        "id": "KY"
                    },
                    {
                        "text": "Louisiana",
                        "id": "LA"
                    },
                    {
                        "text": "Maine",
                        "id": "ME"
                    },
                    {
                        "text": "Marshall Islands",
                        "id": "MH"
                    },
                    {
                        "text": "Maryland",
                        "id": "MD"
                    },
                    {
                        "text": "Massachusetts",
                        "id": "MA"
                    },
                    {
                        "text": "Michigan",
                        "id": "MI"
                    },
                    {
                        "text": "Minnesota",
                        "id": "MN"
                    },
                    {
                        "text": "Mississippi",
                        "id": "MS"
                    },
                    {
                        "text": "Missouri",
                        "id": "MO"
                    },
                    {
                        "text": "Montana",
                        "id": "MT"
                    },
                    {
                        "text": "Nebraska",
                        "id": "NE"
                    },
                    {
                        "text": "Nevada",
                        "id": "NV"
                    },
                    {
                        "text": "New Hampshire",
                        "id": "NH"
                    },
                    {
                        "text": "New Jersey",
                        "id": "NJ"
                    },
                    {
                        "text": "New Mexico",
                        "id": "NM"
                    },
                    {
                        "text": "New York",
                        "id": "NY"
                    },
                    {
                        "text": "North Carolina",
                        "id": "NC"
                    },
                    {
                        "text": "North Dakota",
                        "id": "ND"
                    },
                    {
                        "text": "Northern Mariana Islands",
                        "id": "MP"
                    },
                    {
                        "text": "Ohio",
                        "id": "OH"
                    },
                    {
                        "text": "Oklahoma",
                        "id": "OK"
                    },
                    {
                        "text": "Oregon",
                        "id": "OR"
                    },
                    {
                        "text": "Palau",
                        "id": "PW"
                    },
                    {
                        "text": "Pennsylvania",
                        "id": "PA"
                    },
                    {
                        "text": "Puerto Rico",
                        "id": "PR"
                    },
                    {
                        "text": "Rhode Island",
                        "id": "RI"
                    },
                    {
                        "text": "South Carolina",
                        "id": "SC"
                    },
                    {
                        "text": "South Dakota",
                        "id": "SD"
                    },
                    {
                        "text": "Tennessee",
                        "id": "TN"
                    },
                    {
                        "text": "Texas",
                        "id": "TX"
                    },
                    {
                        "text": "Utah",
                        "id": "UT"
                    },
                    {
                        "text": "Vermont",
                        "id": "VT"
                    },
                    {
                        "text": "Virgin Islands",
                        "id": "VI"
                    },
                    {
                        "text": "Virginia",
                        "id": "VA"
                    },
                    {
                        "text": "Washington",
                        "id": "WA"
                    },
                    {
                        "text": "West Virginia",
                        "id": "WV"
                    },
                    {
                        "text": "Wisconsin",
                        "id": "WI"
                    },
                    {
                        "text": "Wyoming",
                        "id": "WY"
                    }
                ]
            },
            {
                "title": "What is the highest level of school you have completed?",
                "id": "education_degree",
                "required": "false",
                "type": "select",
                "options": [{
                    "id": "elementary",
                    "text": "Elementary school"
                },
                    {
                        "id": "high",
                        "text": "High school"
                    },
                    {
                        "id": "associate",
                        "text": "Associate''s degree"
                    },
                    {
                        "id": "bachelor",
                        "text": "Bachelor''s degree"
                    },
                    {
                        "id": "master",
                        "text": "Master''s degree or more"
                    }
                ]
            }
        ]
    },
        {
            "title": "Freehand Draw",
            "helpText": "User can draw freely",
            "id": "freehand",
            "type": "map",
            "function": "freedraw",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4
        },
        {
            "title": "Additional Questions",
            "helpText": "Ask additional questions based on user previous drawn area",
            "id": "additional",
            "type": "map",
            "function": "additional",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "basedOn": "freehand",
            "questions": [{
                "title": "How pleasant does this speech sound to you?",
                "required": "false",
                "type": "rate",
                "id": "pleasant"
            },
                {
                    "title": "How correct does this speech sound to you?",
                    "required": "false",
                    "type": "rate",
                    "id": "correct"
                },
                {
                    "title": "Have you ever visited this area?",
                    "required": "false",
                    "id": "visited",
                    "type": "boolean"
                },
                {
                    "title": "Have you ever worked in this area?",
                    "required": "false",
                    "id": "worked",
                    "type": "boolean"
                },
                {
                    "title": "Do you know people from this area?",
                    "required": "false",
                    "id": "known",
                    "type": "boolean"
                },
                {
                    "title": "Please provide any stereotypes that you have heard about this region. You can write as much or as little as you would like.",
                    "required": "false",
                    "type": "textarea",
                    "id": "stereotypes"
                }
            ]
        },
        {
            "title": "Ending",
            "helpText": "Ask ending questions",
            "id": "end",
            "type": "end",
            "questions": [{
                "title": "Do you want to participate into further interview?",
                "type": "switch",
                "id": "interview",
                "questions": [{
                    "title": "How pleasant does this speech sound to you?",
                    "type": "rate",
                    "id": "pleasant"
                },
                    {
                        "title": "How correct does this speech sound to you?",
                        "required": "false",
                        "type": "rate",
                        "id": "correct"
                    },
                    {
                        "title": "Have you ever visited this area?",
                        "required": "false",
                        "id": "visited",
                        "type": "boolean"
                    },
                    {
                        "title": "Have you ever worked in this area?",
                        "required": "false",
                        "id": "worked",
                        "type": "boolean"
                    },
                    {
                        "title": "Do you know people from this area?",
                        "required": "false",
                        "id": "known",
                        "type": "boolean"
                    },
                    {
                        "title": "Please provide any stereotypes that you have heard about this region. You can write as much or as little as you would like.",
                        "required": "false",
                        "type": "textarea",
                        "id": "stereotypes"
                    }
                ]
            },
                {
                    "title": "Do you want to share data?",
                    "type": "switch",
                    "id": "share"
                },
                {
                    "title": "Recommendation?",
                    "required": "false",
                    "id": "Recommendation",
                    "type": "textarea"
                }
            ]
        }
    ]
}');
INSERT INTO survey (survey_id, name, detail)
VALUES ('demo','Full Demo of Current Survey Format',
        '{
    "title": "Full Demo of Current Survey Format",
    "intro": "This is the full demo of current survey format",
    "startText": "Start Demo",
    "activities": [
        {
            "title": "About you",
            "helpText": "Sample demographic form",
            "type": "form",
            "id": "about",
            "questions": [
                {
                    "title": "How old are you?",
                    "type": "num",
                    "required": "false",
                    "id": "age"
                },
                {
                    "title": "What is the highest level of school you have completed?",
                    "id": "education_degree",
                    "type": "select",
                    "required": "false",
                    "options": [
                        {
                            "id": "elementary",
                            "text": "Elementary school"
                        },
                        {
                            "id": "high",
                            "text": "High school"
                        },
                        {
                            "id": "associate",
                            "text": "Associate''s degree"
                        },
                        {
                            "id": "bachelor",
                            "text": "Bachelor''s degree"
                        },
                        {
                            "id": "master",
                            "text": "Master''s degree or more"
                        }
                    ]
                },
                {
                    "title": "Rating question example",
                    "type": "rate",
                    "id": "rating",
                    "required": "false",
                    "least": "terrible",
                    "best": "wonderful"
                },
                {
                    "title": "One-line text question example",
                    "type": "text",
                    "id": "text",
                    "required": "false",
                    "audio": "/static/audio/happy.mp3"
                },
                {
                    "title": "Text Area question example",
                    "type": "textarea",
                    "required": "false",
                    "id": "textarea"
                },
                {
                    "title": "Sample select question example",
                    "type": "select",
                    "required": "false",
                    "id": "state",
                    "searchable": "true",
                    "options": [
                        {
                            "text": "Alabama",
                            "id": "AL"
                        },
                        {
                            "text": "Alaska",
                            "id": "AK"
                        },
                        {
                            "text": "American Samoa",
                            "id": "AS"
                        },
                        {
                            "text": "Arizona",
                            "id": "AZ"
                        },
                        {
                            "text": "Arkansas",
                            "id": "AR"
                        },
                        {
                            "text": "California",
                            "id": "CA"
                        },
                        {
                            "text": "Colorado",
                            "id": "CO"
                        },
                        {
                            "text": "Connecticut",
                            "id": "CT"
                        },
                        {
                            "text": "Delaware",
                            "id": "DE"
                        },
                        {
                            "text": "District Of Columbia",
                            "id": "DC"
                        },
                        {
                            "text": "Federated States Of Micronesia",
                            "id": "FM"
                        },
                        {
                            "text": "Florida",
                            "id": "FL"
                        },
                        {
                            "text": "Georgia",
                            "id": "GA"
                        },
                        {
                            "text": "Guam",
                            "id": "GU"
                        },
                        {
                            "text": "Hawaii",
                            "id": "HI"
                        },
                        {
                            "text": "Idaho",
                            "id": "ID"
                        },
                        {
                            "text": "Illinois",
                            "id": "IL"
                        },
                        {
                            "text": "Indiana",
                            "id": "IN"
                        },
                        {
                            "text": "Iowa",
                            "id": "IA"
                        },
                        {
                            "text": "Kansas",
                            "id": "KS"
                        },
                        {
                            "text": "Kentucky",
                            "id": "KY"
                        },
                        {
                            "text": "Louisiana",
                            "id": "LA"
                        },
                        {
                            "text": "Maine",
                            "id": "ME"
                        },
                        {
                            "text": "Marshall Islands",
                            "id": "MH"
                        },
                        {
                            "text": "Maryland",
                            "id": "MD"
                        },
                        {
                            "text": "Massachusetts",
                            "id": "MA"
                        },
                        {
                            "text": "Michigan",
                            "id": "MI"
                        },
                        {
                            "text": "Minnesota",
                            "id": "MN"
                        },
                        {
                            "text": "Mississippi",
                            "id": "MS"
                        },
                        {
                            "text": "Missouri",
                            "id": "MO"
                        },
                        {
                            "text": "Montana",
                            "id": "MT"
                        },
                        {
                            "text": "Nebraska",
                            "id": "NE"
                        },
                        {
                            "text": "Nevada",
                            "id": "NV"
                        },
                        {
                            "text": "New Hampshire",
                            "id": "NH"
                        },
                        {
                            "text": "New Jersey",
                            "id": "NJ"
                        },
                        {
                            "text": "New Mexico",
                            "id": "NM"
                        },
                        {
                            "text": "New York",
                            "id": "NY"
                        },
                        {
                            "text": "North Carolina",
                            "id": "NC"
                        },
                        {
                            "text": "North Dakota",
                            "id": "ND"
                        },
                        {
                            "text": "Northern Mariana Islands",
                            "id": "MP"
                        },
                        {
                            "text": "Ohio",
                            "id": "OH"
                        },
                        {
                            "text": "Oklahoma",
                            "id": "OK"
                        },
                        {
                            "text": "Oregon",
                            "id": "OR"
                        },
                        {
                            "text": "Palau",
                            "id": "PW"
                        },
                        {
                            "text": "Pennsylvania",
                            "id": "PA"
                        },
                        {
                            "text": "Puerto Rico",
                            "id": "PR"
                        },
                        {
                            "text": "Rhode Island",
                            "id": "RI"
                        },
                        {
                            "text": "South Carolina",
                            "id": "SC"
                        },
                        {
                            "text": "South Dakota",
                            "id": "SD"
                        },
                        {
                            "text": "Tennessee",
                            "id": "TN"
                        },
                        {
                            "text": "Texas",
                            "id": "TX"
                        },
                        {
                            "text": "Utah",
                            "id": "UT"
                        },
                        {
                            "text": "Vermont",
                            "id": "VT"
                        },
                        {
                            "text": "Virgin Islands",
                            "id": "VI"
                        },
                        {
                            "text": "Virginia",
                            "id": "VA"
                        },
                        {
                            "text": "Washington",
                            "id": "WA"
                        },
                        {
                            "text": "West Virginia",
                            "id": "WV"
                        },
                        {
                            "text": "Wisconsin",
                            "id": "WI"
                        },
                        {
                            "text": "Wyoming",
                            "id": "WY"
                        }
                    ]
                },
                {
                    "title": "Sample radio question",
                    "id": "radio",
                    "required": "false",
                    "type": "radio",
                    "options": [
                        {
                            "id": "apple",
                            "text": "apple"
                        },
                        {
                            "id": "pear",
                            "text": "pear"
                        },
                        {
                            "id": "orange",
                            "text": "orange"
                        }
                    ]
                },
                {
                    "title": "Sample checkbox question",
                    "id": "checkbox",
                    "required": "false",
                    "type": "checkbox",
                    "options": [
                        {
                            "id": "apple",
                            "text": "apple"
                        },
                        {
                            "id": "pear",
                            "text": "pear"
                        },
                        {
                            "id": "orange",
                            "text": "orange"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Defined Draw",
            "helpText": "We will draw some areas on the map.",
            "id": "defined",
            "type": "map",
            "function": "predefined",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "questions": [
                {
                    "title": "Draw New England",
                    "type": "area",
                    "id": "new_england",
                    "questions": [
                        {
                            "title": "Rating question example",
                            "type": "rate",
                            "id": "rating",
                            "required": "false",
                            "least": "terrible",
                            "best": "wonderful"
                        },
                        {
                            "title": "One-line text question example",
                            "type": "text",
                            "id": "text",
                            "required": "false"
                        }
                    ]
                },
                {
                    "title": "Draw the South",
                    "type": "area",
                    "id": "south"
                }
            ]
        },
        {
            "title": "Freehand Draw",
            "helpText": "User can draw freely",
            "id": "freehand",
            "type": "map",
            "function": "freedraw",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "questions": [
                {
                    "title": "Rating question example",
                    "type": "rate",
                    "id": "rating",
                    "required": "false",
                    "least": "terrible",
                    "best": "wonderful"
                }
            ]
        },
        {
            "title": "Additional Questions",
            "helpText": "Ask additional questions based on user previous drawn area",
            "id": "additional",
            "type": "map",
            "function": "additional",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "basedOn": "freehand",
            "questions": [
                {
                    "title": "Rating question example",
                    "type": "rate",
                    "id": "rating",
                    "required": "false",
                    "least": "terrible",
                    "best": "wonderful"
                }
            ]
        }
    ]
}');
INSERT INTO survey (survey_id, name, detail)
VALUES ('map','Development Testcase for Map',
        '{
    "title": "Full Demo of Current Survey Format",
    "intro": "This is the full demo of current survey format",
    "startText": "Start Demo",
    "activities": [
        {
            "title": "Defined Draw",
            "helpText": "We will draw some areas on the map.",
            "id": "defined",
            "type": "map",
            "function": "predefined",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "questions": [
                {
                    "title": "Draw New England",
                    "type": "area",
                    "id": "new_england",
                    "questions": [
                        {
                            "title": "Rating question example",
                            "type": "rate",
                            "id": "rating",
                            "required": "false",
                            "least": "terrible",
                            "best": "wonderful"
                        },
                        {
                            "title": "One-line text question example",
                            "type": "text",
                            "id": "text",
                            "required": "false"
                        }
                    ]
                },
                {
                    "title": "Draw the South",
                    "type": "area",
                    "id": "south"
                }
            ]
        },
        {
            "title": "Freehand Draw",
            "helpText": "User can draw freely",
            "id": "freehand",
            "type": "map",
            "function": "freedraw",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "questions": [
                {
                    "title": "Rating question example",
                    "type": "rate",
                    "id": "rating",
                    "required": "false",
                    "least": "terrible",
                    "best": "wonderful"
                }
            ]
        },
        {
            "title": "Additional Questions",
            "helpText": "Ask additional questions based on user previous drawn area",
            "id": "additional",
            "type": "map",
            "function": "additional",
            "center": [
                38.678052,
                -96.273380
            ],
            "zoomLevel": 4,
            "basedOn": "freehand",
            "questions": [
                {
                    "title": "Rating question example",
                    "type": "rate",
                    "id": "rating",
                    "required": "false",
                    "least": "terrible",
                    "best": "wonderful"
                }
            ]
        }
    ]
}');
