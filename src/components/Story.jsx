import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import './Story.css'
import { div } from 'framer-motion/client';

export const Story=({setStory,uploaded})=> {
  const [html, setHtml] = useState('my <b>HTML</b>');
  
  function onChange(e) {
    setHtml(e.target.value);
  }
//console.log(html);

  return (
  
         <Editor value={html} onChange={onChange} onBlur={()=>setStory(html)}    />

   
  );
}