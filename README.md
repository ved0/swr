This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Start by doing these steps go to:
==> https://openweathermap.org/ create an account and get an API key
==> https://unsplash.com/ create an account. Head to the hamburger menu in the top-right corner. Press "Developers/API". Press "Your apps", in the displayed view choose to create a new application. Fill in application name: "JustGO" and description: "I am looping through a list of cities, and I need images for those cities. So the app will be doing like 10-30 requests every minute."

WHEN you have the API keys for OpenWeather and Unsplash, create an .env file in the root of the project.
Add the following:

NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_CREATED_KEY
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=YOUR_CREATED_KEY

Now, run "npm install" to install all the dependencies and after that "npm run dev". The server should start on http://localhost:3000.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
