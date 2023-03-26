import React from 'react';
import './Volunteer.css';
function Volunteer() {
  return (
    <body>
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required/>
      
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required/>
      
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" required/>
      
        <label for="Skills">Skils:</label>
        <textarea id="Skills" name="Skills"></textarea>
      
        <button type="submit">Submit</button>
      </form>
  </body>
  );
}

export default Volunteer;
