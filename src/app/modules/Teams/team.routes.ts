import { Router } from 'express';
import { teamController } from './team.controller';

const router = Router();

router.get('/', teamController.getTeams);

export const teamRoutes = router;
