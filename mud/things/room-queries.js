module.exports = {
  FETCH_OR_CREATE_HUB: `
    MERGE (r:room { hub: 'true' })
    ON CREATE SET
      r.name = $name,
      r.description = $description,
      r.hub = 'true'
    RETURN id(r), r.name, r.description`,

  FETCH_ALL: `
    MATCH (r:room)
    RETURN id(r), r.name, r.description`,

  FETCH_BY_ID: `
    MATCH (r:room)
    WHERE id(r) = $id
    RETURN id(r), r.name, r.description`,

  FETCH_AS_DOOR_DESTINATION: `
    MATCH (d:door)-[:leads_to]->(r:room)
    WHERE id(d) = $doorId
    RETURN id(r), r.name, r.description`,

  CREATE: `
    CREATE (r:room { name: $name, description: $description })
    RETURN id(r), r.name, r.description`,

  UPDATE: `
    MATCH (r:room)
    WHERE id(r) = $id
    MERGE (r)
    ON MATCH SET
      r.name = $name,
      r.description = $description`
}
