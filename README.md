# Keep it Personal (KIP)



Enabling clutter-free deep engagement. 

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) 

```sh
$ cd kip/kip_node_js
$ npm install
$ node app.js
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Live Demo

Bookmarklet : http://intense-horsepower-98-189832.use1-2.nitrousbox.com/2/kip.html

website: http://young-wave-7341.herokuapp.com/

#KIP Product Management Approach

##Tools
* GitHub
* Waffle.io linked to GitHub
* Slack with a GitHub Channel
* Google docs

##Weekly Meeting
* Move unfinished items from previous week back into the backlog (via Waffle.io)
* Prioritize the items currently in the backlog and assign effort estimates to each item (via Waffle.io)
* Move subset of items to Ready list (vi Waffle.io)
* Assign tasks to group members (via Waffle.io).
* Attached the issues to the week milestone in github

##Individual work
* All team members enter new user stories, enhancements, and bugs to the backlog (via Waffle.io) as they are discovered (make sure the issues are tagged)
* The priority tag should be set according to at least 3 team members opinion.
* Team members working on tasks in Ready list move tasks to the In Progress list when they start the task and the done list when they finish the task (via Waffle.io).
* No communication through emails. 

##Tag Meaning Reference

#Story
Each scenario will be broken down into stories.   A recorded story in the issues list, will reference (via #(Issue Number)) the scenario it is describing. If the story is broken down into sub stories, those sub stories will also be marked as a Story.   As the stories evolve, the issue will be edited to reflect it’s evolution.   Once the story is implemented, the story will be marked close; and the commit message for the source will reference the story number (e.g. “completed ‘showing arrow for currency trend’ ref #4”).  The story tag is combined with a “T-shirt” size and a priority based on your goals.

#[Feature] Enhancement
A work item that supports a story; something that can be implemented to support the story to make it better; but that isn’t a “bug”.   When the enhancement is implemented, the commit message to the server indicates the issue; and the enhancement indicates what branch has been closed. (there by default in GitHub)

#Bug
A defect found in a particular story that needs to be fixed to mark it complete. (there by default in GitHub)
Product Development
A work item that supports the formation of the product concept and the business model

#Customer Development
A work item that supports learning about the customer

#[Difficulty] Size-S, Size-M, Size-L, Size-XL
For each story, it will be tagged with a “T-shirt” size based on the difficulty the team thinks it will take to estimate.

#[Priority]
High, Medium, Low
Categories corresponding to the priority of the story or bug. 



