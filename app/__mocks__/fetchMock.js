import jest_fetch_mock from "jest-fetch-mock";
import "jest-localstorage-mock";

global.fetch = jest_fetch_mock;