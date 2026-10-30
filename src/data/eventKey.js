// Stable id for calendar events that have no id of their own.
export const eventKey = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
