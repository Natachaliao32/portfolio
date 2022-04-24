import { Categories } from './../components/Categories.jsx';
import { Projects } from './../components/Projects.jsx';
import categories from './../data/categories.json';
import projects from './../data/projects.json';
import './homepage.css';
import { useEffect, useState } from 'react';


const Homepage = (props) => {
  
  const { setSelectedHeaderCateg } = props;
  // Fied "categories" in array "projects" is id, replace it with corresponding name
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
  const [ selectedCateg, setSelectedCateg ] = useState("Développement web");
  const projectsOfSelectedCategories = (selectedCategory, projects) => {
    if(selectedCategory === "Tout") return projects;
    return projects.filter(project => {
      for(let i=0; i<project.categories.length; i++) {
        if(project.categories[i] === selectedCategory) return true;
      }
      return false;
    })
  }

  useEffect(() => {
    document.querySelector('body').classList.add('hide-overflow');
  }, []);
  
  return (
    <div id="homepage">
      <ScrollIndication />
      <Projects projects={projectsOfSelectedCategories(selectedCateg, projects)} setSelectedHeaderCateg={setSelectedHeaderCateg}/>
      <Categories 
        categories={categories} 
        selectedCateg={selectedCateg}
        setSelectedCateg={category => setSelectedCateg(selectedCateg => category)} 
      />
    </div>
  )
}

const ScrollIndication = () => {

  const [opacity, setOpacity] = useState(1);

  const setScrollIndication = () => {
    const scrollArea = document.querySelector("#projects");
    console.log(scrollArea);
    
    if(!scrollArea) {
      console.log('no scrollarea');
      return
    };
    console.log("scroll ", scrollArea.scrollWidth);
    console.log('client ', scrollArea.clientWidth);
    if(scrollArea.scrollWidth > scrollArea.clientWidth) {
      setOpacity(1);
    }
    else {
      setOpacity(0);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', setScrollIndication);
  }, [])

  useEffect(() => {
    setScrollIndication();
  })

  return (
    <div className='scroll-indication' style={{opacity: opacity}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.85 32.16">
        <polygon points="0 16.08 27.85 32.16 27.85 0 0 16.08" style={{fill:"#f26161"}}/>
      </svg>
      <h2 className='scroll-text'>Scroll</h2>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon points="0 0, 0 100, 85 50" fill='white' stroke='black' strokeWidth='4'/>
      </svg>
    </div>
  );
}

export { Homepage };