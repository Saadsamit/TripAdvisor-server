import { model, Schema } from 'mongoose';
import TTeam from './team.interfact';

const teamSchema = new Schema<TTeam>({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

const team = model<TTeam>('team', teamSchema);

export default team;
