import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
