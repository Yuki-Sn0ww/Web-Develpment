redux 

1. redux solves prop drilling 
2. if their there are many coponents inside coponets so we need to do prop drilling of a state to every state if it is not need that
3. redux solves it there is central store where the information store each component can directely comnicate with that, read, update
4. setup-
    1. npm install @reduxjs/toolkit react-redux
    @reduxjs/toolkit  →  gives you createSlice, configureStore
    react-redux       →  gives you Provider, useSelector, useDispatch
    2.