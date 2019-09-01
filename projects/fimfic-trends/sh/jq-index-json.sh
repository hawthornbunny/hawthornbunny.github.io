# A jq filter which can extract a few useful fields from the Fimfarchive
# `index.json` file and output a reduced JSON array, which should be small
# enough to be read by Python's `json` module. (Note that while the Fimfarchive
# index is an object keyed by story id, this outputs an array of story data
# objects).

jq '[.[] | {id, date_published, tags}]'
