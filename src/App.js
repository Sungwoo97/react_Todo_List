import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
import Todo from './Todo';

function App() {
  /*
  window.localStorage.setItem('name', '홍길동');    // 로컬스토리지에 데이터 쓰기
  let test = window.localStorage.getItem('name');   // 로컬스토리지에 데이터 읽기
  window.localStorage.removeItem('name');     // 로컬스토리지에 데이터 삭제
  

  let obj = {id:1, text:'learn web'};

  // 객체를 문자열로 바꿔주는 JSON.stringify(대상);
  let objString = JSON.stringify(obj);    
  window.localStorage.setItem('todo', objString);   
  let test = window.localStorage.getItem('todo');
  // 문자열을 객체로 바꿔주는 JSON.parse(대상);
  let testObj = JSON.parse(test);
  console.log(testObj);
  */

  const [ todo, setTodo ] = useState([]);
  const [ todoId, setTodoId ] = useState(0);

  /*
  let setStorage = useCallback (()=>{
    console.log('setStorage 실행');
    let todoString = JSON.stringify(todo);    
    window.localStorage.setItem('todo', todoString);   
  },[todo]) //최초 한번 실행, todo가 변경되면 실행
  */

  let setStorage =()=>{
    console.log('setStorage 실행');
    let todoString = JSON.stringify(todo);    
    window.localStorage.setItem('todo', todoString);   
  }
 

  let getTodoList = useCallback(()=>{
    console.log('getTodoList 실행');
    const todoStrFromLocalStorage = window.localStorage.getItem('todo');
    if(todoStrFromLocalStorage !== null && todoStrFromLocalStorage !== '[]'){ //값이 있으면
      const todoObj = JSON.parse(todoStrFromLocalStorage);
      setTodo(todoObj);
      setTodoId(todoObj[todoObj.length - 1].id);
    }
  },[]) // useCallback함수로 getTodoList 함수의 결과 변경되었는지 여부를 알려준다. 

  let updateTodoId = useCallback(()=>{
    console.log('updateTodoId 실행');
    if(todo.length > 0 ){
      setTodoId(todo[todo.length - 1].id);
    }else {
      setTodoId(0);
    }
  },[todo]);



  useEffect(()=>{
    getTodoList();
  },[getTodoList]);   //최초 한번 실행, getTodoList 객체의 값이 변경되면 getTodoList 실행

  useEffect(()=>{
    setStorage();
  },[todo]);  //최초 한번 실행, todo 객체의 값이 변경되면  실행

  useEffect(()=>{
    updateTodoId();
  },[todo, updateTodoId]);  

  /*
  let obj = [{id:1, text:'learn web'},{id:1, text:'learn web'}];
  // 객체를 문자열로 바꿔주는 JSON.stringify(대상);
  let objString = JSON.stringify(obj);    
  window.localStorage.setItem('todo', objString);   
  */
 

  let addTodo = (value)=>{
    console.log('addTodo 실행');
    let newTodos = [...todo];   // todo 배열을 복사
    let newId = todoId + 1;     
    setTodoId(newId);
    newTodos.push({id:newId, text:value, checked:false});   // 복사한 배열에 값을 저장

    setTodo(newTodos);                //원본 todo 배열에 복사본 newTodos를 밀어넣어서 교체
    document.querySelector('#todo').value = '';     
  }

  let checkUpdate = (id, value)=>{
    console.log('todoUpdate 실행');
    let newTodos = todo.map(item=> item.id === id ? {...item, checked:value} : item);   //중괄호 안에서도 스프레드 연산자를 사용할 수 있다

    setTodo(newTodos);
    //console.log(typeof(id));
    //console.log(id,value);
  }
  
  let deleteTodo = (id)=>{
    console.log('deleteTodo 실행');
    let newTodos = [...todo];
    let idx = newTodos.findIndex(item => item.id === id );
    newTodos.splice(idx, 1);

    setTodo(newTodos);
    
  }

  let updateTodo = (id, text)=>{
    let newTodos = todo.map(item=> item.id === id ? {...item, text:text} : item);
    
    setTodo(newTodos);
  }

  let todos = [];
  if(todo !== null){
    todos = todo.map((item, idx)=>  
    <Todo data={item} key={idx} checkUpdate={checkUpdate} deleteTodo={deleteTodo} updateTodo={updateTodo} />);
    
  }


  return (
    <div className="container">
      <h1>To do List</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        addTodo(e.target.todo.value);
        // console.log(e.target.todo.value);
      }}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>할 일 입력</Form.Label>
          <Form.Control type="text" name="todo" placeholder="할 일을 입력해주세요" />
        </Form.Group>
        <Button type="submit" variant="primary" >입력</Button>
      </Form>
      <hr />
      <div>
        {todos}
      </div>
    </div>
  );
}

export default App;
