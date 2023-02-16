# To get started 

1. Clone the main branch
2. Make sure that you installed nodejs
3. Run `npm i` and wait for the process to finish
4. Checkout a new branch using `git checkout -b yourBranchName`.
   Doing it this way prevent messing up the main branch.
5. Run `npm start` and wait for the process to finish
This command runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
## Available Scripts
### `firebase emulators:start`
Open [http://localhost:4000](http://localhost:4000) to view the firebase project local db.\
It turns on all of the emulators by default.\
You may include options like `--only auth` if you just want to run the authentication emulator.\
Example: `firebase emulators:start --only auth`
Check your `firebase.json` for a list of ports numbers that associated with the corespoding emulator.\
Import `connectAuthEmulator`, or `connectFirestoreEmulator` if you want to run the local emulators.\
### `firebase serve` 
1. Run this command after running `npm run build` to build the local deployment
2. Run `firebase serve`.
3. Open [http://localhost:5000](http://localhost:5000) to view the firebase project.

## Before pushing to your remote branch
1. After committing on your local branch, go back to the main branch.
2. Do a `git pull --rebase` on main, if there are any conflicts, resolve them.
3. Go back to your branch.
4. Do a `git merge main`
   This updates all the change from main to your branch.
   Resolves any conflicts.
5. Make sure to run `npx prettier --write` after step 4.
   Example: `npx prettier --write /src`
   This handle any indentation error and make your code looks prettier.
6. Push.

These steps are to enture that your pull request will success everytime you push
up the stream. Failing to do these steps might result in trouble shootings your
pull request.

## Other commands
### `npm run test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
