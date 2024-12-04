# Brand collective interview

## Set up instructions

To use this component, first clone this repo to your local computer (instructions for this step can be found in the [GitHub docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)).

Once on your local machine, start by adding any dependencies from the repo’s package.json. This can be done by running either of the following commands in your terminal

```
npm install
```

or

```
yarn install
```

Open the code and add a env.local file in the project's root. In this file, add your Shopify store domain and public access token. For example:

```
REACT_APP_STORE_DOMAIN='https://{your-store}.myshopify.com'
REACT_APP_ACCESS_TOKEN='{your public access key}'
```

Save file then go back to terminal and run either

```
npm run start
```

or

```
yarn start
```

Once these steps are complete, you should be ready to go!
