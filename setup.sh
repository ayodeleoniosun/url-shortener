#!/bin/sh
echo "INSTALLING DEPENDENCIES"
npm install
echo "RUNNING BUILD"
npm run build
echo "RUNNING DB MIGRATIONS"
npm run migrate
echo "SETUP COMPLETED"