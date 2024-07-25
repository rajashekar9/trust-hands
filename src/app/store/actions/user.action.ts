import { createAction, props } from '@ngrx/store';

import { User } from '../models/user.model';

export const updateUser = createAction('UpdateUser', props<{ user: User }>());
