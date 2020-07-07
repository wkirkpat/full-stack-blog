import * as React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import Blog from "./Blog";
import AddBlog from "./AddBlog";




const App: React.FC<IAppProps> = (props) => {
  return (
    <>
      <Router>
        <Link to="/"><button className="btn btn-primary btn-sm">Home</button></Link>
        <Link to="/add"><button className="btn btn-primary btn-sm">Write a Blog</button></Link>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path = "/blog/:id" component={Blog} />
          <Route path = "/add" component={AddBlog} />
        </Switch>
      </Router>
    </>
  )
}

interface IAppProps {};

export default App;