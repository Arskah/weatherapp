import browserEnv from 'browser-env';

require('isomorphic-fetch');

browserEnv(['navigator', 'fetch']);
