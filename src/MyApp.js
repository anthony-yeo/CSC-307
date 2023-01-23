import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp(){ 
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchAll().then( result => {
           if (result)
              setCharacters(result);
         });
     }, [] ); 

    return (
        <div className="container">
            <Table characterData={characters} removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList}/>
        </div> 
    );
    
     async function fetchAll(){
        try {
           const response = await axios.get('http://localhost:5000/users');
           return response.data.users_list;     
        }
        catch (error){
           console.log(error); 
           return false;         
        }
     }
    
     async function makePostCall(person){
        try {
            //  console.log("MakePost")
            const response = await axios.post('http://localhost:5000/users', person);
            return response;
        }
        catch (error) {
           console.log(error);
           return false;
        }
     }

     async function makeDeleteCall(index){
        try{
            let id = characters[index].id
            let url = 'http://localhost:5000/users/' + id
            const response = await axios.delete(url)
            return response
        }
        catch (error){
            console.log(error);
            return false;
        }
     }

     function updateList(person) { 
        makePostCall(person).then( result => {
        if (result && result.status === 201)
            console.log(result.data)
            setCharacters([...characters, result.data] );
        });
     }

     function removeOneCharacter (index) {
        
        //console.log(characters[index].id)
        makeDeleteCall(index).then( result => {
            if (result && result.status === 204){
                const updated = characters.filter((character, i) => {
                    return i !== index
                });
                setCharacters(updated);
            }
        });
    }
    
}

 
export default MyApp;