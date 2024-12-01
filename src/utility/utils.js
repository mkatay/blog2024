//A DOMParser hatékony módszer a HTML tartalom tisztítására:
// eltávolítja a HTML tageket, miközben csak a szöveges tartalmat hagyja meg.
export const sanitizeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  