import { LoginModal } from '../Components/Modals/LoginModal.js';

export const indexController = {
    init: () => {
        console.log('Index Controller Initialized');
        LoginModal.init();
    }
};