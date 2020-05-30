const Door = require('../../mud/things/doors/door')

describe("Door", function() {
  beforeEach(function() {
    this.dungeon = createStubDungeon()
    this.subject = new Door(this.dungeon, {
      id: A_DOOR_ID,
      name: A_DOOR_NAME,
      description: A_DOOR_DESCRIPTION })
  })

  it("has expected id", function() {
    expect(this.subject.id).to.equal(A_DOOR_ID)
  })

  it("has expected name", function() {
    expect(this.subject.name).to.equal(A_DOOR_NAME)
  })

  it("has expected description", function() {
    expect(this.subject.description).to.equal(A_DOOR_DESCRIPTION)
  })

  context("when renamed", function() {
    beforeEach(function() {
      this.subject.name = ANOTHER_DOOR_NAME
    })

    it("has the new name", function() {
      expect(this.subject.name).to.equal(ANOTHER_DOOR_NAME)
    })

    it("renames the room", function() {
      expect(this.dungeon.doors.update)
        .to.have.been.calledWith(A_DOOR_ID, ANOTHER_DOOR_NAME, A_DOOR_DESCRIPTION)
    })
  })

  context("when redescribed", function() {
    beforeEach(function() {
      this.subject.description = ANOTHER_DOOR_DESCRIPTION
    })

    it("has the new description", function() {
      expect(this.subject.description).to.equal(ANOTHER_DOOR_DESCRIPTION)
    })

    it("updates the room", function() {
      expect(this.dungeon.doors.update)
        .to.have.been.calledWith(A_DOOR_ID, A_DOOR_NAME, ANOTHER_DOOR_DESCRIPTION)
    })
  })
})