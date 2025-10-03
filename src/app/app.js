// src/app/app.js
import { authService } from '../services/auth.service.js';
import { storageService } from '../services/storage.service.js';
import { firebaseService } from '../services/firebase.service.js';

export const App = (() => {
  let appConfig = {};

  return {
    init: (config) => {
      appConfig = config;

      console.log(`🚀 WS-Gestão App iniciado (v${appConfig.version})`);
      
      // Inicializa serviços
      storageService.init();
      authService.init(appConfig);
      firebaseService.init(appConfig.firebase);

      console.log("✅ Serviços iniciais carregados");
    },

    getConfig: () => appConfig,
  };
})();
