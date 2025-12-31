# function

## creatAuthHeader
````js
function createAuthHeader (username: any, password:any) {
return 'Basic ' + btoa (username+':'+password);
}
````
