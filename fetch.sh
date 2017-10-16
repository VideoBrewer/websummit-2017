#!/bin/bash

for i in {1..89}
do
  curl \
    -X POST \
    -H "content-type:application/x-www-form-urlencoded" \
    -H "Referer:https://websummit.com/featured-startups" \
    -d '{"requests":[{"indexName":"Avenger_Company_production","params":"query=&page='$i'&attributesToSnippet=name%3A9&tags=%5B%22ws17%22%5D&filters=NOT%20tiers.ws17%3A%22Exhibitor%22&facets=%5B%5D&tagFilters="}]}' \
    "https://x0o1h31a99-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.21.1%3Binstantsearch.js%201.11.15%3BJS%20Helper%202.19.0&x-algolia-application-id=X0O1H31A99&x-algolia-api-key=ZjYwMWEzOGM2ZTg0NjY1MDIzMjdjZWUyMmFjYmZkNmY0MDRjNGVkMzgzMGJkOTIxNWQxMmY3MjIyYmU2YmQ5ZGZpbHRlcnM9X3RhZ3MlM0F3czE3JnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJBdmVuZ2VyX1BlcnNvbl9wcm9kdWN0aW9uJTIyJTJDJTIyQXZlbmdlcl9Db21wYW55X3Byb2R1Y3Rpb24lMjIlNUQ%3D" |
  tee data/page-$i.json
done

