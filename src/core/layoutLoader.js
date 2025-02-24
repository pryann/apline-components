export function loadLayout(config = {}) {
  fetch('/src/view/layout/layout.html')
    .then(response => response.text())
    .then(layoutHtml => {
      document.body.innerHTML = layoutHtml;
      
      document.addEventListener('alpine:init', () => {
        Alpine.data('layout', () => ({
          title: config.title || 'Default Title',
          meta: {
            description: config.meta?.description || 'Default description'
          },
          layout: {
            header: config.layout?.header ?? true,
            footer: config.layout?.footer ?? true
          }
        }));
      });

      // Start Alpine.js
      Alpine.start();

      // Insert content into slots
      const template = document.querySelector('template[data-layout="default"]');
      if (template) {
        const content = template.content.cloneNode(true);
        document.querySelector('main').appendChild(content);
      }
    });
}