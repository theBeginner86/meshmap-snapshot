#!/bin/bash
# ENV Variables expected
# MESHERY_SERVER_BASE_URL
# UPLOAD_TYPE: can be "Kubernetes Manifest" | "Helm Chart" | "Docker Compose"
# PROVIDER_TOKEN: MESHERY provider token

# # get Meshery pattern file as escaped yaml str
node -v
ls
cat  "__intermediate_file.yml"
echo "hello"
# MESHERY_PATTERN_FILE=$(awk '{ gsub(/"/, "\\\"", $0); printf "%s\\n", $0}' __intermediate_file.yml)
MESHERY_PATTERN_FILE=$(pattern_file=$(cat "__intermediate_file.yml") node ./action/index.js)

# # convert to uri-encoded str
UPLOAD_TYPE=$(printf %s "$UPLOAD_TYPE" | jq -sRr @uri)

curl "$MESHERY_SERVER_BASE_URL/api/pattern/$UPLOAD_TYPE" \
  -H 'Accept: */*' \
  -H 'Connection: close' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H "Cookie: meshery-provider=Meshery; token=$PROVIDER_TOKEN;" \
  --data-raw "{\"save\":true, \"pattern_data\": {\"pattern_file\":\"$MESHERY_PATTERN_FILE\"}}" \
  --compressed | jq ".[0].id"

