import team from './team.model';

const getTeamDB = async () => {
  return await team.find();
};

export const teamService = {
  getTeamDB,
};
