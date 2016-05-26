/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angularjs/angular-resource.d.ts" />
/// <reference path="../utils.ts" />



module App {
  export module Ctrl {
    export class Hello {
      static $inject = ['$scope', '$routeParams', '$resource', 'utils'];
      constructor(
          private $scope: ng.IScope,
          private $routeParams: ng.route.IRouteParamsService,
          private $resource: ng.resource.IResourceService,
          private utils: App.Utils.Utils) {
          let name = $routeParams['name'];
          $scope['name'] = name ? name : 'world (default)';
          $scope['visible'] = false;
          $scope['click_hello'] = (visible: boolean)=>{
            $scope['visible'] = !visible;
            $scope['array_response'] = [];
            $scope['object_response'] = {};
            if ($scope['visible']) {
              $resource("/asset/array_data.json").query().$promise.then((response: any)=>{
                $scope['array_response'] = response;
              });
              $resource("/asset/object_data.json").get().$get().then((response)=>{
                var resp = {};
                resp['obj_title'] = response['title'];
                resp['format_time'] = utils.formatTime(response['time']);
                resp['date'] = response['time'];
                $scope['object_response'] = resp;
              });
            }
          };
          $scope['arrayFilter'] = (item)=>{
            return item.age >= 18;
          };
      }
    }
  }
}