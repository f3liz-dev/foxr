import Foxr from './api/Foxr.js'
import Browser from './api/Browser.js'
import Page from './api/Page.js'
import JSHandle from './api/JSHandle.js'
import ElementHandle from './api/ElementHandle.js'

export default new Foxr()

export type TBrowser = Browser
export type TPage = Page
export type TJSHandle = JSHandle
export type TElementHandle = ElementHandle
