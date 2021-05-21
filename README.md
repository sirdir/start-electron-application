# start-electron-application

### Usual stuff
installing dependencies   
`yarn install`

### Run app as script
`yarn start`


### make binary and run as binary`
for:
#### Linux(Debian/Ubuntu) 
make sure you have installed `fakeroot`, `rpm`, `binutils` packages  
`sudo apt update && sudo apt intall fakeroot rpn binutils -y`  
build binary for your app by running `yarn make`    
then you can start application with run `./out/start-electron-application-linux-x64/start-electron-application`  


OR just install package  
`sudo dpkg -i out/make/deb/x64/start-electron-application_1.0.0_amd64.deb`  
and then you can access it everywhere from you terminal by executing `start-electron-application`

#### Win
for your app `yarn make`  
then run it `out\start-electron-application-win32-x64\start-electron-application.exe`   
