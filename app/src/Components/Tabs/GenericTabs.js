export const GenericTabs = {
    render: (container, title, tabs) => {
        const tabsHtml = tabs.map((tab, index) => 
            `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#tab${index}">${tab}</button></li>`
        ).join('');
        
        const contentHtml = tabs.map((tab, index) => 
            `<div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="tab${index}"><div class="alert alert-light border mt-3">Gerenciamento de <strong>${tab}</strong> em breve.</div></div>`
        ).join('');

        container.innerHTML = `
            <h2 class="mb-4 text-secondary">${title}</h2>
            <ul class="nav nav-tabs mb-3">${tabsHtml}</ul>
            <div class="tab-content">${contentHtml}</div>
        `;
    }
};