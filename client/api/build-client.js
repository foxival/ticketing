import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      //namespace of service.namespace.svc.cluster.local : 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
      baseURL: 'https://www.foxival.com',
      headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};
