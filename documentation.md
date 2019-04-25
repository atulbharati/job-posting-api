# Student Internship/Job Opportunities Info API

---

Name: Atul Bharati

Date: April 12, 2019

Project Topic: Job Posts API

URL: http://job-posting-api.herokuapp.com/

---

### 1. Data Format and Storage

Data point fields:
- `Field 1`: companyName    `Type: String`
- `Field 2`: jobType        `Type: String`
- `Field 3`: isTechnical    `Type: String`
- `Field 4`: positionTitle  `Type: String`
- `Field 5`: location       `Type: String`
- `Field 6`: salary         `Type: Number`
- `Field 7`: qualifications `Type: [String]`
- `Field 8`: url            `Type: String`

Schema:
```javascript
{
  companyName: {
     type: String,
     required: true
  },
  jobType: {
     type: String,
     required: true
  },
  isTechnical: {
     type: String,
     required: true
  },
  positionTitle: {
     type: String,
     required: true
  },
  location: {
     type: String,
     required: true
  },
  salary: {
     type: Number,
     required: true
  },
  qualifications: {
     type: [String],
     required: true
  },
  url: {
    type: String,
    required: true
  }
}
```

### 2. Add New Data

HTML form route: `/addJob`

POST endpoint route: `/api/addJob`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addJob',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
       companyName: "Google",
       jobType: "Fall Undergraduate Internship",
       isTechnical: "yes"
       positionTitle: "Software Engineering Intern",
       location: "New York City, NY",
       salary: 40,
       qualifications: ["Currently enrolled in a Bachelor's degree program in Computer Science, or related technical field",
       "Experience with Data Structures or Algorithms gathered from practical experience inside or outside of school or work", "Experience in Software Development and coding in a general purpose programming language",
       "Examples of coding in C, C++, Java, JavaScript, or Python"],
       url: "https://careers.google.com/jobs/results/5403140742905856-software-engineering-intern-ms-fall-2019/?company=Google&company=YouTube&employment_type=INTERN&jlo=en_US&q=Software%20Engineer"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getJobs`

### 4. Search Data

Search Field: companyName

### 5. Navigation Pages

Navigation Filters
1. Home -> `/`
2. Internships -> `/internships`
3. Full-Time Jobs -> `/fullTime`
4. Highest Paying Jobs -> `/topPayingFullTime`
5. Technical Jobs -> `/technical`
6. Non-Technical Jobs -> `/nonTechnical`
