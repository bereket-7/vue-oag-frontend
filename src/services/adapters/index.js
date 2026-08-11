import { mockAdapter } from './mockAdapter';
import { httpAdapter } from './httpAdapter';

const adapters = {
  mock: mockAdapter,
  http: httpAdapter
};

export function getAdapter(resource) {
  const useMock = process.env.VUE_APP_USE_MOCK === 'true';
  const adapter = useMock ? mockAdapter : httpAdapter;
  return adapter[resource];
}

export function isMockMode() {
  return process.env.VUE_APP_USE_MOCK === 'true';
}

export { mockAdapter, httpAdapter, adapters };
