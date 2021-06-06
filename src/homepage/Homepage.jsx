import { Categories } from './Categories.jsx';
import { Projects } from './Projects.jsx';
import categories from './categories.json';
import projects from './projects.json';
import './homepage.css';
import { useState } from 'react';

const Homepage = (props) => {
  
  // Field "categories" in array "projects" is id, replace it with corresponding name
  const replaceIdByCategory = (array) => {
    const res = array.map(id => {
      let i = 0;
      while(Number.isInteger(id)){
        if(i === categories.length) {
          console.error("no category corresponding to id " + id);
          break;
        }
        if(categories[i].id === id) {
          id = categories[i].name;
        }
        i++;
      };
      return id;
    })
    return res;
  }
  projects.forEach(project => {
    project.categories = replaceIdByCategory(project.categories);
  });
  
  // Handle categories selection
  const [ selectedCateg, setSelectedCateg ] = useState("Tout");
  const projectsOfSelectedCategories = (selectedCategory, projects) => {
    if(selectedCategory === "Tout") return projects;
    return projects.filter(project => {
      for(let i=0; i<project.categories.length; i++) {
        if(project.categories[i] === selectedCategory) return true;
      }
      return false;
    })
  }
  
  return (
    <div id="homepage">
      <Categories 
        categories={categories} 
        selectedCateg={selectedCateg}
        setSelectedCateg={category => setSelectedCateg(selectedCateg => category)} 
      />
      <Projects projects={projectsOfSelectedCategories(selectedCateg, projects)} />
    </div>
  )
}

export { Homepage };