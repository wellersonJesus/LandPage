// src/app/config.js
export const config = {
  version: '1.0.0',
  
  baseURL: (() => {
    const isGitLab = window.location.hostname.includes('gitlab.io');
    const repoName = 'ws-gestao'; 
    return isGitLab ? `/${repoName}/` : './';
  })(),

  firebase: {},
};
