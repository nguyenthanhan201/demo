import '../mocks';

async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    await server.listen();
    // server.events.on('request:start', ({ request }) => {
    //   console.log('Outgoing:', request.method, request.url);
    // });
  } else {
    const { worker } = await import('./browser');
    await worker.start();
    // worker.events.on('request:start', ({ request }) => {
    //   console.log('Outgoing:', request.method, request.url);
    // });
  }
}

export { initMocks };
