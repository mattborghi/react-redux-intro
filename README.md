This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Redux

**Redux** adopted a handful of constraints from the Flux architecture but not all of them. It has **Actions**
that encapsulate information about the state update. It has a **Store** to save the state, too. However, the
Store is a _singleton_. Thus, there are not multiple Stores like there used to be in the Flux architecture.
In addition, there is no single Dispatcher. Instead, Redux uses multiple **Reducers**. Basically, Reducers
pick up the information from Actions and “reduce” it to a new state that is saved in the Store. When
state in the Store is changed, the **View** can act on this by subscribing to the Store.

![redux](./assets/img/redux.png)

Why is it called Redux? Because it combines the two words Reducer and Flux. The abstract picture
should be imaginable now. The state doesn’t live in the View anymore, it is only connected to
the View. What does connected mean? It is connected on two ends, because it is part of the
unidirectional data flow. One end is responsible to trigger an Action to update the state, the second
end is responsible to receive the state from the Store. The View can update according to state changes
and can trigger state changes.
The View, in this case, would be React, but Redux could be used with any other library or standalone.
After all, it is only a state management container.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.