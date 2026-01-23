/**
 * Controller responsável pela lógica do Modal da Index
 */

export const indexModalController = {
    open: () => {
        console.log('Index Modal Opened');
        // Lógica para abrir o modal
    },
    save: (data) => {
        console.log('Config Saved', data);
        // Lógica para salvar as configurações
    }
};