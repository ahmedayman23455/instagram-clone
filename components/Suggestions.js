import React, { useEffect, useState } from "react";
import classes from "./suggestions.module.scss";
import faker from "@faker-js/faker";

function Suggestions() {
  const [suggestions, setSuggestions] = useState(null);
  /* ------------ useEffect ----------- */
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i + 1,
    }));
    setSuggestions(suggestions);
  }, []);


  return (
    <div className={classes.suggestions}>
      <div className={classes.suggestions__title}>
        <h2>Suggestions For You</h2>
        <button> See All </button>
      </div>
      {suggestions &&
        suggestions.map((suggest) => (
          <div key={suggest.id} className={classes.suggest}>
            <img src={suggest.avatar} alt="person photo" />  
            <div className={classes.suggest__content} >  
            <h2>{suggest.username}</h2>
            <p>Works at {suggest.company.name}</p>
            </div>

            <button>     
              Follow 
            </button>
          </div>
        ))}
    </div>
  );
}

export default Suggestions;
