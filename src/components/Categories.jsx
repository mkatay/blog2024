import React from 'react'
import { useContext } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { CategContext } from '../context/CategContext'

export const Categories = ({selectedCateg,setSelectedCateg}) => {
    const {categories}=useContext(CategContext)

    const handleChange = (e) => {
        const { value, checked } = e.target; // Érték és állapot lekérdezése  
        setSelectedCateg((prev) => checked ? [...prev, value] : prev.filter((categ) => categ !== value) );
      };
    
  return (
    <div>
      <Form className='d-flex justify-content-center flex-wrap' style={{color:'var(--col1',borderBottom:'1px solid var(--col1)'}}>
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
