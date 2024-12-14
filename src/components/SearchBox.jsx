import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom'

export const SearchBox=({items})=> {

  // note: the id field is mandatory
  console.log(items);
  const navigate=useNavigate()
  
  
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect =(item) => {
    // the item selected
    console.log('onSelect:',item)
    navigate('/detail/'+item.id)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
       {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>*/}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div >
      <header >
        <div style={{ width: 250,fontSize:"0.8rem"}}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{fontSize:"12px",height:'30px',zIndex:'100'}}
          />
        </div>
      </header>
    </div>
  )
}
