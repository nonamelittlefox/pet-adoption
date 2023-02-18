import { ActionType } from 'typesafe-actions';
import * as appActions from './appActions';
import * as miscActons from './miscActions';

export type AppAction = ActionType<typeof appActions>;
export type MiscAction = ActionType<typeof miscActons>;

export type RootAction = AppAction | MiscAction;
