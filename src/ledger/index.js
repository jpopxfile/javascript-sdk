/********************************************************************************
 *   Binance Chain Ledger App Interface
 *   (c) 2018-2019 Binance
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/

const LEDGER_U2F_TRANSPORT_MODULE = "@ledgerhq/hw-transport-u2f"
const LEDGER_WEB_BLE_TRANSPORT_MODULE = "@ledgerhq/hw-transport-web-ble"
const LEDGER_NODE_HID_TRANSPORT_MODULE = "@ledgerhq/hw-transport-node-hid"

const isBrowser = typeof window !== "undefined"
const Ledger = module.exports

Ledger.app = Ledger.LedgerApp = require("./ledger-app")

Ledger.transports = {
  u2f: moduleExists(LEDGER_U2F_TRANSPORT_MODULE) && require(LEDGER_U2F_TRANSPORT_MODULE).default,
  wble: moduleExists(LEDGER_WEB_BLE_TRANSPORT_MODULE) && require(LEDGER_WEB_BLE_TRANSPORT_MODULE).default,

  // requiring the node transport in the browser causes a bit of an issue with webpack!
  node: !isBrowser && moduleExists(LEDGER_NODE_HID_TRANSPORT_MODULE) ? require(LEDGER_NODE_HID_TRANSPORT_MODULE).default : null,
}

module.exports = Ledger

function moduleExists(name) {
  try { return require.resolve(name) }
  catch (e) { return false }
}
