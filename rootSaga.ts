import { all, fork } from "redux-saga/effects";
import todoSaga from "./todo/sagas";
import commonSaga from "./common/sagas";
import moversSaga from "./move/sagas";
import internetSaga from './internet/sagas';
import insuranceSaga from "./insurance/sagas";
import dashboardSaga from './dashboard/sagas';
import utilitySaga from './utility/sagas';
import loginSaga from './login/sagas';

export function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(todoSaga), 
        fork(commonSaga),
        fork(moversSaga),
        fork(internetSaga),
        fork(insuranceSaga),
        fork(dashboardSaga),
        fork(utilitySaga),
      
]   );
}
