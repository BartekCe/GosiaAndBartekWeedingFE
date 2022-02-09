###

#Deploy:
###
-on terminal in project location:
###
-1. "docker build -t weedingappfe:latest ."  
###
on gcloud cli:
###
-1.gcloud auth login if needed
###
-2. "docker tag weedingappfe{_version} gcr.io/gbweedingfe/weedingappfe{_version}"
###
-3. "docker push gcr.io/gbweedingfe/weedingappfe{_version}" 
###

on cloud:
###
-1.go to https://console.cloud.google.com/gcr/images/gbweedingfe?project=gbweedingfe or Container Registry
###
-2.copy pushed url(weedingappfe{_version})
###
-3.go to https://console.cloud.google.com/run?referrer=search&project=gbweedingbe or Cloud Run
###
-4.Create new service, paste url to 'container image url'
###
-5. set region to warsaw
###
-6. check 'Allow unauthenticated invocations'
###
-7. Change port if needed
