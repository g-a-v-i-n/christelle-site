export function get (client, entry, key) {
  this.client.getEntry(entry)
  .then(function (entry) {
    return entry.key
  })
}
