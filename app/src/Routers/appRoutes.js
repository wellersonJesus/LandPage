/**
 * Definição das rotas da aplicação
 */

import { indexController } from '../Controllers/indexController.js';
import { dashboardController } from '../Controllers/dashboardController.js';

export const routes = {
    '/': indexController,
    '/dashboard': dashboardController
};

export function navigate(path) {
    console.log(`Navigating to ${path}`);
}