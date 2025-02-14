# Norris Loans

## Getting Started

1. Install the dependencies: `yarn install`
2. start rspack dev server: `yarn dev`

## Other important commands

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `yarn clean`       | runs eslint and prettier         |
| `yarn typecheck`   | checks types                     |
| `yarn test`        | runs tests                       |
| `yarn test:update` | runs tests and updates snapshots |

## Testing

enter `bad` into string fields or a number containing `99` in money fields to simulate an api error.

## Points of interests

Business logic is consolidated into two places.

### [LoanForm](https://github.com/jnorris-cs/norris-loans/tree/main/src/components/LoanForm)

- This component keeps the whole form object in global state.
- It uses react context to pass getters and setters to individual fields.

### [LoanField](https://github.com/jnorris-cs/norris-loans/tree/main/src/components/LoanField)

- This keeps the state for each individual fields
- It keeps the form state: focus, validation results, etc.
- It handles updating the pretend external api and displaying saving indicators
- It updates global state via the context getters and setters.

## Notable External Libraries

| Library                          | Description             |
| -------------------------------- | ----------------------- |
| [Tachyons](https://tachyons.io/) | lightweight css library |

## Component Hierarchy

![Preview](https://docs.google.com/drawings/d/e/2PACX-1vTCee3iOw3BUbLtkfs5-_JoImHYZT3d8bsEed-rinP8gGNrVkvl4wX3x_6XhxpqytAq0ySb6zLmmvyL/pub?w=812&h=718)
