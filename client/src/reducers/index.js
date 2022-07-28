/*==================================================
/client/src/reducers/index.js

Combines our reducers so they can be exported more easily
================================================== */

 // Import modules
import { combineReducers } from 'redux';

import Photos from './Photos';
import Auth from './Auth';

export default combineReducers({ Photos, Auth });
