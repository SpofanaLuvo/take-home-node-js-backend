# Introduction

Hello 👋,

Thanks for taking the time to complete this brief take-home assignment.

The goal of this exercise is to evaluate your backend skills in developing lean microservices in JavaScript (Node.js, ExpressJS, 3rd-party integration, and testing). Feel free to make any assumptions, simplifications, or other changes to the problems - though please state those in your write up when you submit this assignment. Please use as many libraries as is reasonable - there is no sense in rebuilding what has been built. Feel at liberty to structure the microservice in a way that satisfies you.

Using and Express.js you will create a REST endpoint that talks to a database(Relational/Non-relational).

Before getting started, please read this document carefully.

**Good luck 🙃**

# Acceptance Criteria

- API must allow two things and must return JSON:

  1. Allow users to request for available cleaners.
  2. Allow users to see the ratings of a cleaner.
  3. Allow users to rate a cleaner.
  4. Allow users to pay for a cleaner's service.
  
- The following must be behind HTTP Bearer Authentication. Use any credentials of your choice:

  1. Allow cleaners to see how much they've made in a day, month.... 
  2. Allow cleaners to task that needs to be completed.
  3. Allow cleaners to see list of completed task.

- Code must be tested using the framework of your choice
- Document design decisions

# What counts?

- All functional requirements must be satisfied
- Production-like code that must be well coded, clean, and commented
- Tests must be passing and meaningful
- General Node.js knowledge
