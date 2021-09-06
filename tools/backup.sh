#!/bin/bash


:’
cd dev/web/mask-maker/tools
chmod +x backup.sh
sh backup.sh
‘

echo “Saving mask info to local file.”
curl --write-out "%{http_code}\n" "http://localhost:3000/masks/all" --output mask_backup.json
echo "All done!"
