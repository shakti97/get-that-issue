import React, { Component } from "react";
import projects from "../../data/projects";
import Project from "./Project";
import "./project.css";

class ProjectsContainer extends Component {
  render() {
    return (
      <>
        <div id="wrap">
          <form autoComplete="on" onSubmit={(event)=>{event.preventDefault();this.props.selectProject(this.searchedRepo.value)}}>
            <input
              id="search"
              name="search"
              ref={value=> this.searchedRepo=value}
              type="text"
              className='search-box'
              placeholder="What're you looking for ?"
            />
            <input id="search_submit" value="Rechercher" type="submit" className='search-submit'/>
          </form>
        </div>
        <div className="button-container">
          {projects &&
            projects.map(project => (
              <Project
                project={project}
                selectProject={this.props.selectProject}
                selectedProject={this.props.selectedProject}
              />
            ))}
        </div>
      </>
    );
  }
}

export default ProjectsContainer;
