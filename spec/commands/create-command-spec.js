const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const CommandProcessor = require('../../mud/commands/command-processor')
const Dungeon = require('../../mud/things/dungeon')
const Room = require('../../mud/things/room')
const Door = require('../../mud/things/door')

const CURRENT_ROOM_ID = 23
const CURRENT_ROOM_NAME = 'The Red Room'
const CURRENT_ROOM_DESCRIPTION = 'The Red Room is red.'

const A_ROOM_ID = 42
const A_ROOM_NAME = 'The Blue Room'
const A_ROOM_DESCRIPTION = 'The Blue Room is blue.'

const A_DOOR_ID = 13
const A_DOOR_NAME = 'The Big Door'
const A_DOOR_DESCRIPTION = 'The Big Door is big'

describe("Commands", function() {

  beforeEach(function() {
    this.context = {
      dungeon: sinon.createStubInstance(Dungeon),
      room: sinon.createStubInstance(Room)
    }

    this.context.room.id.returns(CURRENT_ROOM_ID)
    this.context.room.name.returns(CURRENT_ROOM_NAME)
    this.context.room.description.returns(CURRENT_ROOM_DESCRIPTION)

    this.aRoom = sinon.createStubInstance(Room)
    this.aRoom.id.returns(A_ROOM_ID)
    this.aRoom.name.returns(A_ROOM_NAME)
    this.aRoom.description.returns(A_ROOM_DESCRIPTION)

    this.aDoor = sinon.createStubInstance(Door)
    this.aDoor.id.returns(A_DOOR_ID)
    this.aDoor.name.returns(A_DOOR_NAME)
    this.aDoor.description.returns(A_DOOR_DESCRIPTION)

    this.processor = new CommandProcessor()
  })

  describe("Create: /create room The Blue Room", function() {
    beforeEach(async function() {
      this.context.dungeon.createRoom.returns(this.aRoom)
      this.response = await this.processor.processMessage(this.context, "/create room The Blue Room")
    })

    it("creates the room", function() {
      expect(this.context.dungeon.createRoom).to.have.been.calledWith("The Blue Room")
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Room '${A_ROOM_NAME}' created with ID of ${A_ROOM_ID}.`)
    })
  })

  describe("Create: /create door The Big Door", function() {
    beforeEach(async function() {
      this.context.dungeon.createDoor.returns(this.aDoor)
      this.response = await this.processor.processMessage(this.context, "/create door The Big Door")
    })

    it("creates the door", function() {
      expect(this.context.dungeon.createDoor).to.have.been.calledWith("The Big Door", CURRENT_ROOM_ID)
    })

    it("returns the expected response", function() {
      expect(this.response).to.equal(`Door '${A_DOOR_NAME}' created with ID of ${A_DOOR_ID}.`)
    })
  })

  describe("Create: /create unknown A Noun That Doesn't Exist", function() {
    beforeEach(async function() {
      this.response = await this.processor.processMessage(this.context, "/create unknown A Noun That Doesn't Exist")
    })

    it("return a reasonable error", function() {
      expect(this.response).to.equal("INVALID COMMAND: Ye can't get ye flask.")
    })
  })
})