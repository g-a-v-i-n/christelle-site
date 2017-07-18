export function get (client, entryID) {
  this.client.getEntry(entryID)
  .then((entry) => { return entry })
  .catch((err) => { console.log('error:', err) })
}
