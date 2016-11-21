import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Bienvenu !</h2>
      <p>Ajouter ou consulter des annonces en cliquant sur les liens ci-dessous.</p>
      <p>
        <Link className="btn btn-info" href="/annonces/new" role="button">Ajouter</Link>
        <Link className="btn btn-info" href="/annonces" role="button">Consulter</Link>
      </p>
    </Jumbotron>
  </div>
);

export default Index;
