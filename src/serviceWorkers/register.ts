const modules = Object.values(
  import.meta.glob('./*.sw.ts', { eager: true, as: 'url' }),
);
window.addEventListener('load', () => {
  'serviceWorker' in navigator;
  for (const module of modules) {
    console.log('register sw:', module);
    navigator.serviceWorker.register(module, {
      scope: '/src/serviceWorkers/',
    });
  }
});
