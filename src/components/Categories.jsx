import React from 'react'
import { useContext } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { CategContext } from '../context/CategContext'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'


export const Categories = () => {
    const {categories}=useContext(CategContext)
    let [searchParams] = useSearchParams();
    console.log(searchParams.get('sel'));
    
    const [selectedCateg,setSelectedCateg]=useState( searchParams.get('sel') ? [searchParams.get('sel')] : [])
console.log(selectedCateg);



    const handleChange = (e) => {
        const { value, checked } = e.target; // Érték és állapot lekérdezése  
        setSelectedCateg((prev) => checked ? [...prev, value] : prev.filter((categ) => categ !== value) );
      };
      

  return (
    <div>
      <Form className='d-flex justify-content-center flex-wrap'>
        {categories && categories.map(obj=>
            <FormGroup    check    inline  key={obj.name}>
                <Input type="checkbox" value={obj.name} onChange={handleChange} checked={selectedCateg.includes(obj.name)}/>
                <Label check>{obj.name}</Label>
            </FormGroup>
        )}
    </Form>
    </div>
  )
}
