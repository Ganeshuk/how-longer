
import './App.css';

function App() {
  const submit=(e)=>{
  e.preventDefault();
  const name=document.getElementById("name").value 
  const date=document.getElementById("date").value 
  const number=document.getElementById("num").value 
  const email=document.getElementById("email").value 
  const description=document.getElementById("des").value 
  
  }
  return (
    <div className="App">
      <form onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input  id="name" type="name"/>
        <label htmlFor="date">Date of Birth</label>
        <input id="date" type="date"/>
        <label htmlFor="num">Contact Number</label>
        <input id="num" type="number"/>
        <label htmlFor="email">Email</label>
        <input id="email" type="email"/>
        <label htmlFor="area"> Description</label>
        <textarea id="des"></textarea>
        <button type="submit">Submit</button>

      </form>
      <ul type="none">
        <li><p>Name</p><p>Data of Birth</p><p>Contact Number</p><p>Email</p><p>Description</p></li>
      </ul>
    </div>
  );
}

export default App;
