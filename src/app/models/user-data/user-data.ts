import { IUser } from './IUser';

export class UserData implements IUser {
  id = 0;
  name = '';
  color = '';
  selected = false;
  events = [];
}
