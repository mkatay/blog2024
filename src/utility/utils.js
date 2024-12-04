//A DOMParser hatékony módszer a HTML tartalom tisztítására:
// eltávolítja a HTML tageket, miközben csak a szöveges tartalmat hagyja meg.
export const sanitizeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  

  export const middleStyle={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    background:'var(--col4)',
    padding:'1rem',
    borderRadius:'5px',
    boxShadow:'0 0 5px var(--col3)'
  }                                    
  
  export const buttonStyle={
    color:'var(--col1)',
    textAlign:'center',
    width:'100%',
    backgroundColor:'var(--col5)'
  }
  export const disabledButtonStyle = {
    backgroundColor: 'var(--col4)',
    color: 'var(--col2)',
    cursor: 'not-allowed',
    opacity: 0.7, // Opció: csökkentett átláthatóság
  };