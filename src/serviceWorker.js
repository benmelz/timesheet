if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator
          .serviceWorker
          .register('service-worker.js');
      console.log('Service Worker registered: ', registration);
    } catch (e) {
      console.error('Service Worker registration failed: ', e);
    }
  });
}
