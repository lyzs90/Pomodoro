# [Pomodoro](https://pomodoro-react.herokuapp.com/)

Trying out different implementations of the pomodoro timer. Switch branches to view each of them. Note that the timer is accelerated to facilitate testing.
This branch contains the React implementation.

## What's Available
- Vanilla JS MVC
- React.js (declarative views)

## For Development
- Run using Gulp, Browser-sync & Webpack: `gulp dev`. Changes to html/css will be reloaded live and hot module reloading is for the js.

## For Production
- Preprocess html and compile sass: `npm run build`
- Run Express & Webpack with PROD settings: `npm run local`. Verify.
- Then push to Heroku `git push heroku master`
