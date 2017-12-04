// Mock datetime locale output
Object.defineProperty(Date.prototype, 'toLocaleDateString', { value: () => '2017-01-09', writable: true });
Object.defineProperty(Date.prototype, 'toLocaleTimeString', { value: () => '19:00', writable: true });
