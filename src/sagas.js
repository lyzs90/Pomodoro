import 'babel-polyfill';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getImage } from './libs/api';

export function *fetchImage (action) {
    try {
        const image = yield call(getImage, action.payload.collection);
        yield put({type: 'FETCH_IMAGE_SUCCEEDED', image});
    } catch (e) {
        yield put({type: 'FETCH_IMAGE_FAILED', message: e.message})
    }
}

export function *watchFetchImage () {
    yield takeEvery('FETCH_IMAGE_REQUESTED', fetchImage);
}

export default function *rootSaga () {
    yield [
        watchFetchImage()
    ]
}