import React from "react";
import ContactList from "./components/ContactList";
import ContactProvider from "./contexts/ContactContext";

function App() {
  return (
    <main className="main">
      <ContactProvider>
            <ContactList />
      </ContactProvider>
    </main>
  );
}

export default App;
