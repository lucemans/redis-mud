const RedisGraphShim = require('../data/redis-graph-shim')
const Doors = require('./doors/doors')
const Rooms = require('./rooms/rooms')

class Dungeon {
  constructor() {
    let shim = new RedisGraphShim()
    this._doors = new Doors(this, shim)
    this._rooms = new Rooms(this, shim)
  }

  get doors() { return this._doors }
  get rooms() { return this._rooms }

  noop() {} // exists so that createStubInstance will work
}

module.exports = Dungeon
