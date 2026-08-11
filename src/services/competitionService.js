import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('competition');

export const competitionService = {
  getAll: () => adapter().getAll(),
  create: (data) => adapter().create(data),
  register: (competitionId, artworkId) => adapter().register(competitionId, artworkId),
  vote: (competitionId, artworkId) => adapter().vote(competitionId, artworkId)
};
