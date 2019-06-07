@echo off

git describe --tags > .version

for /f "delims=" %%i in (.version) do echo REACT_APP_VERSION = %%i > .env.local

del .version
