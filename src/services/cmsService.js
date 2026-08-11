import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('cms');

export const cmsService = {
  getConfig: () => adapter().getConfig(),
  updateConfig: (data) => adapter().updateConfig(data)
};
