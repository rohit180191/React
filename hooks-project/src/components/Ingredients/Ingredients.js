import React,{useMemo, useEffect, useCallback, useReducer} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';
import useHttp from './../../hooks/http';

const userIngredientReducer = (currentState, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentState,  action.ingredient];
    case 'DELETE':
      return currentState.filter(item => item.id !== action.id);   
    default:
      throw new Error('Should not get here');  
  }
}

// const httpReducer = (httpState, action) => {
//   switch(action.type){
//     case 'SEND':
//       return {...httpState, loading: true, error: null};
//     case 'RESPONSE':
//       return {...httpState, loading: false, error: null};
//     case 'ERROR':
//       return {...httpState, loading: false, error: action.errorMessage};
//     case 'CLEAR': 
//       return {...httpState, loading: false, error: null};  
//     default:
//       throw new Error('Should not get here');   
//   }
// }
function Ingredients() {

  const [userIngredients, dispatch] = useReducer(userIngredientReducer, []);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [httpState, httpDispatch] = useReducer(httpReducer, {loading: false, error: null});

  const {loading, error, data, extra, sendRequest, clearError, method} = useHttp();

  useEffect(() => {
    if(!loading && !error && data && method === 'POST'){
      const addedData = JSON.parse(extra);
      dispatch({
        type: 'ADD',
        ingredient: {id: data.name, ...addedData}
      })
    } else if(!loading && !error && extra && method === 'DELETE') {
      dispatch({
        type: 'DELETE',
        id: extra
      })
    } else if (!loading && !error && data && method ==='GET'){
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          ...data[key]
        });
      }
      dispatch({
        type: 'SET',
        ingredients: loadedData
      })
    }
  }, [data, extra, method, loading, error]);


  const setIngredients = useCallback((ingredients) => {
    // setIsLoading(true);
    // httpDispatch({type: 'SEND'});
    // fetch('https://react-hook-80f9d.firebaseio.com/ingredients.json',{
    //   method: 'POST',
    //   body: JSON.stringify(ingredients),
    //   headers : {'Content-Type': 'application/json'}
    // }).then((response) => {
    //   // setIsLoading(false);
    //   httpDispatch({type: 'RESPONSE'});
    //   return response.json();
    // }).then(responseData => {
    //   dispatch({
    //     type:'ADD',
    //     ingredient: {
    //       id: responseData.name,
    //       ...ingredients
    //     }
    //   })
    //   // setUserIngredients(prevState => [...prevState, {
    //   //   id: responseData.name,
    //   //   ...ingredients
    //   // }])
    // });

    sendRequest('https://react-hook-80f9d.firebaseio.com/ingredients.json','POST', JSON.stringify(ingredients));
    
  }, [sendRequest]);

  const filterData = useCallback(
    (searchText) => {
    //   // setIsLoading(true);
    //   httpDispatch({type: 'SEND'});
    //   const query = searchText === '' ? '' : `?orderBy="title"&equalTo="${searchText}"`;
    //   fetch('https://react-hook-80f9d.firebaseio.com/ingredients.json'+ query).then(response => response.json()).then(responseData => {
    //   // setIsLoading(false);  
    //   httpDispatch({type: 'RESPONSE'});
    //   const loadedData = [];
    //   for (const key in responseData) {
    //     loadedData.push({
    //       id: key,
    //       ...responseData[key]
    //     });
    //   }
    //   // setUserIngredients(loadedData);

    //   dispatch({
    //     type: 'SET',
    //     ingredients: loadedData
    //   })
    // });
    const query = searchText === '' ? '' : `?orderBy="title"&equalTo="${searchText}"`;  
    sendRequest('https://react-hook-80f9d.firebaseio.com/ingredients.json'+ query,'GET');
    },[sendRequest])

  const removeIngredientsHandler = useCallback((id) => {
    // // setIsLoading(true);
    // httpDispatch({type: 'SEND'});
    // fetch(`https://react-hook-80f9d.firebaseio.com/ingredients/${id}.json`, {
    //   method: 'DELETE'
    // }).then((res) => {
    //   // setIsLoading(false);
    //   // setUserIngredients(prevState => prevState.filter(item => item.id !== id));
    //   httpDispatch({type: 'RESPONSE'});
    //   dispatch({
    //     type: 'DELETE',
    //     id
    //   });
    // }).catch(error => {
    //   // setError(error.message);
    //   // setIsLoading(false);
    //    httpDispatch({type: 'ERROR', errorMessage: error.message});
    // });

    sendRequest(`https://react-hook-80f9d.firebaseio.com/ingredients/${id}.json`, 'DELETE', null, id);
    
  }, [sendRequest]);
  const closeError = useCallback(
    () => {
      // setError(null);
      // httpDispatch({type: 'CLEAR'});
      clearError();
    },
    [clearError],
  )
  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientsHandler}/>
  }, [userIngredients, removeIngredientsHandler]);
  return (
    <div className="App">
       {error && <ErrorModal onClose={closeError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredients={setIngredients} loading={loading}/>

      <section>
        <Search filterData = {filterData}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
