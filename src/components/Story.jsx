import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import './Story.css'

export const Story=({setStory,uploaded})=> {
  const [html, setHtml] = useState('my <b>HTML</b>');
  return (
         <Editor value={html} onChange={(e)=>setHtml(e.target.value)} onBlur={()=>setStory(html)}    />
  );
}