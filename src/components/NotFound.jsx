import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
        <p>We couldn't find any contact to show.</p>
      </Alert>
    );
  }
};

export default NotFound;



 