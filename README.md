# simple-dependency-scanner

Simple Dependency Scanner is a proof of concept Vue app built to communicate with the Debricked vulnerability scan API.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## To-do list
- Create an svg icon component to avoid the inline mess in the view templates
- Use VeeValidator to validate the user details on the Profile view as well (i e avatar size limit)
- Error handling, especially in the Scan view and UploadService
- Find out what repositoryName and commitName values to send along with the file upload (parse the lock files?)
- Find out any file restrictions and add validation to the Scan view
- Clear user from storage and routing to the Login view on a 401 response
- Comment script block on the Profile view
- Look into a simple way to run server on a secure connection
- Implement a dark mode switch and create a smart invertable system for grays
- Store files in localStorage so that the user can leave the Scan view after finished scan and while they wait
- Use vue-number-animation to animate the progress percentages
- Add a pulsating effect to the progress bars

## Credits
Icons throughout the app are from the [Typicons](https://www.s-ings.com/typicons/) library by Stephen Hutchings
