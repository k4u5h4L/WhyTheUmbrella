# WhyTheUmbrella

A weather app which brings you the weather data of the desired area using weather APIs.

## Live website:

- Hosted on Heroku: [Here](https://intense-dusk-15451.herokuapp.com/)

![Image of site1](https://github.com/theParanoidScripts/WhyTheUmbrella/blob/master/assets/whytheumbrella.png)

## New improvements:

- This project has been moved to TypeScript from JavaScript.

## To run:

- Clone the repo and cd into it

```
git clone https://github.com/theParanoidScripts/WhyTheUmbrella.git && cd WhyTheUmbrella
```

- Install needed dependencies

```
npm install
```

- Go to [openweathermap](https://openweathermap.org) and get your API key.<br>
  rename the `.env_sample` file to `.env` and paste in the API key in the provided space.

- For development, directly run nodemon,

```
npm run dev
```

Else to deploy or to build, run

```
npm run build && npm run start
```

- Visit [localhost:3000](http://localhost:3000) to view the website.

### Note:

- This project is for educational uses only. Please do not use it as a commercial weather application.
