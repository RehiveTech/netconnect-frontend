#!/bin/bash

echo REACT_APP_VERSION = "$(git describe --tags)" > .env.local

# process.env.REACT_APP_VERSION