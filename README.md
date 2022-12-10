# Quality Assurance with Chai

Exploratory. Learning unit & functional testing with Chai. Features that is being explorated:

- Unit Testing (
  - Basic Assertion (isNull, isDefined, isOk, isTrue) (& +Not)
  - Equality (equal, strictEqual, deepEqual) (& +Not)
  - Comparisons ((isAbove & isAtMost), (isBelow, isAtLeast), approximately)
  - Arrays (isArray, include) (& +Not)
  - Strings (isString, include, match) (& +Not)
  - Object (property, typeOf, instanceOf) (& +Not)
  )

- Functional Testing (
  - GET `/hello`
  - GET `/hello` with query `name`
  - PUT `/travellers` with input from web form
    - Form `surname` to try:
      1. Polo
      2. Colombo
      3. da Verrazzano
  - Test via headless browser using Zombie.js
  - Assertion in headless browser:
    - HTTP response 200 (success())
    - text from span#id
    - elements from span#id
  )
  
Link to web app: https://qa-fcc-chai.ricky-kiva.repl.co/ 
