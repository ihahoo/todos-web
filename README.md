# todos-web

## 通过k8s部署打包好的docker镜像

````
$ kubectl apply -f k8s/deployment.yaml
````

通过 http://localhost:30088/todos 访问web管理界面

## 停止k8s部署

````
$ kubectl delete -f k8s/deployment.yaml
````
