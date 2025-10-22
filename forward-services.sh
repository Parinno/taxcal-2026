#!/bin/bash


gcloud container clusters get-credentials svcmesh01t --zone asia-southeast1-a --project finnomena-staging \
 && (
    kubectl port-forward --namespace knowledge-hub svc/finno-global-search-service-proxy 8448:80 
)