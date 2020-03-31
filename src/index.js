import "./styles.css";
import { fromEvent,empty } from "rxjs";
import { ajax } from 'rxjs/ajax'
import { map, debounceTime,filter, distinctUntilChanged, switchMap } from "rxjs/operators";
import { serialize } from "v8";





const input$= document.querySelector("input");
const result$ = fromEvent(input$,'keyup');
const results$ = document.getElementById("results")


//the Api to Search 
function searchTerm(term){
  return  ajax.getJSON(`https://jsonplaceholder.typicode.com/comments?q=${term}`)
}

result$.pipe(
  //project the text  from input
  map(e=> e.target.value),
 //only  if the value  is longer  than  2 character   
  filter(text => text.length > 2),
//wait for 1se
  debounceTime(1000),
  //only if the value has changed
  distinctUntilChanged(),
//search
  switchMap(searchTerm)

  ).subscribe((r)=>console.log(r
  ));

 

 

let term = ajax(`https://jsonplaceholder.typicode.com/posts`).pipe()
 //term.subscribe(res =>console.log(res.response))